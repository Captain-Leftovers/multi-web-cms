import Container from '@/components/ui/container'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function MotorcyclesPage() {
	return (
		<main className="w-full h-full py-10">
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
					<h1>Display all motos uploaded</h1>
				</div>
			</Container>
		</main>
	)
}