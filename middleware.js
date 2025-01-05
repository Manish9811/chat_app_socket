import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  const cookie = await cookies();
  const getLoginUserCookie = cookie.get('token');

  if(!getLoginUserCookie) return NextResponse.redirect(new URL('/login', request.url))
  
  else return NextResponse.rewrite(new URL('/', request.url)) 

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}