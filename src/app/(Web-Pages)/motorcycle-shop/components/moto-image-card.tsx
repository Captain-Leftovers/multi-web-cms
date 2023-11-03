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

export const revalidate = 0

function getCoverImage(placeholder: string, imageData: MotoItemWithImagesType) {
	if (imageData.coverUrl != null && imageData.images.length > 0 && imageData.images.findIndex(value => value.url === imageData.coverUrl) !== -1) {
		return imageData.coverUrl
		
	} else if (imageData.images.length > 0) {
		return imageData.images[0].url
	} else {
		return placeholder
	}

}
export default function MotoImageCard({ imageData }: { imageData: MotoItemWithImagesType }) {


		const cover = getCoverImage('/images/placeholder.png', imageData)


	return (
		<div>
			<Card className=" w-[400px] h-[400px] p-4 overflow-hidden bg-transparent  hover:scale-105 transition-all ease-out duration-500 hover:bg-stone-100 group">
				<CardContent className="relative w-full h-4/5 flex flex-col justify-between">
					<CardDescription className="truncate w-full overflow-hidden"></CardDescription>

					<Link
						className=" z-50 w-11 h-11 hidden m-0 p-0 text-center rounded-full group-hover:block mx-auto hover:scale-110 transition-all  ease-out duration-500  items-center justify-center "
						href={{
							pathname: `/motorcycle-shop/motorcycles/${imageData.id}`,
							query: { data: JSON.stringify(imageData) },
						}}
					>
						<Expand className="w-10 h-10 bg-stone-100/50 rounded-full p-1 m-0" />
					</Link>
					<Image
						src={
							cover
						}
						alt={imageData.model != null ? imageData.model : ''}
						fill
						sizes='full'
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
