'use client'

import { Modal } from '@/components/ui/modal'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { InfoIcon, Trash } from 'lucide-react'

type FormInfoProps = {
	open: boolean
	onClose: () => void
}
export default function FormInfo({ open = false, onClose }: FormInfoProps) {
	return (
		<Modal
			title=""
			description=""
			isOpen={open}
			onClose={onClose}
			className="max-w-fit w-[calc(100%-4rem)] max-h-[calc(100dvh-4rem)] lg:w-fit lg:max-w-[50vw] overflow-y-auto overflow-x-hidden rounded-lg pt-0"
		>
			<div
				className="grid grid-cols-3 gap-y-4"
				style={{ gridTemplateColumns: 'auto' }}
			>
				<div className="col-span-3 flex flex-col justify-center items-center">
					<InfoIcon size={32} className="text-black" />
					<h1 className="text-black text-center font-semibold text-lg mt-2">
						Info
					</h1>
					<p className="text-black text-center font-normal mt-2">
						This is a form for adding a new motorcycle to the
						database.
						<br /> The required fields are <b>Make</b>
					</p>
				</div>
				<Separator className="col-span-3 " />
				<div className="col-span-1 flex flex-col justify-around gap-4">
					<span className="bg-violet-500 w-fit rounded-md px-2 py-1 text-white font-semibold whitespace-nowrap">
						Set Cover
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-4 col-span-1"
				/>
				<p className="col-span-1">
					Sets the cover image for the item.
					<br />
					Adds the tag{' '}
					<span className="bg-green-500 w-fit rounded-md px-2 py-1 text-white font-semibold whitespace-nowrap">
						Cover
					</span>
					to the cover image.
				</p>
				<Separator className="col-span-3" />

				<div className="col-span-1 flex flex-col justify-around gap-4">
					<Switch defaultChecked />
					<span className="bg-green-500 w-fit rounded-md px-2 py-1 text-black font-semibold whitespace-nowrap">
						Featured
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-4 col-span-1"
				/>
				<p className="col-span-1">
					Makes the Item appear in the{' '}
					<b className="whitespace-nowrap">Moto-Repair </b>
					website.
				</p>

				<Separator className="col-span-3" />

				<div className="col-span-1 flex flex-col justify-around gap-4">
					<Switch defaultChecked />
					<span className="bg-yellow-300 w-fit rounded-md px-2 py-1 text-black font-semibold whitespace-nowrap">
						On Hold
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-4 col-span-1"
				/>
				<p className="col-span-1">
					Hides the Item from{' '}
					<b className="whitespace-nowrap">Moto-Repair </b>
					website even if{' '}
					<span className="bg-green-500 w-fit rounded-md px-2 py-1 text-black font-semibold whitespace-nowrap">
						Featured
					</span>{' '}
					is enabled.
				</p>

				<Separator className="col-span-3" />

				<div className=" col-span-1 flex flex-col justify-around gap-4">
					<Switch defaultChecked />
					<span className="bg-red-500 w-fit rounded-md px-2 py-1 text-black font-semibold whitespace-nowrap">
						Sold
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-4 col-span-1"
				/>
				<section className="col-span-1">
					<p>
						Hides the Item from{' '}
						<b className="whitespace-nowrap">Moto-Repair </b>
						website even if{' '}
						<span className="bg-green-500 w-fit rounded-md px-2 py-1 text-black font-semibold whitespace-nowrap">
							Featured
						</span>{' '}
						is enabled.
					</p>
					<p>Does not delete the item from the database.</p>
				</section>

				<Separator className="col-span-3" />

				<div className="col-span-1 flex flex-col justify-around gap-4">
					<span className="flex justify-center items-center bg-red-500 rounded-md h-10 w-10 px-2 py-2 text-white font-semibold whitespace-nowrap">
						<Trash className="w-4 h-4" />
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="h-auto mx-4 col-span-1"
				/>
				<p className="col-span-1">
					Deletes the Item from the database{' '}
				</p>
			</div>
		</Modal>
	)
}
