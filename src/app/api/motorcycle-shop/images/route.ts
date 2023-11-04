import axios from 'axios'
import {
	generateSHA1,
	generateSignature,
	getCloudinaryIdFromUrl,
} from '@/helpers/server-helpers/server-helpers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req:NextRequest, res:NextResponse) {
    const { url:urlID } = await req.json()
    console.log(urlID);
    
	const imageId = getCloudinaryIdFromUrl(urlID)
	if (typeof imageId !== 'string') {
		return NextResponse.json({ message: 'No images to delete' })
	}
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
	const timestamp = new Date().getTime()
	const apiKey = process.env.NEXT_CLOUDINARY_API_KEY!
	const apiSecret = process.env.NEXT_CLOUDINARY_API_SECRET!
	const signature = generateSHA1(generateSignature(imageId, apiSecret))
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`

	try {
		const response = await axios.post(url, {
			public_id: imageId,
			signature: signature,
			api_key: apiKey,
			timestamp: timestamp,
		})
        if (response.status === 200) {
            return NextResponse.json({ message: 'Image deleted' })
        }
		
	} catch (error) {
		console.error(error)
	}
}
