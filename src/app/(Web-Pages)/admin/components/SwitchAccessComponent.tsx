'use client'

import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

type SwitchAccessComponentProps = {
	className?: string
	store: {
		id: string
		name: string
		path: string
	}
	userId: string
	checked: boolean
	loading:{loading:boolean, setLoading:React.Dispatch<React.SetStateAction<boolean>>}
}
export default function SwitchAccessComponent({
	className,
	checked,
	store,
	userId,
	loading
	
}: SwitchAccessComponentProps) {
	const [isChecked, setIsChecked] = useState(checked)
	const router = useRouter()
	const toggleAccess = async (storeId: string, userId: string) => {
		

		try {
			loading.setLoading(true)
			const res = await fetch('/api/admin/stores', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					storeId,
					userId,
				}),
			})
			const data = await res.json()
			toast.success(data.message)
            setIsChecked(!isChecked)

			if (!res.ok) throw new Error(data.message)
		} catch (error) {
			console.log(error)
		} finally {
			router.refresh()
			loading.setLoading(false)
		}

	}

	console.log('in switch access component')

	return (
		<Switch
		className={cn('', className)}
		disabled={loading.loading}
			checked={isChecked}
			onClick={() => toggleAccess(store.id, userId)}
		/>
	)
}
