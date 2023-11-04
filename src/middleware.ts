import { authMiddleware } from '@clerk/nextjs'
export default authMiddleware({
	// "/" will be accessible to all users
	publicRoutes: ['/api/motorcycle-shop/public-api/:path*'],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
