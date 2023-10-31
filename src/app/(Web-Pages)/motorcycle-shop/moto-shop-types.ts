import { MotoItem, MotoItemImages } from "@prisma/client"

export type RoutesType = {
	href: string
	label: string
	description?: string
	targetSegment:string | null
	
}



export type MotoItemWithImagesType = MotoItem & {images: MotoItemImages[]}