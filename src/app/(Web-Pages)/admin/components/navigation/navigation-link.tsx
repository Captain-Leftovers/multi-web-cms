'use client'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

type NavigationLinkProps = LinkProps & {
	targetSegment: string | null
	className?: string
	isActiveClassName?: string
	children: React.ReactNode
	noSpan?: boolean
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
	targetSegment,
	className,
	isActiveClassName,
	children,
	noSpan,
	...rest
}) => {
	const path = usePathname()
	// const activeSegment = useSelectedLayoutSegment()
	// const isActive = targetSegment === activeSegment
	const isActive = path === rest.href

	return (
		<Link className={cn(className, isActiveClassName)} {...rest}>
			{children}
			{!noSpan && (
				<span
					className={`absolute left-0 inline-block  h-[2px] -bottom-0.5 bg-black group-hover:w-full transition-[width] ease duration-300 ${
						isActive ? 'w-full' : 'w-0'
					} `}
				>
					&nbsp;
				</span>
			)}
		</Link>
	)
}

export default NavigationLink
