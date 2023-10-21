import { Store } from '@prisma/client';
import { create } from 'zustand';

interface useStoreModalStore {
  stores? : Store[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePickStoreModal = create<useStoreModalStore>((set) => ({
  stores: [],
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
