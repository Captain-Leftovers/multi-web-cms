'use client'

import { Modal } from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { useEditStoreAccessModal } from '@/hooks/useEditStoreAccessModal'
import SwitchAccessComponent from '../SwitchAccessComponent'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'

type EditStoreAccessModalProps = {}
export default function EditStoreAccessModal({}: EditStoreAccessModalProps) {
	const modal = useEditStoreAccessModal()
	const [loading, setLoading] = useState(false)

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

	console.log('before modal return return')

	return (
		<Modal
			description={`Toggle store access for ${modal.user.email}`}
			isOpen={modal.isOpen}
			title="Stores"
			onClose={modal.onClose}
			className=""
		>
			<div className="">
				<ul className="">
					{modal.storeAccess.allStores.map((store) => (
						<li
							key={store.id}
							className="group hover:font-semibold transition"
						>
							<div className="grid grid-cols-2">
								<p className="cursor-default">{store.name}</p>{' '}
								<div className="mx-auto ">
									<SwitchAccessComponent
										className=" "
										loading={{ loading, setLoading }}
										userId={userId}
										checked={storesWithAccess.some(
											(acc) => acc.name === store.name
										)}
										store={store}
									/>
								</div>
							</div>
							<Separator className=" group-hover:bg-black" />
						</li>
					))}
				</ul>
			</div>
		</Modal>
	)
}
