import { MotoItemWithImagesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'
import prismadb from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	const body:MotoItemWithImagesType = await req.json()

	try {
		const response = await prismadb.motoItem.create({
			data: {
				make: body.make,
				model: body.model,
				description: body.description,
				price: body.price,
				images: {
					create: body.images,
				},
				coverUrl: body.coverUrl,
				featured: body.featured,
				sold: body.sold,
				onHold: body.onHold,
				addedByUserId: body.addedByUserId,
			},
		})


		if (response) {
			return NextResponse.json({
				message: `${body.make} ${!!body.model ? body.model : ''}`,
			})
		}
	} catch (error) {
		console.error(error)
	}
}

export async function PUT(req: NextRequest, res: NextResponse) {
	const body:MotoItemWithImagesType = await req.json()
	 
	try {
		const response = await prismadb.motoItem.update({
			where: {
				id: body.id,
			},
			data:{
				...body,
				coverUrl: body.coverUrl,
				make: body.make,
				model: body.model,
				price: body.price,
				description: body.description,
				featured: body.featured,
				sold: body.sold,
				onHold: body.onHold,
				addedByUserId: body.addedByUserId,
				images: {
					deleteMany: {},
					create: body.images,
				},
			}
		})


		if (response) {
			
			return NextResponse.json({
				message: `${body.make} ${!!body.model ? body.model : ''}`,
			})
		}
	} catch (error) {
		console.error(error)
	}
}


