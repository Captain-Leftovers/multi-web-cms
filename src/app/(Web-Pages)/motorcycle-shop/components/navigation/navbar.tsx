import Link from 'next/link'
import Container from '@/components/ui/container'
import MainNav from './main-nav'
import NavbarActions from './navbar-actions'

export const revalidate = 0

export default async function Navbar() {

	return (
		<div className="z-50 backdrop-filter sticky top-0 h-16">
			<Container>
				<div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
					<Link href="/motorcycle-shop" className="ml-4 flex lg:ml-0 gap-x-2">
						<p className="font-bold text-xl">Moto Shop Dashboard</p>
					</Link>
					<MainNav />
					<NavbarActions />
				</div>
			</Container>
		</div>
	)
}
   

/* mix blend mode -  difference */