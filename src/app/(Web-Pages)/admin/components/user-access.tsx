'use client'

import { Store, User, UserStore } from '@prisma/client'
import { useEditStoreAccessModal } from '@/hooks/useEditStoreAccessModal'

type FormInfoProps = {
	data: {
		stores: Store[]
		userStores: UserStore[]
		usersFromDb: User[]
	}
}
export default function UserAccess({ data }: FormInfoProps) {

	const accessModal = useEditStoreAccessModal()
	
	const storeAccess = (id:string) => {
		//return the stores with access and the stores without access from the stores array
		const storesWithAccess = data.stores.filter((store) => {
			return data.userStores.some((userStore) => {
				return userStore.storeId === store.id && userStore.userId === id
			})
		})
		const storesWithoutAccess = data.stores.filter((store) => {
			return !data.userStores.some((userStore) => {
				return userStore.storeId === store.id && userStore.userId === id
			})
		})

		const allStores = data.stores
		return {storesWithAccess, storesWithoutAccess, allStores }
		
		
}
	return (
		<div className="py-10">
			<ul className="even:bg-green-300 w-fit mx-auto">

				{data.usersFromDb.map((user) => (
					<li
					onClick={()=>accessModal.onOpen( storeAccess(user.id), user)}
						key={user.id}
						className="py-2 cursor-pointer even:text-black even:bg-white odd:bg-black odd:text-white font-medium hover:bg-red-600"
					>
						<div className="flex items-center">
							<p className=" px-4 py-2">
								<span>
									<b>Email:</b>{' '}
								</span>
								{user.email}
							</p>
							<p className=" px-4 py-2">
								<span>
									<b>Id:</b>{' '}
								</span>
								{user.id}
							</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
