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

export const revalidate = 0

function getCoverImage(placeholder: string, imageData: MotoItemWithImagesType) {
	if (
		imageData.coverUrl != null &&
		imageData.images.length > 0 &&
		imageData.images.findIndex(
			(value) => value.url === imageData.coverUrl
		) !== -1
	) {
		return imageData.coverUrl
	} else if (imageData.images.length > 0) {
		return imageData.images[0].url
	} else {
		return placeholder
	}
}
export default function MotoImageCard({
	imageData,
}: {
	imageData: MotoItemWithImagesType
}) {
	const cover = getCoverImage('/images/placeholder.png', imageData)

	return (
		<div className="">
			<Link
				className=" "
				href={{
					pathname: `/motorcycle-shop/motorcycles/${imageData.id}`,
					query: { data: JSON.stringify(imageData) },
				}}
			>
				<Card className="space-y-2 w-[380px] h-[380px] p-4 overflow-hidden bg-transparent  hover:scale-105 transition-all ease-out duration-500 hover:bg-stone-100 group">
					<CardContent className="relative w-full h-4/5 flex flex-col justify-between">
						<div className="z-50 flex">
							{imageData.sold && (
								<CardDescription className="ml-4 mt-4 bg-red-500 w-fit rounded-md px-2 py-1 text-white z-50">
									Sold
								</CardDescription>
							)}
							{imageData.onHold && (
								<CardDescription className="ml-4 mt-4 bg-yellow-300 w-fit rounded-md px-2 py-1 text-black font-semibold z-50">
									On Hold
								</CardDescription>
							)}
							{
						imageData.featured &&
						<CardDescription className="ml-4 mt-4 bg-green-500 w-fit rounded-lg px-2 py-1 text-white z-50">Featured</CardDescription>
					}
						</div>

						<Image
							src={cover}
							alt={imageData.model != null ? imageData.model : ''}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 750px) 50vw, 33vw"
							className="object-cover object-center rounded-lg"
						/>
					</CardContent>
					<CardFooter className="flex justify-between items-center ">
						<CardHeader className="overflow-hidden p-0">
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
			</Link>
		</div>
	)
}
