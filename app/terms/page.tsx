import Link from 'next/link'

export default function TermsOfServicePage() {
	return (
		<>
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
					<h1 className='page-title'>TERMS OF SERVICE</h1>

					<p className='policy-text'>
						These Terms of Service govern your access to and use of the
						Company's mobile applications, websites, digital tools, account
						features, subscription features, and related services. By accessing
						or using our services, starting a trial, purchasing a subscription,
						or otherwise using the Company, you confirm that you have read,
						understood, and agree to be bound by these Terms.
						<br />
						<br />
						Company Contact Information
						<br />
						AKOLLEKT LTD <br />
						Mobile App Development & Digital Publishing <br />
						Suite 12 2nd Floor Queens House 180 Tottenham Court Road <br />
						London <br />
						W1T 7PD <br />
						United Kingdom <br />
						contact@akollekt.com <br />
						<br />
						Please note that the contact details above, with the official
						receipt provided by your payment tool, constitute a remote online
						publishing fora document.
					</p>

					<h2 className='section-title'>SUBSCRIPTION, PAYMENT, TERMS</h2>
					<p className='policy-text'>
						Auto-renewal rules:
						<br />
						Paid subscriptions automatically renew at the end of each billing
						period unless they are canceled before the renewal date. To avoid
						charges for the next billing cycle, you must cancel your
						subscription at least 24 hours before the current period ends.
						<br />
						<br />
						Cancellation:
						<br />
						Subscriptions must be canceled through the same platform or payment
						method used for the original purchase. This may include the Apple
						App Store, Google Play Store, or a third-party web billing platform.
						<br />
						For in-app purchases, users must go to their Apple ID or Google
						account and manage the renewal in the subscriptions section.
						<br />
						For web-based purchases, open the Google Play Store, tap on a
						profile icon, open Payments and subscriptions, select Subscriptions,
						and manage the relevant active subscription.
						<br />
						Questions about billing, cancellation, or account access may be sent
						to our support helpdesk.
						<br />
						<br />
						Refunds:
						<br />
						All purchases are considered final at the point of sale, unless
						required by local laws or by the rules of the platform through which
						the purchase was made. Downloaded digital content is usually not
						subject to a return policy and exceptions may apply only as required
						by local law.
					</p>

					<h2 className='section-title'>GENERAL NATURE OF THE SERVICES</h2>
					<p className='policy-text'>
						The services are designed to provide digital safety, screen
						protection, monitoring, and device management features for your
						devices. They may rely on third-party information, known threat
						lists, threat awareness tools, to help improve the digital
						environment.
					</p>

					<h2 className='section-title'>NO PROFESSIONAL ADVICE</h2>
					<p className='policy-text'>
						The services, reports, recommendations, alerts, and other content
						are provided for informational and educational purposes only. They
						do not constitute professional or expert advice, legal advice,
						medical advice, financial advice, cybersecurity consulting, or any
						other specialized advice. You should consult a qualified
						professional before taking or not taking action based on specialized
						advice.
						<br />
						<br />
						Personalized Features:
						<br />
						Some features may be adjusted based on account settings, user
						preferences, device information, usage patterns, or criteria
						provided by you. Personalized features are intended to improve
						usability and relevance, but results may vary depending on device
						configuration, network conditions, operating system restrictions,
						third-party services, and other factors outside the Company's
						control.
						<br />
						<br />
						No Guarantee of Results:
						<br />
						The Company does not guarantee that any feature will function
						perfectly, block every unwanted message or action, intercept all
						threats, prevent every security issue, or produce a guaranteed
						result. The services are intended to support your own efforts to
						maintain security, but they cannot eliminate all risks.
					</p>

					<h2 className='section-title'>ACCOUNT INFORMATION</h2>
					<p className='policy-text'>
						You agree to provide accurate, complete, and current information
						when creating or maintaining an account. This may include your name,
						email address, payment details, and other details required to
						operate the services. You are responsible for keeping your account
						information updated.
					</p>

					<h2 className='section-title'>ACCOUNT SECURITY</h2>
					<p className='policy-text'>
						You are responsible for maintaining the confidentiality of your
						login credentials and for all activity that occurs under your
						account. You should notify support promptly if you believe your
						account has been accessed without authorization.
					</p>

					<h2 className='section-title'>MINIMUM AGE</h2>
					<p className='policy-text'>
						The services are intended only for users who are at least 18 years
						old or the age of majority required in their jurisdiction, whichever
						is higher. By using the services, you confirm that you meet this
						requirement. If the Company determines that a user does not meet the
						applicable age requirement, the account may be suspended or
						terminated.
					</p>

					<h2 className='section-title'>ACCEPTABLE CONDUCT</h2>
					<p className='policy-text'>
						You agree to use the services lawfully and respectfully. You must
						not misuse the services, interfere with their operation, attempt to
						bypass security measures, access networks or systems without
						permission, harass support personnel or other users, submit false
						information, or use the services in any way that violates applicable
						laws or third-party rights.
						<br />
						The Company may restrict, suspend, or terminate access if it
						reasonably believes a user is engaged in abusive, fraudulent,
						unlawful, threatening, deceptive activity, or otherwise
						inappropriate conduct.
					</p>

					<h2 className='section-title'>DEVICE AND APP USAGE</h2>
					<p className='policy-text'>
						The services may include tools for security protection, device
						optimization, content filtering, identity monitoring, or similar
						functions. These tools are intended for personal consumer use and
						may not be suitable for enterprise systems, high-risk environments,
						regulated infrastructure, or specialized technical operations.
						<br />
						<br />
						Information displayed through the services may be incomplete,
						delayed, inaccurate, or affected by third-party limitations. You
						should not rely solely on the services when managing sensitive
						systems, responding to financial emergencies, legal disputes,
						emergencies, or personal safety situations.
						<br />
						<br />
						For complex or high-risk issues, you should seek dedicated
						professional guidance and consult qualified experts.
					</p>

					<h2 className='section-title'>USER RESPONSIBILITIES</h2>
					<p className='policy-text'>
						You agree to provide accurate account information, keep your login
						details secure, use the services lawfully, and read all
						documentation and screens before taking action based on the data
						provided by these services.
					</p>

					<h2 className='section-title'>MINIMUM AGE (REDUNDANT SECTION)</h2>
					<p className='policy-text'>
						The services are intended only for users who are at least 18 years
						old or the legal age of majority in their jurisdiction.
					</p>

					<h2 className='section-title'>
						DEVICE AND APP USAGE (REDUNDANT SECTION)
					</h2>
					<p className='policy-text'>
						The services are intended for general consumer use and may not be
						suitable for enterprise systems, high-risk environments, regulated
						infrastructure, or specialized cybersecurity operations.
					</p>

					<h2 className='section-title'>FEATURE AVAILABILITY</h2>
					<p className='policy-text'>
						Features may vary depending on your subscription plan, region,
						device, operating system, permissions, internet access, and platform
						restrictions.
					</p>

					<h2 className='section-title'>DISPUTE RESOLUTION</h2>
					<p className='policy-text'>
						Where permitted by law, disputes related to these Terms or the
						services may be resolved through binding arbitration rather than in
						court. Class action lawsuits, class arbitrations, and consolidated
						actions are not permitted.
					</p>

					<h2 className='section-title'>LIMITATION OF LIABILITY</h2>
					<p className='policy-text'>
						To the maximum extent permitted by law, the Company shall not be
						liable for indirect, incidental, special, consequential, or punitive
						damages, including loss of data, profits, goodwill, service access,
						or business opportunities.
					</p>

					<h2 className='section-title'>CHANGES TO TERMS</h2>
					<p className='policy-text'>
						The Company may update these Terms from time to time. Continued use
						of the services after updates become effective means you accept the
						revised Terms.
					</p>

					<h2 className='section-title'>GOVERNING LAW</h2>
					<p className='policy-text'>
						These Terms are governed by the laws of England and Wales, except
						where mandatory consumer protection laws provide otherwise.
					</p>

					<h2 className='section-title'>FINAL NOTICE</h2>
					<p className='policy-text'>
						By using the services, starting a trial, purchasing a subscription,
						or creating an account, you confirm that you have reviewed and
						accepted these Terms.
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
