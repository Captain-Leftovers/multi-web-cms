'use client'

import { useEffect, useState } from 'react'

import PickStoreModal from '@/components/modals/pick-store-modal'
import AlertModal from '@/components/modals/alert-modal'



export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false)



	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<PickStoreModal />
		</>
	)
}
