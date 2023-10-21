import checkUserAccess from '@/actions/checkUserAccess'
import { UserButton } from '@clerk/nextjs'

export default async function page() {
	await checkUserAccess('motorcycle-shop')


	return (
		<div>
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}
