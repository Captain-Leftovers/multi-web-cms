'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import toast from 'react-hot-toast'

type ImageUploadProps = {
	disabled: boolean
	onChange: (value: string, isCover: boolean) => void
	onRemove: (value: string) => void
	value: { url: string; isCover: boolean }[]
}

export default function ImageUpload({
	disabled,
	onChange,
	onRemove,
	value,
}: ImageUploadProps) {
	const [isMounted, setIsMounted] = useState(false)

	let setCover = false

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const onUpload = (result: any) => {
		toast.success('Image uploaded')

		onChange(result.info.secure_url, setCover)
	}

	if (!isMounted) return null

	return (
		<div>
			<div className="mb-4 flex items-center gap-6 flex-wrap">
				{!value.length ? (
					<Image
						src={'/images/placeholder.png'}
						width={200}
						height={200}
						alt="placeholder"
						className="opacity-50"
						priority
					/>
				) : (
					value?.map(({ url,isCover }) => (
						<div
							key={url}
							className="relative w-[200px] h-[200px] overflow-hidden border border-gray-500 rounded-md p-4"
						>
							<Button
								className="absolute top-2 right-2 z-10"
								type="button"
								onClick={() => onRemove(url)}
								variant="destructive"
								size="icon"
							>
								<Trash className="h-4 w-4" />
							</Button>
							<Button
								className="absolute bottom-2 left-2 z-10 bg-green-600 hover:bg-green-600/80"
								type="button"
								onClick={() => isCover= true}
								variant="destructive"
								size="sm"
							>
								cover
							</Button>

							<Image
								fill
								className="object-contain"
								alt="Image"
								src={url}
							/>
						</div>
					))
				)}
			</div>
			<CldUploadWidget onSuccess={onUpload} uploadPreset="moto-revive">
				{({ open }) => {
					const onClick = () => {
						open()
					}
					return (
						<Button
							type="button"
							disabled={disabled}
							onClick={onClick}
							className=""
						>
							<ImagePlus className="h-4 w-4 mr-2" />
							Upload an image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}
