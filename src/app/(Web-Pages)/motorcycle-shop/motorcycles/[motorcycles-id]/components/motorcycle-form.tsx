'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
import AlertModal from '@/components/modals/alert-modal'
import { Info, Trash } from 'lucide-react'
import ImageUpload from '@/components/ui/image-upload'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useUser } from '@clerk/nextjs'
import { MotoItemWithImagesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import FormInfo from './FormInfo'

const formSchema = z.object({
	make: z.string().min(2, 'Make must be at least 2 characters.'),
	model: z.string().optional(),
	description: z.string().optional(),
	price: z
		.number()
		.min(0)
		.optional()
		.transform((value) => (value === 0 ? undefined : value)),
	images: z
		.object({
			url: z.string().url(),
		})
		.array(),
	coverUrl: z.string().url().optional(),
	featured: z.boolean().optional(),
	sold: z.boolean().optional(),
	onHold: z.boolean().optional(),
})

type MotorcycleFormProps = {}

type formValuesType = z.infer<typeof formSchema>

export default function MotorcycleForm({}: MotorcycleFormProps) {
	const [open, setOpen] = useState(false)
	const [openInfo, setOpenInfo] = useState(false)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { user } = useUser()
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const searchParams = useSearchParams()

	const initialData: MotoItemWithImagesType = searchParams.get('data')
		? JSON.parse(searchParams.get('data') as string)
		: null

	const title = initialData ? 'Edit Item' : 'Create Item'
	const description = initialData ? 'Edit Item' : 'Add a new Item'
	const toastMessage = initialData ? 'updated.' : 'created.'
	const action = initialData ? 'Save changes' : 'Create'

	const processedInitialData = initialData
		? {
				...initialData,
				model: initialData.model || '',
				make: initialData.make || '',
				description: initialData.description || '',
				price: initialData.price || undefined,
				images: initialData.images || [],
				featured: initialData.featured || false,
				sold: initialData.sold || false,
				onHold: initialData.onHold || false,
				coverUrl: initialData.coverUrl || undefined,
		  }
		: {
				make: '',
				model: '',
				description: '',
				price: undefined,
				images: [],
				featured: false,
				sold: false,
				onHold: false,
				coverUrl: undefined,
		  }

	const form = useForm<formValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues: processedInitialData,
	})

	const { remove, append } = useFieldArray<formValuesType>({
		name: 'images',
		control: form.control,
	})

	async function onSubmit(values: formValuesType) {
		if (!user)
			return toast.error('You must be logged in to create an item.')
		try {
			setLoading(true)
			let res
			if (!initialData) {
				const data = { ...values, addedByUserId: user.id }
				res = await axios.post('/api/motorcycle-shop/motorcycles', data)
			} else {
				const data = {
					...values,
					addedByUserId: initialData.addedByUserId,
					id: initialData.id,
				}
				res = await axios.put('/api/motorcycle-shop/motorcycles', data)
			}

			toast.success(`${res.data.message} ${toastMessage}`)
			router.push('/motorcycle-shop/motorcycles')
			router.refresh()
		} catch (error: any) {
			if (error.message) {
				return toast.error(error.message)
			}
		} finally {
			setLoading(false)
		}
	}
	const removeImageFn = async (url: string) => {
		setLoading(true)
		try {
			const response = await axios.post('/api/motorcycle-shop/images', {
				url,
			})

			toast.success(response.data.message)
			return true
		} catch (error: any) {
			if (error.message) {
				return toast.error(error.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const onDelete = async () => {
		setOpen(false)
		if (!initialData) return
		try {
			setLoading(true)

			const res = await axios.delete(
				`/api/motorcycle-shop/motorcycles/${initialData.id}`
			)

			toast.success(res.data.message)
			router.push('/motorcycle-shop/motorcycles')
			router.refresh()
			initialData.images.forEach(async (image) => {
				await removeImageFn(image.url)
			})
		} catch (error: any) {
			if (error.message) {
				return toast.error(error.message)
			}
		} finally {
			setLoading(false)
		}
	}
	const currentCover = form.getValues('coverUrl')

	if (!isMounted) return null

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				loading={loading}
				onConfirm={onDelete}
			/>
			<div className="flex itmes-center px-2">
				<Heading title={title} description={description} />
				<FormInfo open={openInfo} onClose={() => setOpenInfo(false)} />
				<Button
					className="h-10 w-10 bg-transparent text-black p-0 hover:bg-transparent group rounded-full mx-1 mr-auto"
					onClick={() => setOpenInfo(true)}
				>
					<Info
						size={28}
						className="m-2  group-hover:scale-125 animate-pulse transition"
					/>
				</Button>
				{initialData && (
					<Button
						variant="destructive"
						size="icon"
						onClick={() => setOpen(true)}
						disabled={loading}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full px-2"
				>
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value}
										cover={currentCover}
										disabled={loading}
										onChange={(url) => {
											append({ url })
										}}
										onCoverChange={(
											cover: string | undefined
										) => {
											form.setValue('coverUrl', cover)
										}}
										onRemove={async (url) => {
											if (await removeImageFn(url)) {
												remove(
													field.value.findIndex(
														(image) =>
															image.url === url
													)
												)

												if (currentCover === url) {
													form.setValue(
														'coverUrl',
														undefined
													)
												}
											}
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex gap-8">
						<FormField
							control={form.control}
							name="make"
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Input
											placeholder="Make like Honda, Yamaha, etc."
											{...field}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="model"
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Input
											placeholder="Model like CBR, R1, etc."
											{...field}
											disabled={loading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<Textarea
										rows={5}
										className="w-full md:w-2/3"
										placeholder="Description"
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<div className="flex items-center gap-2">
										<Input
											type="number"
											className="w-auto"
											placeholder="Price"
											{...field}
											disabled={loading}
											onChange={(e) =>
												field.onChange(
													parseFloat(
														e.target.value
													) || 0
												)
											}
										/>
										<p>BGN</p>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-around">
						<FormField
							control={form.control}
							name="featured"
							render={({ field }) => (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<FormItem className="">
												<FormLabel></FormLabel>
												<FormControl>
													<Switch
														disabled={loading}
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormDescription>
													Featured
												</FormDescription>
												<FormMessage />
											</FormItem>
										</TooltipTrigger>
										<TooltipContent>
											<p>Use this to mark as Featured</p>
											<p>
												Only Featured items appear in
												the Moto-Repair website
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						/>
						<FormField
							control={form.control}
							name="onHold"
							render={({ field }) => (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<FormItem>
												<FormLabel></FormLabel>
												<FormControl>
													<Switch
														disabled={loading}
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormDescription>
													On hold
												</FormDescription>
												<FormMessage />
											</FormItem>
										</TooltipTrigger>
										<TooltipContent>
											<p>Use this to mark as On Hold</p>
											<p>
												On Hold items don&apos;t appear in
												the Moto-Repair website but they
												are still visible in this
												dashboard
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						/>
						<FormField
							control={form.control}
							name="sold"
							render={({ field }) => (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<FormItem>
												<FormLabel></FormLabel>
												<FormControl>
													<Switch
														disabled={loading}
														checked={field.value}
														onCheckedChange={
															field.onChange
														}
													/>
												</FormControl>
												<FormDescription>
													Sold
												</FormDescription>
												<FormMessage />
											</FormItem>
										</TooltipTrigger>
										<TooltipContent>
											<p>Use this to mark as Sold</p>
											<p>
												Sold items don&apos;t appear in the
												Moto-Repair website but they are
												still visible in this dashboard
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						/>
					</div>
					<Button disabled={loading} type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	)
}
