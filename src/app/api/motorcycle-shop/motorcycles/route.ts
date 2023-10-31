import prismadb from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json()

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
				featured: body.featured,
				sold: body.sold,
				onHold: body.onHold,
				addedByUserId: body.addedByUserId,
			},
		})

        console.log(response);
        
		if (response) {
			return NextResponse.json({
				message: `${body.make} ${!!body.model ? body.model : ''} added`,
			})
		}
	} catch (error) {
		console.error(error)
	}
}
