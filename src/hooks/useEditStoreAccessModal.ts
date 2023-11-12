import { User } from '@prisma/client'
import { create } from 'zustand'

type StoreAccessType = {
	storesWithAccess: {
		id: string
		name: string
		path: string
	}[]
	storesWithoutAccess: {
		id: string
		name: string
		path: string
	}[]
	allStores: {
		id: string;
		name: string;
		path: string;
	}[]
}

interface StoreModalStore {
	isOpen: boolean
	user: User | null
	storeAccess: StoreAccessType | null
	onOpen: (storeAccess: StoreAccessType, user: User) => void
	onClose: () => void
}

export const useEditStoreAccessModal = create<StoreModalStore>((set) => ({
	user: null,
	storeAccess: null,
	isOpen: false,
	onOpen: (storeAccess, user) =>
		set({ isOpen: true, storeAccess: storeAccess, user: user }),
	onClose: () => set({ isOpen: false }),
}))
