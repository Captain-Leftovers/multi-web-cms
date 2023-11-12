import prismadb from '@/lib/prismadb'
import { User } from '@prisma/client'

type UserForDb = Omit<User, 'createdAt' | 'updatedAt'>

export const storeUserInDb = async (user: UserForDb) => {
	try {
		const existingUser = await prismadb.user.findUnique({
			where: {
				id: user.id,
				email: user.email,
			},
		})

		if (!existingUser) {
			const newUser = await prismadb.user.create({
				data: {
					...user,
				},
			})

			return newUser
		} else {
			return existingUser
		}
	} catch (error) {
		console.error(error)
	}
}

export const getAllStores = async () => {
	try {
		const stores = await prismadb.store.findMany({})

		return stores
	} catch (error) {
		console.error(error)
	}
}

export const getAllUserStore = async () => {
	try {
		const userStores = await prismadb.userStore.findMany({})

		return userStores
	} catch (error) {
		console.error(error)
	}
}

export const getAllUserStoresAndStores = async () => {
	try {
		const [stores, userStores, usersFromDb] = await Promise.all([
			prismadb.store.findMany({}),
			prismadb.userStore.findMany({}),
			prismadb.user.findMany({}),
		])

		return { stores, userStores, usersFromDb }
	} catch (error) {
		console.error(error)
	}
}
