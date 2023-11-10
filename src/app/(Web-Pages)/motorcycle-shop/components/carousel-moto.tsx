import { MotoItemWithImagesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'
import MotoImageCard from '@/app/(Web-Pages)/motorcycle-shop/components/moto-image-card'
import toast from 'react-hot-toast'

type CarouselProps = {
	motoImagesArr: MotoItemWithImagesType[]
	errMessage: string | null
}

export default function Carousel({ motoImagesArr, errMessage }: CarouselProps) {
	if (errMessage) {
		toast.error(errMessage)
	}
	

	return (
		<div className="flex gap-8 overflow-hidden flex-wrap justify-center py-4">
			{motoImagesArr.map((motoImage) => (
				<MotoImageCard imageData={motoImage} key={motoImage.id} />
			))}
		</div>
	)
}
