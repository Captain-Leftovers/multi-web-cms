import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(req: Request, res: NextResponse) {
	console.log('[PRODUCTS_GET]ddddd');
	
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
		console.log('[PRODUCTS_GET] products', products);
		

		return NextResponse.json([])
	} catch (error) {
		console.log('[PRODUCTS_GET]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
