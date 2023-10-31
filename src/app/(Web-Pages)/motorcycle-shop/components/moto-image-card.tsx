import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { MotoItemWithImagesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'

import Image from 'next/image'
import Link from 'next/link'
import { Expand } from 'lucide-react'
// import CardExpandButton from './card-expand-button'

export const revalidate = 0

export default function ({ imageData }: { imageData: MotoItemWithImagesType }) {
	return (
		<div>
			<Card className=" w-[400px] h-[400px] p-4 overflow-hidden bg-transparent  hover:scale-105 transition-all ease-out duration-500 hover:bg-stone-100 group">
				<CardContent className="relative w-full h-4/5 flex flex-col justify-between">
					<CardDescription className="truncate w-full overflow-hidden text-black/80"></CardDescription>

TODO : fix icon to be centered and go fix form data page get the json props
					<Link
						className="z-50 w-10 h-10  rounded-full bg-black/70 mx-auto hidden group-hover:block hover:scale-110 transition-all  ease-out duration-500 "

						href={{
							pathname: `/motorcycle-shop/motorcycles/${imageData.id}`,
							query: { data: JSON.stringify(imageData) },
						}}
					>
						<Expand className="mx-auto" />
					</Link>
					<Image
						src={
							imageData?.images[imageData?.images?.length - 1]
								?.url || '/images/placeholder.png'
						}
						alt={imageData.model != null ? imageData.model : ''}
						fill
						className="object-cover object-center rounded-lg"
					/>
				</CardContent>
				<CardFooter className="flex justify-between items-center ">
					<CardHeader className="overflow-hidden pl-0">
						<CardTitle className="truncate w-full overflow-hidden">
							{!!imageData.make && imageData.make}
						</CardTitle>
						<CardDescription className="truncate w-full overflow-hidden text-gray-600">
							{!!imageData.model && imageData.model}
						</CardDescription>
					</CardHeader>
					<CardDescription className="text-black font-semibold">
						{imageData.price}
					</CardDescription>
				</CardFooter>
			</Card>
		</div>
	)
}
