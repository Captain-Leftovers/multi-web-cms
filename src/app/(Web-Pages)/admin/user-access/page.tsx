import Container from '@/components/ui/container'
import UserAccess from '@/app/(Web-Pages)/admin/components/user-access'
import { getAllUserStoresAndStores } from '@/actions/admin-actions'

type pageProps = {}
export default async function page({}: pageProps) {
	const data = await getAllUserStoresAndStores()

	if (!data) {
		return <div>loading...</div>
	}

	return (
		<Container className="px-4 my-1 grow w-full">
			<h1 className="text-4xl text-center">User Access</h1>
			<UserAccess data={data} />
		</Container>
	)
}
