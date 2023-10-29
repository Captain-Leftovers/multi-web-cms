import prismadb from '@/lib/prismadb'

export default async function getStoresWithAccess(userId: string) {
	try {
		const stores = await prismadb.userStore.findMany({
			where: {
				userId: userId,
			},
			include: {
				store: true,
			},
		})

		const formattedStores = stores.map((store) => {
			return store.store
		})

		if (!formattedStores) {
			return []
		}
		return formattedStores
	} catch (error) {
		console.error(error)
	}
}
