'use client'

import { usePickStoreModal } from '@/hooks/use-pick-store-modal'
import { Modal } from '../ui/modal'
import { Button } from '../ui/button'
import { useClerk, UserButton } from '@clerk/nextjs'


export default function PickStoreModal() {
	const pickStoreModal = usePickStoreModal()
	const stores = usePickStoreModal((state) => state.stores)

	
	const { signOut } = useClerk()

	const onStoreClick = async (path: string) => {
		console.log(path);
		
		window.location.assign(`/${path}`)
	}

	return (
		<Modal
			isOpen={pickStoreModal.isOpen}
			onClose={pickStoreModal.onClose}
			description="Choose what store to modify"
			title="Choose a Store"
			className="max-w-sm sm:max-w-md lg:max-w-lg"
		>
			<div className="flex flex-col gap-4 mx-auto sm:px-10 py-4">
				{stores?.length !== 0 ? (
					stores?.map((store) => (

						<Button
							key={store.id}
							onClick={() => onStoreClick(store.path)}
							className="w-full"
							variant={
								store.name === 'Admin'
									? 'destructive'
									: 'default'
							}
						>
							{store.name}
						</Button>
					))
				) : (
					<div className="flex flex-col gap-4 mx-auto sm:px-10 py-4">
						<p className="text-center">
							You don&apos;t have access to any stores yet.
						</p>
						<p className="text-center">
							Contact your administrator to get access.
						</p>
						<p className="text-center">
							Or sign in to create a store.
						</p>
						<Button
							onClick={() => signOut()}
							className="w-full mt-4"
						>
							Sign Out
						</Button>
					</div>
				)}
			</div>
		</Modal>
	)
}
