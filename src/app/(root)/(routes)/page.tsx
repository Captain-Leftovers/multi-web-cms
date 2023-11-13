import { storeUserInDb } from '@/actions/admin-actions'
import getStoresWithAccess from '@/actions/getStoresWithAccess'
import StorSwitcher from '@/components/stor-switcher'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Home() {
	const userObj = await currentUser()

	const userId = userObj?.id
	if (!userObj) {
		redirect('/sign-in')
	}
	const email = userObj.emailAddresses.find(
		(email) => email.id === userObj.primaryEmailAddressId
	)

	if (!userId || email === undefined) {
		redirect('/sign-in')
	}

	const userForDb = {
		id: userId,
		name: userObj.firstName,
		email: email.emailAddress,
	}

	try {
		const userDb =await  storeUserInDb(userForDb)

		
	} catch (error) {
		console.log(error)
	}

	try {
		const stores = await getStoresWithAccess(userId)

		if (!stores) {
			return null
		}

		

		return <StorSwitcher stores={stores} />
	} catch (error) {
		console.log(error)
	}
}
