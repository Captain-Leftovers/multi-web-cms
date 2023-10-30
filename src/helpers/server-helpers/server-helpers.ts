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

export const getCloudinaryIdFromUrl = (url: string) => {

    console.log(url);
    
    
	let arr = url.split('/')
    let imageId = arr[arr.length - 1].split('.')[0]
    console.log(imageId);
	imageId = 'moto/' + imageId
    
	console.log(imageId)
	return imageId
}





//https://res.cloudinary.com/moto-revive/image/upload/v1698477643/moto/vnouuor0afqksuexurtf.png

//https://res.cloudinary.com/moto-revive/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1698477643/moto/vnouuor0afqksuexurtf.png
//https://res.cloudinary.com/moto-revive/image/upload/w_200,h_200,c_limit,e_blur:400,o_90,b_black/l_text:arial_80:®,ar_1:1,c_lfill,o_60,co_rgb:ffffff,b_rgb:000000,r_max/v1698477643/moto/vnouuor0afqksuexurtf.png
