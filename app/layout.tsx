import './globals.css'
import Tracker from './components/Tracker'
import { Suspense } from 'react'

export const metadata = {
	title: 'Security Protection App',
	description: '100% Private & Secure',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body>
				<Suspense fallback={null}>
					<Tracker />
				</Suspense>
				{children}
			</body>
		</html>
	)
}
