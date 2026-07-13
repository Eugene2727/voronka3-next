import Link from 'next/link'

export default function PrivacyPolicyPage() {
	return (
		<>
			{/* Инкапсулированные стили для страницы Policy */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
				.policy-page-wrapper {
					background-color: #f4f4f7;
					min-height: 100vh;
					display: flex;
					justify-content: center;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
					padding: 0;
					margin: 0;
				}
				.app-container {
					width: 100%;
					max-width: 380px;
					background: #fff;
					padding: 40px 24px;
					display: flex;
					flex-direction: column;
					box-shadow: 0 4px 24px rgba(0,0,0,0.04);
				}
				.page-title {
					font-size: 26px;
					font-weight: 800;
					color: #1c1c1e;
					margin-bottom: 24px;
					text-align: center;
					letter-spacing: -0.5px;
				}
				.section-title {
					font-size: 15px;
					font-weight: 700;
					color: #1c1c1e;
					margin-top: 28px;
					margin-bottom: 12px;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}
				.policy-text {
					font-size: 15px;
					line-height: 1.6;
					color: #48484a;
					margin-bottom: 16px;
				}
				.contact-list {
					margin-top: 24px;
					display: flex;
					flex-direction: column;
					gap: 16px;
				}
				.contact-item {
					display: flex;
					align-items: flex-start;
					gap: 12px;
					font-size: 15px;
					color: #3a3a3c;
					line-height: 1.4;
				}
				.contact-item svg {
					width: 24px;
					height: 24px;
					flex-shrink: 0;
					stroke: #007aff;
				}
				.nav-links {
					display: flex;
					flex-direction: column;
					gap: 12px;
					margin-top: 40px;
					border-top: 1px solid #e5e5ea;
					padding-top: 24px;
				}
				.nav-link {
					display: flex;
					justify-content: space-between;
					align-items: center;
					text-decoration: none;
					color: #1c1c1e;
					font-size: 16px;
					font-weight: 600;
					padding: 16px 20px;
					background: #f2f2f7;
					border-radius: 14px;
					transition: 0.2s background;
				}
				.nav-link:active {
					background: #e5e5ea;
				}
				.nav-link svg {
					width: 20px;
					height: 20px;
					stroke: #8e8e93;
				}
				.copyright {
					color: #8e8e93;
					font-size: 13px;
					margin-top: 40px;
					text-align: center;
				}
				`,
				}}
			/>

			<div className='policy-page-wrapper'>
				<div className='app-container'>
					<h1 className='page-title'>PRIVACY POLICY</h1>

					<h2 className='section-title'>IMPORTANT PRIVACY INFORMATION</h2>
					<p className='policy-text'>
						This Privacy Policy explains how we collect, use, store, and protect
						personal information when you access or use our applications,
						websites, digital tools, or related services.
						<br />
						<br />
						Depending on the specific service you use, we may ask you to provide
						certain basic information, such as your name, email address, device
						preferences, account settings, and usage-related information. Some
						information may be optional and can be skipped during registration
						or onboarding.
						<br />
						<br />
						We may also automatically collect technical data, including device
						type, operating system, browser information, language settings, IP
						address, and interaction data. This information helps us maintain
						service functionality, personalize user experience, improve
						performance, prevent misuse, and, where permitted, provide relevant
						marketing or advertising content.
						<br />
						<br />
						You may manage certain privacy preferences through the settings
						available in our applications, websites, or your device/browser
						settings.
					</p>

					<h2 className='section-title'>CONTACT INFORMATION</h2>
					<p className='policy-text'>
						AKOLLEKT LTD <br />
						Mobile App Development & Digital Publishing <br />
						Suite 12 2nd Floor Queens House 180 Tottenham Court Road <br />
						London <br />
						W1T 7PD <br />
						United Kingdom <br />
						contact@akollekt.com <br />
					</p>

					<h2 className='section-title'>PRIVACY POLICY OVERVIEW</h2>
					<p className='policy-text'>
						By using our services, you acknowledge that you have read and
						understood this Privacy Policy.
						<br />
						<br />
						You also confirm that you are at least 18 years old or have the
						legal authority required to use the services in your jurisdiction.
						If you do not agree with this Privacy Policy, you should stop using
						the services and may request deletion of your account and associated
						personal data.
						<br />
						<br />
						The English version of this Privacy Policy is the official version
						and prevails over any translations.
					</p>

					<h2 className='section-title'>PERSONAL DATA WE COLLECT</h2>
					<p className='policy-text'>
						We may collect personal data in several ways.
						<br />
						<br />
						Information You Provide Directly. This may include: Name, Email
						address, Account details, Device or service preferences. Information
						submitted through forms, support requests, or account settings.
						Usage data you choose to provide while using our tools or services.
						<br />
						<br />
						Information Received from Third Parties. We may receive limited
						information from third-party services when you choose to connect or
						sign in through them, such as Apple login, productivity platforms,
						payment providers, or other integrated services. The exact data
						received depends on your settings with those third-party services.
						<br />
						<br />
						Information Collected Automatically. When you use our services, we
						may collect technical and usage information, including: Device
						model, Operating system, Browser type, IP address, Language and
						region settings, App or website activity, Feature usage, Crash
						reports and diagnostic data, Approximate location data, if enabled
						or permitted.
					</p>

					<h2 className='section-title'>PAYMENT INFORMATION</h2>
					<p className='policy-text'>
						If you purchase paid services, subscriptions, or digital products,
						payments may be handled by third-party payment providers, including
						PayPal or other payment processors.
						<br />
						<br />
						We do not collect or store full payment card numbers. However, we
						may receive limited transaction-related information, such as:
						Transaction ID, Payment status, Billing email address, Partial
						billing details, if provided, Purchase or subscription status.
						<br />
						<br />
						Your use of PayPal or any other payment provider is governed by that
						provider's own privacy policy and terms of service.
					</p>

					<h2 className='section-title'>HOW WE USE YOUR DATA</h2>
					<p className='policy-text'>
						We may use personal data for the following purposes: To provide,
						operate, and maintain our services. To personalize features and
						improve user experience. To manage accounts, subscriptions, and
						customer support requests. To process transactions and confirm
						payment status. To send service-related notices, security alerts,
						and administrative messages. To send promotional communications,
						where permitted by law. To analyze usage trends and improve
						functionality. To detect, prevent, and respond to fraud, abuse,
						technical issues, or legal violations. To comply with legal
						obligations and enforce applicable agreements.
					</p>

					<h2 className='section-title'>DATA SHARING</h2>
					<p className='policy-text'>
						We may share personal data with trusted third parties only when
						necessary for business, operational, legal, or technical purposes.
						<br />
						<br />
						This may include: Cloud hosting and infrastructure providers,
						Analytics and diagnostics providers, Payment processors, Customer
						support tools, Advertising and marketing platforms, Legal,
						compliance, or security service providers.
						<br />
						<br />
						These service providers are authorized to process personal data only
						as needed to provide services to us and must handle such information
						in accordance with applicable data protection requirements.
						<br />
						<br />
						We may also disclose information where required by law, court order,
						government request, or to protect our rights, users, systems, or
						services.
					</p>

					<h2 className='section-title'>ADVERTISING, ANALYTICS, AND COOKIES</h2>
					<p className='policy-text'>
						We may use third-party advertising or marketing tools to measure
						campaign performance, show relevant content, or understand how users
						interact with our services.
						<br />
						<br />
						Where required by law, we will request your consent before using
						certain tracking technologies. You may manage advertising, cookie,
						and tracking preferences through app settings, browser settings, or
						device-level privacy controls.
						<br />
						<br />
						You may opt out of marketing emails at any time by using the
						unsubscribe link in the email or by contacting us directly.
					</p>

					<h2 className='section-title'>YOUR PRIVACY RIGHTS</h2>
					<p className='policy-text'>
						Depending on your location, you may have the right to: Request
						access to your personal data. Request correction of inaccurate or
						outdated data. Request deletion of your personal data. Object to or
						restrict certain processing activities. Withdraw consent where
						processing is based on consent. Request a copy of your data in a
						portable format. Opt out of marketing communications.
						<br />
						<br />
						To submit a privacy request, contact us using the details provided
						below.
						<br />
						<br />
						We may need to verify your identity before processing certain
						requests.
					</p>

					<h2 className='section-title'>DATA RETENTION</h2>
					<p className='policy-text'>
						We retain personal data only for as long as reasonably necessary to
						provide services, maintain accounts, comply with legal obligations,
						resolve disputes, prevent fraud, and enforce agreements.
						<br />
						<br />
						Retention periods may vary depending on the type of information, the
						purpose of processing, and applicable legal requirements.
						<br />
						<br />
						When personal data is no longer needed, we will delete, anonymize,
						or securely restrict access to it.
					</p>

					<h2 className='section-title'>INTERNATIONAL DATA TRANSFERS</h2>
					<p className='policy-text'>
						Your personal data may be processed or stored in countries other
						than the country where you live.
						<br />
						<br />
						When personal data is transferred internationally, we use
						appropriate safeguards as required by applicable law. These may
						include contractual protections, Standard Contractual Clauses,
						technical security measures, and organizational controls.
					</p>

					<h2 className='section-title'>DATA SECURITY</h2>
					<p className='policy-text'>
						We use reasonable technical and organizational measures to protect
						personal data against unauthorized access, loss, misuse, alteration,
						or disclosure.
						<br />
						<br />
						However, no digital service, transmission method, or storage system
						can be guaranteed to be completely secure. Users are responsible for
						maintaining the confidentiality of their account credentials and
						device access.
					</p>

					<h2 className='section-title'>CHILDREN'S PRIVACY</h2>
					<p className='policy-text'>
						Our services are not intended for users under the age of 18.
						<br />
						<br />
						We do not knowingly collect personal data from minors. If we become
						aware that a minor has provided personal data without appropriate
						legal authorization, we may delete such information.
					</p>

					<h2 className='section-title'>CHANGES TO THIS PRIVACY POLICY</h2>
					<p className='policy-text'>
						We may update this Privacy Policy from time to time to reflect
						changes in our services, legal requirements, or data processing
						practices.
						<br />
						<br />
						When changes are made, we will update the effective date above. In
						some cases, we may provide additional notice through the service,
						email, or other appropriate communication methods.
						<br />
						<br />
						Continued use of the services after an updated Privacy Policy
						becomes effective means that you acknowledge the updated terms.
					</p>

					<h2 className='section-title'>CONTACT US</h2>
					<p className='policy-text'>
						AKOLLEKT LTD <br />
						Mobile App Development & Digital Publishing <br />
						Suite 12 2nd Floor Queens House 180 Tottenham Court Road <br />
						London <br />
						W1T 7PD <br />
						United Kingdom <br />
						contact@akollekt.com <br />
					</p>

					<div className='contact-list'>
						<div className='contact-item'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
								<polyline points='22,6 12,13 2,6'></polyline>
							</svg>
							<span>contact@akollekt.com</span>
						</div>
						<div className='contact-item'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
								<circle cx='12' cy='10' r='3'></circle>
							</svg>
							<span>
								Suite 12 2nd Floor Queens House 180 Tottenham Court Road, London
								W1T 7PD United Kingdom
							</span>
						</div>
					</div>

					<div className='nav-links'>
						{/* Используем компонент Link из next/link для быстрого внутреннего перехода без перезагрузки */}
						<Link href='/policy' target='_blank' className='nav-link'>
							<span>Privacy Policy</span>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</Link>
						<Link href='/refund' target='_blank' className='nav-link'>
							<span>Refund Policy</span>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</Link>
						<Link href='/terms' target='_blank' className='nav-link'>
							<span>Terms of Use</span>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</Link>
					</div>

					<div className='copyright'>© 2026. All rights reserved.</div>
				</div>
			</div>
		</>
	)
}
