import Link from 'next/link'
import Container from '@/components/ui/container'
import MainNav from './main-nav'
import NavbarActions from './navbar-actions'
import checkUserAccess from '@/actions/checkUserAccess'
import getStoresWithAccess from '@/actions/getStoresWithAccess'

export const revalidate = 0

export default async function Navbar() {
	const { userId } = await checkUserAccess('motorcycle-shop')

	const stores = (await getStoresWithAccess(userId)) || []

	return (
		<div className="z-50  h-16">
			<Container className="py-2">
				<Link href="/motorcycle-shop" className=" mx-auto ">
					<div className="bg-gradient-to-r from-violet-400 to-purple-900 bg-clip-text">
						<p className="font-bold text-xl text-center text-transparent">
							Admin Dashboard
						</p>
					</div>
				</Link>
				<div className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-around">
					<MainNav stores={stores} />
					<NavbarActions />
				</div>
			</Container>
		</div>
	)
}

/* mix blend mode -  difference */
