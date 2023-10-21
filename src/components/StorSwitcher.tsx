"use client"

import { usePickStoreModal } from "@/hooks/use-pick-store-modal";
import { Store } from "@prisma/client"
import { useEffect } from "react";


type StorSwitcherProps = {
    stores: Store[]
  }


export default function StorSwitcher({stores}: StorSwitcherProps) {
    usePickStoreModal((state) => state.stores = stores);
    const onOpen = usePickStoreModal((state) => state.onOpen);
    const isOpen = usePickStoreModal((state) => state.isOpen);
  
    useEffect(() => {
      if (!isOpen) {
        onOpen();
      }
    }, [isOpen, onOpen]);
  

return null
    
}