import getStoresWithAccess from '@/actions/getStoresWithAccess'
import StorSwitcher from '@/components/stor-switcher'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Home() {
	const { userId } = auth()

	if (!userId) {
		redirect('/sign-in')
	}

	try {
		const stores = await getStoresWithAccess(userId)

		if (!stores) {
			return <div>You don't have access to any stores</div>
		}
		return <StorSwitcher stores={stores} />
	} catch (error) {
		console.log(error)
	}
}
