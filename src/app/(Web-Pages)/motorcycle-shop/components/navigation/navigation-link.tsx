'use client'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type NavigationLinkProps = LinkProps & {
	targetSegment: string | null
	className?: string
	isActiveClassName?: string
	children: React.ReactNode
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
	targetSegment,
	className,
	isActiveClassName,
	children,
	...rest
}) => {
	const activeSegment = useSelectedLayoutSegment()
	const isActive = targetSegment === activeSegment

	return (
		<Link className={cn(className, isActiveClassName)} {...rest}>
			{children}
			<span
				className={`absolute left-0 inline-block  h-[2px] -bottom-0.5 bg-black group-hover:w-full transition-[width] ease duration-300 ${
					isActive ? 'w-full' : 'w-0'
				} `}
			>
				&nbsp;
			</span>
		</Link>
	)
}

export default NavigationLink
