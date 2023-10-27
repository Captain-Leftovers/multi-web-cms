import checkUserAccess from '@/actions/checkUserAccess'
import Navbar from '@/app/(Web-Pages)/motorcycle-shop/components/navigation/navbar'


export default async function MotorcycleShopHome() {
	await checkUserAccess('motorcycle-shop')

	//TODO :  add navigation and proceeed with app from here you can check access and send user home if they dont trough te checkuseraccess function
	return (
		<main className='bg-red-400 w-full h-full'>
			<Navbar />
		</main>
	)
}
