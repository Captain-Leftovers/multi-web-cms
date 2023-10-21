import getStoresWithAccess from "@/actions/getStoresWithAccess";
import StorSwitcher from "@/components/StorSwitcher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";



export default async function Home() {

	const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await getStoresWithAccess(userId);



return (
  <StorSwitcher stores={stores}/>
  )
}