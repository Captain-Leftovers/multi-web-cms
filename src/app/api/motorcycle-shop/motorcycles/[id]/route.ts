import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
	console.log('in delete api')

    const id = req.nextUrl.href.split('/').pop()

    console.log(id);
    
	try {
        if (!id) {
            return NextResponse.json({
                message: `no id provided`,
            })
        }
        const resImages = await prismadb.motoItemImages.deleteMany({
            where: {
                motoItemId: id,
            },
        })
        
        console.log(resImages);
        

		const response = await prismadb.motoItem.delete({
			where: {
				id: id,
			},
		})

		console.log(response)

		if (response) {
			return NextResponse.json({
				message: `${response.make}, ${response.model} deleted`,
			})
		}
	} catch (error) {
		console.error(error)

        return NextResponse.json({
            message: `error deleting ${id}`,
        })
	}
}