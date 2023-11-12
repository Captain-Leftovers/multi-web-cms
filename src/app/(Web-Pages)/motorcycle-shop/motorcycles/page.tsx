import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { getAllMotoItems} from '@/app/(Web-Pages)/motorcycle-shop/actions/getMotoItems'
import Carousel from '../components/carousel-moto'
import { Separator } from '@/components/ui/separator'

export const revalidate = 0

export default async function MotorcyclesPage() {
	const motoItems = await getAllMotoItems()

	let itemError =
		motoItems.error instanceof Error ? motoItems.error.message : null

	return (
		<main className="w-full min-h-full py-10 px-4">
			<Container>
				<div className="flex justify-between items-center">
					<Heading
						title="Motorcycles"
						description="See Motorcycles you Uploaded"
					/>
					<Link
						href="/motorcycle-shop/motorcycles/add-new"
						className="bg-stone-900 text-stone-50 hover:bg-stone-900/90 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50/90 flex gap-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300 h-10 px-4 py-2"
					>
						<Plus size={20} />
						Add New
					</Link>
				</div>
				<div className="">
					<Separator className="my-8" />
					<Carousel
						motoImagesArr={
							!!motoItems.motoItem ? motoItems.motoItem : []
						}
						errMessage={itemError}
					/>
				</div>
			</Container>
		</main>
	)
}
