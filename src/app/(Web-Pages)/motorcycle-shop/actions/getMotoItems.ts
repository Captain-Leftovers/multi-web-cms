import prismadb from '@/lib/prismadb'

export async function getAllMotoItems() {
	try {
		const motoItem = await prismadb.motoItem.findMany({
			where: {},
			include: {
				images: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return { motoItem, error: null }
	} catch (error) {
		console.error(error)
		return { motoItem: null, error }
	}
}
