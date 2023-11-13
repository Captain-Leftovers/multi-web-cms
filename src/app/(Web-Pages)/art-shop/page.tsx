import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function page() {

    

return (
  <div>
        <p>Art Shop in progress</p>
        <UserButton  />
        <Link className="border px-2 bg-slate-300" href={'/'}>Return</Link>
  </div>
  )
}