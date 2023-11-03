import Link from 'next/link'
import Container from '@/components/ui/container'
import MainNav from './main-nav'
import NavbarActions from './navbar-actions'
import checkUserAccess from '@/actions/checkUserAccess'
import getStoresWithAccess from '@/actions/getStoresWithAccess'

export const revalidate = 0

export default async function Navbar() {
	const { userId } = await checkUserAccess('motorcycle-shop')

	const stores = await getStoresWithAccess(userId) || []

	return (
		<div className="z-50  h-16">
			<Container>
				<div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-around">
					<MainNav stores={stores} />
					<Link href="/motorcycle-shop" className=" mx-auto">
						<p className="font-bold text-xl">Moto Shop Dashboard</p>
					</Link>
					<NavbarActions />
				</div>
			</Container>
		</div>
	)
}

/* mix blend mode -  difference */
