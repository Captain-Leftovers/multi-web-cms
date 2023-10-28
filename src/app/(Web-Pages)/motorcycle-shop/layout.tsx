import Navbar from "@/app/(Web-Pages)/motorcycle-shop/components/navigation/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {

	return <>
	<Navbar />
	{children}
	</>
}
