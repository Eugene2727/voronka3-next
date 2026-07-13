'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Утилиты для работы с куки
function setCookie(name: string, value: string, days = 30) {
	const date = new Date()
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
	const expires = 'expires=' + date.toUTCString()
	document.cookie =
		name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/'
}

function getCookie(name: string) {
	const nameEQ = name + '='
	const ca = document.cookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim()
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length))
	}
	return null
}

// Данные для вывода логов из вашего JS
const logsData = [
	{
		type: 'error',
		code: '184726',
		desc: 'auth_session_expired while validating cached credentials',
	},
	{
		type: 'error',
		code: '672940',
		desc: 'api_gateway_timeout upstream service did not respond',
	},
	{
		type: 'warning',
		code: '149285',
		desc: 'service_health_probe returned degraded status',
	},
	{
		type: 'success',
		code: '781204',
		desc: 'auth_session_restore completed without conflicts',
	},
	{
		type: 'error',
		code: '438219',
		desc: 'database_write_failed constraint violation on user_state',
	},
	{
		type: 'error',
		code: '590318',
		desc: 'config_reload_failed malformed environment override',
	},
	{
		type: 'error',
		code: '826104',
		desc: 'cache_index_corrupted checksum validation failed',
	},
	{
		type: 'warning',
		code: '902347',
		desc: 'ui_render_queue skipped delayed frame update',
	},
	{
		type: 'error',
		code: '305771',
		desc: 'message_queue_overflow dropped pending sync events',
	},
	{
		type: 'error',
		code: '947260',
		desc: 'permission_scope_mismatch requested token lacks required grant',
	},
	{
		type: 'warning',
		code: '612804',
		desc: 'retry_policy_triggered after unstable endpoint response',
	},
	{
		type: 'error',
		code: '218604',
		desc: 'storage_volume_full unable to persist diagnostic snapshot',
	},
	{
		type: 'error',
		code: '763915',
		desc: 'ssl_certificate_expired secure channel negotiation failed',
	},
	{
		type: 'success',
		code: '845601',
		desc: 'file_descriptor_cleanup released inactive handles',
	},
	{
		type: 'error',
		code: '409582',
		desc: 'worker_thread_crashed unhandled exception in task executor',
	},
]

// Иконки (пути изменены под Next.js папку public)
const icons: Record<string, string> = {
	error: '/img/icon-crit.svg',
	warning: '/img/icon-warn.svg',
	success: '/img/icon-good.svg',
}

export default function ScanPage() {
	const [logs, setLogs] = useState<typeof logsData>([])
	const [progress, setProgress] = useState(0)
	const [isScanning, setIsScanning] = useState(true)
	const [showPopup, setShowPopup] = useState(false)
	const [savedClickId, setSavedClickId] = useState('')

	const logsContainerRef = useRef<HTMLDivElement>(null)

	// 1. Логика сохранения Click ID
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search)
		let currentClickId =
			urlParams.get('clickid') ||
			urlParams.get('clk_id') ||
			urlParams.get('click_id') ||
			''

		if (currentClickId) {
			localStorage.setItem('clickid', currentClickId)
			setCookie('clickid', currentClickId, 30) // Сохраняем в куки на 30 дней
		} else {
			// Если в URL нет, ищем в localStorage, а затем в куках
			currentClickId =
				localStorage.getItem('clickid') || getCookie('clickid') || ''
		}

		setSavedClickId(currentClickId)
	}, [])

	// 2. Логика сканирования (эмуляция 5 секунд)
	useEffect(() => {
		const scanDuration = 5000 // 5 секунд на полное сканирование
		const updateInterval = 50 // Обновлять каждые 50 мс
		const step = 100 / (scanDuration / updateInterval)

		let currentProgress = 0

		const scanInterval = setInterval(() => {
			currentProgress += step
			if (currentProgress > 100) currentProgress = 100

			setProgress(currentProgress)

			// Высчитываем, сколько логов должно быть показано
			const targetLogsCount = Math.floor(
				(currentProgress / 100) * logsData.length,
			)
			setLogs(logsData.slice(0, targetLogsCount))

			// Если дошли до 100%
			if (currentProgress === 100) {
				clearInterval(scanInterval)

				// Ждем полсекунды для эффекта завершения, затем меняем баннер
				setTimeout(() => {
					setIsScanning(false)
				}, 200)

				// Показываем всплывающее окно ровно через 1 секунду после окончания сканирования
				setTimeout(() => {
					setShowPopup(true)
				}, 1000)
			}
		}, updateInterval)

		return () => clearInterval(scanInterval)
	}, [])

	// 3. Автоскролл логов вниз при добавлении
	useEffect(() => {
		if (logsContainerRef.current) {
			logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
		}
	}, [logs])

	// Формируем финальную ссылку, передавая Click ID на следующий шаг (опционально)
	const nextHref = savedClickId
		? `/home-email?clickid=${savedClickId}`
		: '/home-email'

	return (
		<>
			<div className='mobile-container'>
				<div className='header-section'>
					<h1 className='page-title'>SYSTEM LOGS</h1>
					<p className='page-subtitle'>
						Real-time event monitoring and analysis
					</p>
				</div>

				{/* Прогресс бар */}
				<div className='progress-box'>
					<div className='progress-track'>
						<div
							className='progress-fill'
							style={{ width: `${progress}%` }}
						></div>
					</div>
					<div className='progress-percent'>{Math.floor(progress)}%</div>
				</div>

				{/* Контейнер логов */}
				<div className='logs-container' ref={logsContainerRef}>
					{logs.map((log, index) => (
						<div key={index} className={`log-item ${log.type}`}>
							<div className='log-icon'>
								<img src={icons[log.type]} alt='icon' />
							</div>
							<div className='log-content'>
								<div className='log-code'>{log.code}</div>
								<div className='log-desc'>{log.desc}</div>
							</div>
						</div>
					))}
				</div>

				<div className='bottom-section'>
					{/* Баннер сканирования */}
					<div className={`scan-banner ${!isScanning ? 'hidden' : ''}`}>
						<img src='/img/scan-molnia.svg' alt='warning' />
						<div className='banner-text'>
							<div className='banner-title'>DEVICE SECURITY SCAN</div>
							<div className='banner-sub'>
								Potential issues detected during system analysis
							</div>
						</div>
					</div>

					{/* Результаты сканирования (появляется после завершения) */}
					<div className={`result-box ${isScanning ? 'hidden' : ''}`}>
						<div className='critical-banner'>
							<img src='/img/scan-molnia2.svg' alt='warning' />
							<span>CRITICAL 14</span>
						</div>

						<div className='stats-cards'>
							<div className='stat-card'>
								<div className='stat-num text-orange'>5</div>
								<div className='stat-label'>warnings found</div>
							</div>
							<div className='stat-card'>
								<div className='stat-num text-green'>3</div>
								<div className='stat-label'>checks passed</div>
							</div>
						</div>
					</div>
				</div>

				<div className='footer'>
					<a href='/policy' target='_blank' className='privacy-link'>
						Privacy Policy
					</a>
					<div className='copyright'>© 2026. All rights reserved.</div>
				</div>
			</div>

			{/* Модальное окно (Popup) */}
			<div className={`popup-overlay ${showPopup ? 'show' : ''}`}>
				<div className='popup-box'>
					<img
						src='/img/molnia-popup.svg'
						alt='molnia'
						style={{ marginTop: '-40px', marginBottom: '16px' }}
					/>

					<h2 className='popup-title'>SECURITY WARNING</h2>
					<div className='popup-subtitle'>
						Your risk level: <span className='text-red-bold'>HIGH</span>
					</div>

					<div className='popup-divider'></div>

					<div className='popup-details'>
						<div className='detail-row'>
							<span className='detail-label'>Location signal:</span>
							<span className='detail-val'>Warsaw, Poland</span>
						</div>
						<div className='detail-row'>
							<span className='detail-label'>Detected IP range:</span>
							<span className='detail-val'>178.223.218.</span>
						</div>
						<div className='detail-row'>
							<span className='detail-label'>System integrity:</span>
							<span className='detail-val'>Suspicious activity</span>
						</div>
						<div className='detail-row'>
							<span className='detail-label'>Wi-Fi security:</span>
							<span className='detail-val'>Unprotected network</span>
						</div>
						<div className='detail-row'>
							<span className='detail-label'>Data exposure risk:</span>
							<span className='detail-val'>Possible leak</span>
						</div>
					</div>

					<div className='popup-wait-text'>
						Please wait — device scan is running.
					</div>

					<Link href={nextHref} className='popup-btn'>
						Protect My Device
					</Link>
				</div>
			</div>
		</>
	)
}
