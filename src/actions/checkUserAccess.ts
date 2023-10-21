import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function checkUserAccess(path: string) {
	const user = await currentUser()

	if (!user) {
		redirect('/')
	}
	const meta = user.privateMetadata.accessTo

	if (!Array.isArray(meta) || (Array.isArray(meta) && !meta.includes(path))) {
		redirect('/')
	}

	return { userId: user.id, meta }
}
