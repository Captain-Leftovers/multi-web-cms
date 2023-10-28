import { Store } from '@prisma/client';
import { create } from 'zustand';

interface StoreModalStore {
  isOpen: boolean;
  stores? : Store[];
  onOpen: (stores:Store[]) => void;
  onClose: () => void;
}

export const usePickStoreModal = create<StoreModalStore>((set) => ({
  stores: [],
  isOpen: false,
  onOpen: (stores) => set({ isOpen: true, stores: stores }),
  onClose: () => set({ isOpen: false }),
}));


