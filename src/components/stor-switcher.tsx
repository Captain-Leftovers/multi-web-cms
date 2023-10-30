"use client"

import { usePickStoreModal } from "@/hooks/use-pick-store-modal";
import { Store } from "@prisma/client"
import { useEffect } from "react";


type StorSwitcherProps = {
    stores: Store[]
  }


export default function StorSwitcher({stores}: StorSwitcherProps) {
    const {isOpen, onOpen} = usePickStoreModal();

    useEffect(() => {
      if (!isOpen) {
        onOpen(stores);
      }
    }, [isOpen, onOpen, stores]);
  

return null
    
}