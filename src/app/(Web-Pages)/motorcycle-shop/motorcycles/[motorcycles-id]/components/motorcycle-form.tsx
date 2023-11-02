'use client'

import { DevTool } from '@hookform/devtools'

import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useFieldArray, useForm } from 'react-hook-form'
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
import { MotoItem } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
import AlertModal from '@/components/modals/alert-modal'
import { Trash } from 'lucide-react'
import ImageUpload from '@/components/ui/image-upload'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import prismadb from '@/lib/prismadb'
import { useUser } from '@clerk/nextjs'
import { MotoItemWithImagesType } from '@/app/(Web-Pages)/motorcycle-shop/moto-shop-types'

const formSchema = z.object({
	make: z.string().min(2, 'Too short'),
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
			isCover: z.boolean(),
		})
		.array(),
	featured: z.boolean().optional(),
	sold: z.boolean().optional(),
	onHold: z.boolean().optional(),
})

type MotorcycleFormProps = {}

type formValuesType = z.infer<typeof formSchema>

export default function MotorcycleForm({}: MotorcycleFormProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const { user } = useUser()

	const searchParams = useSearchParams()

	const initialData: MotoItemWithImagesType = searchParams.get('data')
		? JSON.parse(searchParams.get('data') as string)
		: null

	const title = initialData ? 'Edit Item' : 'Create Item'
	const description = initialData ? 'Edit Item' : 'Add a new Item'
	const toastMessage = initialData ? 'Item updated.' : 'Item created.'
	const action = initialData ? 'Save changes' : 'Create'

	// 1. Define your form.

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

			toast.success(res.data.message)
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

	const onDelete = async () => {
		setOpen(false)
		if (!initialData) return
		try {
			setLoading(true)
		
			const res = await axios.delete(`/api/motorcycle-shop/motorcycles/${initialData.id}` )

			toast.success(res.data.message)
			router.push('/motorcycle-shop/motorcycles')
			router.refresh()
		} catch (error: any) {
			if (error.message) {
				return toast.error(error.message)
			}
		} finally {
			setLoading(false)
		}
		console.log('delete pressed')
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

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				loading={loading}
				onConfirm={onDelete}
			/>
			<div className="flex itmes-center justify-between">
				<Heading title={title} description={description} />
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
										disabled={loading}
										onChange={(url, isCover) => {
											append({ url, isCover })
										}}
										onRemove={async (url) => {
											if (await removeImageFn(url)) {
												remove(
													field.value.findIndex(
														(image) =>
															image.url === url
													)
												)
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
										className="w-2/3"
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
										<p>{typeof field.value}</p>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-around">
						<FormField
							control={form.control}
							name="onHold"
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>On hold</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sold"
							render={({ field }) => (
								<FormItem>
									<FormLabel></FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>Sold</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="featured"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel></FormLabel>
									<FormControl>
										<Switch
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<FormDescription>Featured</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} type="submit">
						Submit
					</Button>
				</form>
			</Form>
			{/* <DevTool
				control={form.control}
				styles={{ panel: { width: '500px' } }}
			/> */}
		</>
	)
}
