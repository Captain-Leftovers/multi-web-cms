import { Modal } from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { useEditStoreAccessModal } from '@/hooks/useEditStoreAccessModal'

type EditStoreAccessModalProps = {}
export default function EditStoreAccessModal({}: EditStoreAccessModalProps) {
	const modal = useEditStoreAccessModal()
	
	if (
		modal.user === undefined ||
		modal.user === null ||
		modal.storeAccess === undefined ||
		modal.storeAccess === null
		)
		return null
		
		const userId = modal.user.id
		const storesWithAccess = modal.storeAccess.storesWithAccess
		const storesWithoutAccess = modal.storeAccess.storesWithoutAccess


		const toggleAccess = async (storeId: string, userId: string) => {}


	return (
		<Modal
			description={`Toggle store access for ${modal.user.email}`}
			isOpen={modal.isOpen}
			title="Stores"
			onClose={modal.onClose}
			className="bg-green-300"
		>
			<div className="">
				<ul>
					{modal.storeAccess.allStores.map((store) => (
						<li key={store.id} className="grid grid-cols-2">
							<p>{store.name}</p>{' '}
							<div className="mx-auto">
								<Switch
									checked={storesWithAccess.some(
										(acc) => acc.name === store.name
									)}
									onChange={() =>
										toggleAccess(store.id, userId)
									}
								/>
							</div>
						</li>
					))}
				</ul>
			</div>
		</Modal>
	)
}
