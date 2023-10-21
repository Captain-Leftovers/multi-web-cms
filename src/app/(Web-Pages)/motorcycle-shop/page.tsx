import checkUserAccess from '@/actions/checkUserAccess'
import { UserButton } from '@clerk/nextjs'

export default async function page() {
	await checkUserAccess('motorcycle-shop')

	//TODO :  add navigation and proceeed with app from here you can check access and send user home if they dont trough te checkuseraccess function
	return (
		<div>
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}
