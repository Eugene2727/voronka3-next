import Link from 'next/link'

export default function Home() {
	return (
		<>
			<div className='top-marquee-container'>
				<div className='marquee-text'>
					100% Private & Secure. ⚠️ ATTENTION: Your iPhone data is in danger! •
					Install to fix issues now.
				</div>
			</div>

			{/* 
        Главный контейнер flex с gap="40px" для создания 
        равномерных отступов между ВСЕМИ основными блоками.
      */}
			<div
				className='app-container'
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '40px',
					padding: '24px 16px 64px',
				}}
			>
				<div className='threat-box'>
					<img
						className='threat-video-bg'
						src='/img/applephone.webp'
						alt='back'
					/>

					<div className='threat-desc'>
						<div className='threat-scan-badge'>
							<img src='/img/safetygreenapple.svg' alt='safety' />
							Security scan result
						</div>

						<h1 className='main-title'>
							Signs of threats detected
						</h1>

						<div className='threat-score'>
							<h2 className='score-number'>76</h2>
						</div>

						<p className='threat-risk-badge'>Your device may be at risk</p>

						<Link href='/scan' className='threat-btn'>
							Delete all threats
						</Link>
					</div>

					<div className='pulse-container'>
						<div className='pulse-circle delay-1'></div>
						<div className='pulse-circle delay-2'></div>
						<div className='pulse-circle delay-3'></div>
						<div className='pulse-circle delay-4'></div>

						<img
							src='/img/warning.svg'
							alt='warning'
							className='warning-icon'
						/>
					</div>
				</div>

				<div className='warning-card'>
					<div className='apple-icon'>
						<img src='/img/apple-icon.svg' alt='apple' />
					</div>
					<h2 className='warning-text'>
						<span>Warning</span> your connection <span>is not secure</span>.
						Third parties may intercept your data.
					</h2>
				</div>

				<div
					className='trust-badge'
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<img src='/img/trusted.svg' alt='trusted' />
				</div>

				{/* Кнопка обернута в div для центрирования */}
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Link href='/scan' className='btn-blue'>
						Secure Device
					</Link>
				</div>

				{/* Группируем заголовок и карточки с внутренним отступом 24px */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<h2 className='section-title' style={{ margin: 0 }}>
						WHY CHOOSE US?
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
				</div>

				{/* Блок с отзывами также сгруппирован с отступами для консистентности */}
				<div
					className='reviews-section'
					style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
				>
					<h2 className='section-title' style={{ margin: 0 }}>
						RATINGS & REVIEWS
					</h2>

					<div className='reviews-summary'>
						<div className='score'>4.9</div>
						<div className='score-details'>
							<div className='stars-group'>
								<svg viewBox='0 0 24 24' className='star'>
									<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
								</svg>
								<svg viewBox='0 0 24 24' className='star'>
									<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
								</svg>
								<svg viewBox='0 0 24 24' className='star'>
									<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
								</svg>
								<svg viewBox='0 0 24 24' className='star'>
									<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
								</svg>
								<svg viewBox='0 0 24 24' className='star'>
									<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
								</svg>
							</div>
							<div className='ratings-count'>119 Ratings</div>
						</div>
					</div>

					<div className='reviews-carousel'>
						<div className='review-card'>
							<h3 className='card-title'>Trustworthy security</h3>
							<div className='card-meta'>
								<div className='card-stars'>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								</div>
								<span className='card-info'>1w ago &middot; alexphone</span>
							</div>
							<p className='card-text'>
								At last, a security app I can genuinely trust. It keeps my
								private information protected and runs quietly in the background
								without slowing down my phone. Highly recommended!
							</p>
						</div>

						<div className='review-card'>
							<h3 className='card-title'>Finally reliable</h3>
							<div className='card-meta'>
								<div className='card-stars'>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								</div>
								<span className='card-info'>2d ago &middot; user_4582</span>
							</div>
							<p className='card-text'>
								At last, a protection app I can rely on. It helps secure my
								personal data and runs smoothly without affecting my
								phone&apos;s performance. Definitely recommended!
							</p>
						</div>

						<div className='review-card'>
							<h3 className='card-title'>Dependable protection</h3>
							<div className='card-meta'>
								<div className='card-stars'>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									<svg viewBox='0 0 24 24' className='star-small'>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
								</div>
								<span className='card-info'>3d ago &middot; mark_ios</span>
							</div>
							<p className='card-text'>
								Finally found a protection app that feels dependable. It helps
								guard my personal data and works smoothly without hurting my
								phone&apos;s performance. I&apos;d definitely recommend it.
							</p>
						</div>
					</div>
				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Link href='/scan' className='btn-blue'>
						Check Data
					</Link>
				</div>

				{/* Секция с шагами обернута и стилизована gap: 24px */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
					<h2 className='section-title' style={{ margin: 0 }}>
						HOW IT WORKS
					</h2>

					<ul
						className='how-it-works-list'
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '20px',
							padding: 0,
							margin: 0,
						}}
					>
						<li className='step-card'>
							<img src='/img/scan1.svg' alt='scan' />
							<div className='content-rev'>
								<p className='step-title'>Launch the App</p>
								<p className='step-desc'>
									Allow the app to check your security while keeping your
									privacy under your control.
								</p>
							</div>
						</li>
						<li className='step-card'>
							<img src='/img/scan1.svg' alt='scan' />
							<div className='content-rev'>
								<p className='step-title'>CHECK & IMPROVE</p>
								<p className='step-desc'>
									Get simple protection insights and personalized tips to
									strengthen your security.
								</p>
							</div>
						</li>
						<li className='step-card'>
							<img src='/img/scan1.svg' alt='scan' />
							<div className='content-rev'>
								<p className='step-title'>STAY PROTECTED</p>
								<p className='step-desc'>
									Fix possible risks fast and use your device with more
									confidence.
								</p>
							</div>
						</li>
					</ul>
				</div>

				{/* Футер выровнен и отцентрирован */}
				<div
					className='footer-secure'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					<img src='/img/safetygreen.svg' alt='safety' /> 100% Private & Secure
				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Link href='/scan' className='btn-blue'>
						Scan your Data
					</Link>
				</div>
			</div>
		</>
	)
}
