import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req: Request, res: NextResponse) {
	
	try {
		const products = await prismadb.motoItem.findMany({
			where: {
				sold: false,
			},
			include: {
				images: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		

		return NextResponse.json(products)
	} catch (error) {
		console.log('[PRODUCTS_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
