import checkUserAccess from '@/actions/checkUserAccess'
import Container from '@/components/ui/container'
import { ArrowBigUp } from 'lucide-react'

export default async function MotorcycleShopHome() {
	await checkUserAccess('motorcycle-shop')

	return (
		<main className=" w-full h-full">
			<Container className=" flex flex-col mt-20">
				<div className="py-10 h-full">
					<ArrowBigUp
						className="mx-auto animate-bounce-slow transition"
						strokeWidth={1}
						size={100}
					/>
					<h1 className="text-xl md:text-4xl text-center px-2">
						Select What to Edit from the Navigation Menu
					</h1>
				</div>
			</Container>
		</main>
	)
}
