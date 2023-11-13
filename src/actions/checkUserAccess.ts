import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import getStoresWithAccess from './getStoresWithAccess'

export default async function checkUserAccess(path: string) {
	const user = await currentUser()

	if (!user) {
		redirect('/')
	}

	const accessStores = await getStoresWithAccess(user.id)

	if (accessStores?.some((store) => store.path === path)) {
		return { userId: user.id }
	}

	redirect('/')
}
