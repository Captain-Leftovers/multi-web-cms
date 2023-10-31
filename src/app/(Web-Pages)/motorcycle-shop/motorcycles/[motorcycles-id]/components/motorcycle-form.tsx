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
import { useRouter } from 'next/navigation'
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

const formSchema = z.object({
	make: z.string().min(2, 'Too short'),
	model: z.string().optional(),
	description: z.string().optional(),
	price: z.number().positive().optional(),
	images: z
		.object({
			url: z.string().url(),
		})
		.array(),
	featured: z.boolean().optional(),
	sold: z.boolean().optional(),
	onHold: z.boolean().optional(),
})

type MotorcycleFormProps = {
	initialData: MotoItem | null
}

type formValuesType = z.infer<typeof formSchema>

export default function MotorcycleForm({ initialData }: MotorcycleFormProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const title = initialData ? 'Edit Item' : 'Create Item'
	const description = initialData ? 'Edit Item' : 'Add a new Item'
	const toastMessage = initialData ? 'Item updated.' : 'Item created.'
	const action = initialData ? 'Save changes' : 'Create'

	// 1. Define your form.
	const form = useForm<formValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			make: '',
			model: '',
			description: '',
			price: undefined,
			images: [],
			featured: false,
			sold: false,
			onHold: false,
		},
	})

	const { remove, append } = useFieldArray<formValuesType>({
		name: 'images',
		control: form.control,
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)

		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	const onDelete = async () => {
		console.log('delete pressed')
	}

	const removeImageFn = async (url: string) => {
		setLoading(true)
		try {
			const response = await axios.post(
				'/api/motorcycle-shop/images/delete-image',
				{
					url,
				}
			)

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
										onChange={(url) => {
											append({ url })
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
										/>
										<p>BGN</p>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="featured"
						render={({ field }) => (
							<FormItem>
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
				</form>
			</Form>
			{/* <DevTool
				control={form.control}
				styles={{ panel: { width: '500px' } }}
			/> */}
		</>
	)
}
