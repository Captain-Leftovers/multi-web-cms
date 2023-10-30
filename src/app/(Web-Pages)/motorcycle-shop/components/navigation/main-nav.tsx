'use client'

import { cn } from '@/lib/utils'
import { RoutesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'
import Link from 'next/link'
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
import { isActiveLink } from '@/app/api/helpers/client-helpers'

const routesArr: RoutesType[] = [
	{
		href: 'motorcycle-shop',
		label: 'Home',
		description: 'Go to the Home Page',
		targetSegment: null
		
	},
	{
		href: 'motorcycle-shop/motorcycles',
		label: 'Motorcycles',
		description: 'Go to the Motorcycles Page',
		targetSegment: 'motorcycles'
	},
]

type MainNavProps = {
	stores: Store[]
}
export default function MainNav({ stores }: MainNavProps) {
	const storeModal = usePickStoreModal()
	const pathname = usePathname()
	
	const routes = routesArr.map((route) => ({
		href: `/${route.href}`,
		label: route.label,
		// active:pathname === `/${route.href}` || pathname === `/${route.href}/add-new`,
		active : isActiveLink(route.targetSegment),
		description: route.description,
	}))
		
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
			{routes.map((route) => (
				<Link
					href={route.href}
					key={route.href}
					className={cn(
						'relative group text-sm font-medium transition-colors hover:text-black'
					)}
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								{route.label}
								<span
									className={`absolute left-0 inline-block  h-[2px] -bottom-0.5 bg-black group-hover:w-full transition-[width] ease duration-300 ${
										route.active ? 'w-full' : 'w-0'
									} `}
								>
									&nbsp;
								</span>
							</TooltipTrigger>
							<TooltipContent>{route.description}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Link>
			))}
		</nav>
	)
}
