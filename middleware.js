




import { NextResponse } from 'next/server';

export async function middleware(req) {

    const path = req.nextUrl.pathname;
    const isPrivatePage = path.startsWith('/private');
    const isAuthPage = path === '/auth/login' || path === '/auth/register';
    const token = req.cookies.get('userToken')?.value

    try {

        // Redirect to login page if it's a private page and no token is present
        if (isPrivatePage && !token) {
            return NextResponse.redirect(new URL('/auth/login', req.nextUrl.href));
        }


        // Redirect to home page if user has a token and tries to access login/register pages
        if (isAuthPage && token) {
            const response = NextResponse.redirect(new URL('/', req.nextUrl.href));
            // Clearing the 'userToken' cookie
            response.cookies.set('userToken', '', {
                path: '/',
                expires: new Date(0),
                httpOnly: true
            });
            return response;
        }
        

        return NextResponse.next();

    } catch (error) {
        console.error('Middleware error:', error);
        // Redirect to an error page or handle the error as needed
        // This return statement can be adjusted based on your error handling strategy
        return NextResponse.redirect(new URL('/error', req.nextUrl.href));
    }
}
