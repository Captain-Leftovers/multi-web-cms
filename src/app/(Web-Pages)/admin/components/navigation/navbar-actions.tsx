'use client'

import { UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

type NavbarActionsProps = {}
export default function NavbarActions({}: NavbarActionsProps) {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<div className="md:ml-auto flex items-center gap-x-4 ">
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}

