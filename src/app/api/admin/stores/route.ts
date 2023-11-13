import prismadb from '@/lib/prismadb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	const body = await req.json()

	const { storeId, userId } = body
    
	if (!storeId || !userId || typeof storeId !== 'string' || typeof userId !== 'string') {
  

        
        
		return NextResponse.json({
			message: `Missing storeId or userId`,
		})
	}

	//check if user has access first
	const hasAccess = await prismadb.userStore.findUnique({
		where: {
			userId_storeId: {
				storeId: storeId,
				userId: userId,
			},
		},
	})

	if (hasAccess !== null && hasAccess) {
		try {
			const response = await prismadb.userStore.delete({
				where: {
					userId_storeId: {
						storeId: storeId,
						userId: userId,
					},
				},
			})

			if (
				response &&
				response.id &&
				response.storeId &&
				response.userId
			) {
				return NextResponse.json({
					message: `User ${response.userId} was removed from store ${response.storeId}`,
				})
			}
		} catch (error) {
			console.error(error)

			return NextResponse.json({
				message: `Error: ${error}`,
			})
		}
	} else if (hasAccess === null) {
		try {
			const response = await prismadb.userStore.create({
				data: {
					storeId,
					userId,
				},
			})

			if (
				response &&
				response.id &&
				response.storeId &&
				response.userId
			) {
				return NextResponse.json({
					message: `User ${response.userId} was granted access to store ${response.storeId}`,
				})
			}
		} catch (error) {
			console.error(error)

			return NextResponse.json({
				message: `Error: ${error}`,
			})
		}
	} else {
		return NextResponse.json({
			message: `couldn't perform the operation for  user ${userId} to store ${storeId}`,
		})
	}
}
