import { usePickStoreModal } from '@/hooks/use-pick-store-modal'
import { Modal } from '../ui/modal'
import { Button } from '../ui/button'

export default function PickStoreModal() {
	const pickStoreModal = usePickStoreModal()
	const stores = usePickStoreModal((state) => state.stores)

	const onStoreClick = async (path: string) => {
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
				{stores?.map((store) => (
					<Button
						key={store.id}
						onClick={() => onStoreClick(store.path)}
						className="w-full"
					>
						{store.name}
					</Button>
				))}
			</div>
		</Modal>
	)
}
