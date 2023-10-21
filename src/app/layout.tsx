import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/providers/toast-provider'
import { ModalProvider } from '@/providers/modal-provider'

const inter = Inter({ subsets: ['latin'] })

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
				<body className={`${inter.className} h-screen w-screen`}>
					<ToastProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
