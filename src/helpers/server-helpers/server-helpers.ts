import crypto from 'crypto'

export const generateSHA1 = (data: any) => {
	const hash = crypto.createHash('sha1')
	hash.update(data)
	return hash.digest('hex')
}

export const generateSignature = (publicId: string, apiSecret: string) => {
	const timestamp = new Date().getTime()
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
}

export const getCloudinaryIdFromUrl = (url: string | string[]) => {
	if (typeof url === 'string') {
		
		let arr = url.split('/')
		let imageId = arr[arr.length - 1].split('.')[0]
		imageId = 'moto/' + imageId
		
		return imageId
	} else if( Array.isArray(url)) {
		return url.map((url) => {
			let arr = url.split('/')
			let imageId = arr[arr.length - 1].split('.')[0]
			imageId = 'moto/' + imageId
			
			return imageId
		})
	}
}
