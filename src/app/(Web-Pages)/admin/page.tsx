import Container from "@/components/ui/container"


type pageProps = {
    
  }
export default function page({}: pageProps) {


  console.log("Admin Page");
  

return (
<Container className="bg-red-400 my-10 px-4">
  <h1 className="text-4xl text-center">Admin Page</h1>
</Container>
  )
}