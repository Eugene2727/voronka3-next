'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Tracker() {
	const searchParams = useSearchParams()

	useEffect(() => {
		function setCookie(name: string, value: string, days = 30) {
			const date = new Date()
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
			document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`
		}

		const clickid =
			searchParams.get('clickid') ||
			searchParams.get('clk_id') ||
			searchParams.get('click_id')
		if (clickid) {
			localStorage.setItem('clickid', clickid)
			setCookie('clickid', clickid, 30)
		}
	}, [searchParams])

	return null
}
