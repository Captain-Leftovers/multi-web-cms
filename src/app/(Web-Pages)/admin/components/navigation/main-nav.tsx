'use client'

import { RoutesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'
import { Store } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react'
import { usePickStoreModal } from '@/hooks/use-pick-store-modal'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
} from '@/components/ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

import { usePathname } from 'next/navigation'
import NavigationLink from './navigation-link'

const routesArr: RoutesType[] = [
	{
		href: '/admin',
		label: 'Home',
		description: 'Admin home page',
		targetSegment: 'admin',
	},
	
	{
		href:'/admin/user-access',
		label: 'Users Store Access',
		description: 'Manage user store access',
		targetSegment: 'user-access'
	}
]

type MainNavProps = {
	stores: Store[]
}
export default function MainNav({ stores }: MainNavProps) {
	const storeModal = usePickStoreModal()

	


	return (
		<nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
			<div className="flex items-center">
				<Button
					variant={'link'}
					className="p-0 decoration-2"
					onClick={() => storeModal.onOpen(stores)}
				>
					<ChevronLeft />
					Stores
					<ChevronRight />
				</Button>
			</div>
			{routesArr.map((route) => (
				<NavigationLink
					key={route.href}
					href={route.href}
					targetSegment={route.targetSegment}
					className="relative group text-sm font-medium transition-colors hover:text-black"
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger> {route.label}</TooltipTrigger>
							{!!route.description && (
								<TooltipContent>
									{route.description}
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				</NavigationLink>
			))}
		</nav>
	)
}
