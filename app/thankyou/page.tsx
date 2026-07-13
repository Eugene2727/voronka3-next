'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Импортируем роутер для перенаправления

// Утилита для чтения Cookie на случай потери LocalStorage
function getCookie(name: string) {
	const nameEQ = name + '='
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') c = c.substring(1, c.length)
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length))
	}
	return null
}

export default function ThankYouPage() {
	const router = useRouter()
	const [isAllowed, setIsAllowed] = useState(false) // Стейт для защиты страницы
	const [email, setEmail] = useState('LOADING...')
	const [appLink, setAppLink] = useState('#')

	useEffect(() => {
		// 1. Проверяем, есть ли данные об оплате (email)
		const savedEmail = sessionStorage.getItem('userEmail')

		if (!savedEmail) {
			// Если email нет, значит пользователь зашел напрямую по ссылке
			// Перенаправляем его на главную (используем replace, чтобы нельзя было вернуться назад)
			router.replace('/')
			return // Прерываем выполнение
		}

		// Если данные есть, разрешаем показ страницы
		setIsAllowed(true)
		setEmail(savedEmail)

		// 2. Настраиваем ссылку скачивания
		const clickid =
			localStorage.getItem('clickid') || getCookie('clickid') || ''
		const tgUserId = localStorage.getItem('tg_user_id') || ''

		// Базовая ссылка
		let link =
			'https://securecleancleanapp.onelink.me/n62e?af_xp=custom&pid=my_media_source&af_click_lookback=7d&af_sub1=%7Btraffic_source%7D'

		// Вшиваем truegate user id
		if (tgUserId) {
			link += `&deep_link_value=prSJ9M5KxCdy__${encodeURIComponent(tgUserId)}`
		} else {
			link += `&deep_link_value=prSJ9M5KxCdy`
		}

		// Вшиваем clickid
		if (clickid) {
			link += `&clickid=${encodeURIComponent(clickid)}`
		}

		setAppLink(link)
	}, [router])

	// Пока идет проверка (или если доступ запрещен), ничего не рендерим, чтобы избежать мигания
	if (!isAllowed) {
		return null
	}

	return (
		<>
			{/* Внедряем CSS-стили из макета */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
				.thankyou-container {
					width: 100%;
					max-width: 400px;
					padding: 40px 20px;
					text-align: center;
					box-sizing: border-box;
				}

				.success-icon {
					position: relative;
					width: 140px;
					height: 140px;
					margin: 0 auto 20px auto;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.ring-1 {
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: rgba(93, 219, 137, 0.2);
					border-radius: 50%;
				}

				.ring-2 {
					position: absolute;
					width: 75%;
					height: 75%;
					background-color: rgba(93, 219, 137, 0.4);
					border-radius: 50%;
				}

				.ring-3 {
					position: absolute;
					width: 55%;
					height: 55%;
					background-color: #5ddb89;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0 4px 10px rgba(93, 219, 137, 0.3);
				}

				.ring-3 svg {
					width: 32px;
					height: 32px;
					fill: none;
					stroke: white;
					stroke-width: 4;
					stroke-linecap: round;
					stroke-linejoin: round;
				}

				.title {
					font-size: 28px;
					font-weight: 900;
					color: #212429;
					margin: 0 0 15px 0;
					line-height: 1.1;
					text-transform: uppercase;
				}

				.subtitle {
					font-size: 15px;
					color: #4a4d55;
					margin: 0 0 30px 0;
					line-height: 1.4;
				}

				.email-card {
					background-color: white;
					border-radius: 12px;
					padding: 16px 20px;
					display: flex;
					align-items: center;
					gap: 15px;
					margin-bottom: 25px;
					box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
					text-align: left;
				}

				.email-icon {
					width: 45px;
					height: auto;
					flex-shrink: 0;
				}

				.email-info {
					display: flex;
					flex-direction: column;
					gap: 4px;
					overflow: hidden;
				}

				.email-label {
					font-size: 13px;
					color: #838792;
				}

				.email-value {
					font-size: 13px;
					font-weight: 800;
					color: #1a1a1a;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.download-btn {
					display: block;
					width: 100%;
					background-color: #0b0b0b;
					color: white;
					text-decoration: none;
					padding: 16px;
					border-radius: 12px;
					font-size: 15px;
					font-weight: 700;
					text-transform: uppercase;
					box-sizing: border-box;
					border: none;
					cursor: pointer;
					transition: 0.2s opacity;
				}

				.download-btn:active {
					opacity: 0.8;
				}
			`,
				}}
			/>

			<div
				style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#ececec',
					fontFamily:
						'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
				}}
			>
				<div className='thankyou-container'>
					{/* SVG круги успеха */}
					<div className='success-icon'>
						<div className='ring-1'></div>
						<div className='ring-2'></div>
						<div className='ring-3'>
							<svg viewBox='0 0 24 24'>
								<polyline points='20 6 9 17 4 12'></polyline>
							</svg>
						</div>
					</div>

					<h1 className='title'>
						Thank You For Your
						<br />
						Payment!
					</h1>
					<p className='subtitle'>
						Your subscription has been activated.
						<br />
						You now have access to all features.
					</p>

					<div className='email-card'>
						{/* SVG иконка конверта */}
						<svg
							className='email-icon'
							viewBox='0 0 64 64'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M4 16 L32 36 L60 16 L60 48 L4 48 Z'
								fill='#f4c27a'
								stroke='#d59c47'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M4 16 L32 36 L60 16 Z'
								fill='#ffe0a6'
								stroke='#d59c47'
								strokeWidth='2'
								strokeLinejoin='round'
							/>
							<path
								d='M15 28 L4 48'
								stroke='#d59c47'
								strokeWidth='2'
								strokeLinecap='round'
							/>
							<path
								d='M49 28 L60 48'
								stroke='#d59c47'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>

						<div className='email-info'>
							<span className='email-label'>
								Receipt and all information sent to:
							</span>
							<span className='email-value'>{email}</span>
						</div>
					</div>

					<Link
						href={appLink}
						className='download-btn'
						style={{ textAlign: 'center' }}
					>
						DOWNLOAD APP
					</Link>
				</div>
			</div>
		</>
	)
}
