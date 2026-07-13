import Link from 'next/link'

export default function RefundPolicyPage() {
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
					<h1 className='page-title'>REFUND POLICY</h1>

					<h2 className='section-title'>I. MONEY-BACK GUARANTEE TERMS</h2>
					<p className='policy-text'>
						In addition to any refund rights available to you under applicable
						law, you may qualify for a refund if you purchased a subscription
						directly through our official website and a money-back guarantee was
						clearly offered at checkout.
						<br />
						<br />
						To be eligible, all of the following conditions must be met:
						<br />
						You must contact us within 30 days of your first purchase, and
						before the current subscription period expires.
						<br />
						You must actively use the services for the minimum required period:
						<br />
						Monthly or longer subscriptions: at least 7 consecutive days.
						<br />
						4-week subscriptions: at least 4 consecutive days.
						<br />
						Weekly or bi-weekly subscriptions: at least 3 consecutive days.
						<br />
						You must provide evidence of your activity in accordance with the
						instructions in the "How to Confirm Service Participation" section
						below.
						<br />
						After receiving your request, we will review the submitted
						information and notify you of the decision by email or another
						available communication channel.
					</p>

					<h2 className='section-title'>SERVICES AND DIGITAL CONTENT</h2>
					<p className='policy-text'>
						No Professional Advice.
						<br />
						Our services may include digital device protection, privacy,
						security, monitoring, filtering, or account-related tools. These
						services are provided for general informational and personal use
						purposes only.
						<br />
						They do not constitute professional, technical, legal, medical,
						financial, cybersecurity, or other specialized advice. You should
						consult a qualified professional for advice specific to your
						circumstances.
						<br />
						<br />
						Personalized Features.
						<br />
						Some features may be adjusted based on your settings, activity
						preferences, device information, or information you provide.
						<br />
						Although personalized features are designed to improve user
						experience, email delivery may depend on device compatibility,
						permissions, third-party systems, user behavior, and technical
						limitations. No specific result is guaranteed.
					</p>

					<h2 className='section-title'>
						HOW TO CONFIRM SERVICE PARTICIPATION
					</h2>
					<p className='policy-text'>
						To qualify for a refund under the Money-Back Guarantee, you must
						provide clear screenshots from the app or service interface showing
						completed activity, sessions, tasks, checks, or other qualifying
						usage records.
						<br />
						<br />
						Minimum participation requirements:
						<br />
						Monthly or longer subscriptions: at least 7 completed sessions.
						<br />
						4-week subscriptions: at least 4 completed sessions.
						<br />
						Weekly or bi-weekly subscriptions: at least 3 completed sessions.
						<br />
						<br />
						You must meet the relevant participation requirement in full.
						Requests under this guarantee will not be issued if the required
						activity cannot be confirmed.
					</p>

					<h2 className='section-title'>II. GENERAL REFUND POLICY</h2>
					<p className='policy-text'>
						We aim to provide a reliable and useful digital experience. If you
						are not satisfied with your purchase, you may submit a refund
						request in accordance with this Refund Policy.
						<br />
						<br />
						If you do not meet the conditions of the Money-Back Guarantee, fees
						already paid are generally non-refundable and non-cancelable, unless
						a refund is required by applicable law or by the rules of the
						platform or payment provider used for the purchase. Refund requests
						outside the stated eligibility criteria may be reviewed
						individually, but approval is not guaranteed and remains at our
						discretion.
						<br />
						<br />
						Refund rules generally apply only within the current subscription
						period's context. If your subscription period has already expired
						when the request is submitted, we may be unable to process a refund.
					</p>

					<h2 className='section-title'>
						III. PURCHASES MADE THROUGH APP STORES OR THIRD-PARTY PLATFORMS
					</h2>
					<p className='policy-text'>
						If you purchased a subscription or digital product through Apple App
						Store, Google Play, PayPal, or another third-party platform, refund
						requests may be handled by the platform according to its own
						policies.
						<br />
						<br />
						We may not be able to approve, reject, or process refunds for
						purchases controlled by third-party billing systems.
						<br />
						You should submit refund requests directly through the platform
						where the purchase was made.
						<br />
						Deleting the app, closing your account, or stopping use of the
						services does not automatically cancel a subscription or trigger a
						refund.
					</p>

					<h2 className='section-title'>IV. SPECIAL NOTES BY REGION</h2>
					<p className='policy-text'>
						United Kingdom Residents.
						<br />
						If you reside in the United Kingdom and cancel your purchase within
						14 days of the transaction, you may be entitled to a refund in
						accordance with applicable consumer protection laws.
						<br />
						Your refund eligibility may depend on whether you accessed or used
						digital services during that period and whether any statutory
						exceptions apply.
						<br />
						<br />
						EEA and Switzerland Residents.
						<br />
						If you are a consumer based in the European Economic Area or
						Switzerland, you may have a legal right to withdraw from certain
						service contracts.
						<br />
						However, for digital content and digital services, this right may be
						limited or lost where:
						<br />
						You requested or agreed to immediate access to the digital content
						or service;
						<br />
						The service has already started with your consent; and
						<br />
						The digital content has been made available immediately.
						<br />
						You acknowledge that your withdrawal right may be affected by
						immediate performance.
						<br />
						For ongoing digital subscriptions, if you withdraw within the
						applicable legal period after service access has started, you may
						receive a proportional refund based on the unused portion of the
						service, where required by law.
					</p>

					<h2 className='section-title'>
						V. EXERCISING YOUR RIGHT OF WITHDRAWAL
					</h2>
					<p className='policy-text'>
						If you are legally entitled to withdraw from your purchase and
						exercise that right, the withdrawal period generally lasts 14 days
						from the date the contract is concluded.
						<br />
						To exercise your right of withdrawal or submit a refund request,
						contact us using the support details available in the app, on the
						website, or in your purchase confirmation.
						<br />
						<br />
						Your request should include:
						<br />
						Full name
						<br />
						Account email address
						<br />
						Purchase date
						<br />
						Subscription type
						<br />
						Payment platform or order reference
						<br />
						Reason for the refund request
						<br />
						Screenshots or proof of qualifying usage (if applying under the
						Money-Back Guarantee).
						<br />
						<br />
						We may request additional information if needed to verify the
						purchase, confirm eligibility, or prevent fraud.
					</p>

					<h2 className='section-title'>VI. PROCESSING OF APPROVED REFUNDS</h2>
					<p className='policy-text'>
						If your refund request is approved, the refund is usually processed
						to the original payment method used for the purchase.
						<br />
						Processing times may vary depending on your bank, card issuer, app
						store, payment processor, or billing provider.
						<br />
						We are not responsible for delays caused by third-party payment
						systems or financial institutions.
					</p>

					<h2 className='section-title'>VII. NON-REFUNDABLE SITUATIONS</h2>
					<p className='policy-text'>
						Unless required by applicable law, refunds may be refused where:
						<br />
						The refund request is submitted after the eligible period.
						<br />
						The subscription period has already ended.
						<br />
						The Money-Back Guarantee requirements are not met.
						<br />
						Required proof of participation is missing or unclear.
						<br />
						The purchase was made through a third-party platform that controls
						refunds.
						<br />
						The user violated the Terms of Service.
						<br />
						The request appears fraudulent, abusive, or inconsistent with this
						policy.
						<br />
						The services were used substantially before the refund request was
						made.
					</p>

					<h2 className='section-title'>VIII. CHANGES TO THIS REFUND POLICY</h2>
					<p className='policy-text'>
						We may update this Refund Policy from time to time to reflect
						changes in our services, billing practices, platform rules, or legal
						requirements.
						<br />
						When updates are made, the effective date above will be revised.
						Continued use of the services after the updated policy becomes
						effective means that you acknowledge the revised Refund Policy.
					</p>

					<h2 className='section-title'>IX. CONTACT</h2>
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
