import type { Metadata } from 'next'
import { GeistSans, GeistMono } from 'geist/font'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/providers/toast-provider'
import { ModalProvider } from '@/providers/modal-provider'



export const metadata: Metadata = {
	title: 'Multi Web CMS',
	description: 'A CMS for my APP',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`${GeistSans.className}`}>
					<ToastProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
