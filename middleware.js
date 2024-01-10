import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const cookie = request.cookies.get('token');
    if(request.nextUrl.pathname.startsWith('/dashboard')){
        if(cookie==undefined){
            return NextResponse.redirect(new URL('/login',request.url))
        }
        
        try{
            const {payload} = await jwtVerify(cookie.value,new TextEncoder().encode('g17cm-s29lb-a31mj-040807*'));
            console.log(payload);
           }catch(error){
            console.error(error);
            return NextResponse.redirect(new URL('/login',request.url));
           }
    };


  return NextResponse.next();
}
 