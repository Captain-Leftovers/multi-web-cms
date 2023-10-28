import checkUserAccess from '@/actions/checkUserAccess'
import Container from '@/components/ui/container'

export default async function MotorcycleShopHome() {
	await checkUserAccess('motorcycle-shop')

	return (
		<main className="bg-red-400 w-full h-full">
			<Container>
				<div className="py-10">
					<h1 className=" text-center text-4xl">
						Select What to Edit from the Navigation Menu
					</h1>
				</div>
			</Container>
		</main>
	)
}
