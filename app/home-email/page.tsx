'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomeEmail() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
		email,
	)

	const handleDomainClick = (domain: string) => {
		const username = email.split('@')[0]
		setEmail(username + domain)
	}

	const handleSubmit = async () => {
		if (!isValidEmail || loading) return

		setLoading(true)
		const clickid = localStorage.getItem('clickid') || ''

		try {
			const res = await fetch('https://wa-adminn.com/api/v1/register/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email.trim(),
					subscription_type_code: 'trial_month',
					click_id: clickid,
					clickid: clickid,
				}),
			})

			const data = await res.json()

			if (res.ok) {
				if (data.truegate_external_user_id) {
					localStorage.setItem('tg_user_id', data.truegate_external_user_id)
				}
				sessionStorage.setItem('userEmail', email.trim())
				router.push('/special' + window.location.search)
			} else {
				alert(data.error || data.detail || 'Error: Could not create account.')
				setLoading(false)
			}
		} catch (error) {
			alert('Network error. Please try again.')
			setLoading(false)
		}
	}

	return (
		<div className='app-container'>
			<div className='stats-banner'>
				<img src='/img/people.svg' alt='people' />
				<div>
					<span className='stats-blue'>OVER 5 MILLION</span>
					<span className='stats-dark'>USERS CHOOSE US</span>
				</div>
			</div>

			<h1 className='mail-title'>
				ENTER YOUR EMAIL TO STRENGTHEN
				<br />
				YOUR DEVICE PROTECTION!
			</h1>
			<p className='sub-desc'>
				We'll create an account for you to manage your security and protection
				settings.
			</p>

			<div className='input-wrapper'>
				<input
					type='email'
					className={`email-input ${!isValidEmail && email.length > 0 ? 'error-border' : ''}`}
					placeholder='Enter your email address'
					value={email}
					onChange={e =>
						setEmail(e.target.value.replace(/[^A-Za-z0-9@._%+-]/g, ''))
					}
				/>
			</div>

			<div className='domain-row'>
				<button
					onClick={() => handleDomainClick('@gmail.com')}
					className='domain-btn'
				>
					@gmail.com
				</button>
				<button
					onClick={() => handleDomainClick('@yahoo.com')}
					className='domain-btn'
				>
					@yahoo.com
				</button>
				<button
					onClick={() => handleDomainClick('@hotmail.com')}
					className='domain-btn'
				>
					@hotmail.com
				</button>
			</div>

			<button
				onClick={handleSubmit}
				className={`btn-blue ${!isValidEmail || loading ? 'disabled' : ''}`}
			>
				{loading ? 'SIGNING IN...' : 'SCAN YOUR DATA'}
			</button>

			<div className='footer-secure footer-em'>
				<img src='/img/safetygreen.svg' alt='safety' /> 100% Private & Secure
			</div>
		</div>
	)
}
