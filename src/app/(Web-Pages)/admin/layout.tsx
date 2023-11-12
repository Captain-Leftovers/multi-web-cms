import Navbar from "@/app/(Web-Pages)/admin/components/navigation/admin-navbar"

export default function Layout({ children }: { children: React.ReactNode }) {

	return <div className="bg-white min-h-screen text-black flex flex-col">
	<Navbar/>
	{children}
	</div>
}
