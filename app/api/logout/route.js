import { cookies } from "next/headers";
export async function GET(){

    try{
    const cookie = await cookies();

    cookie.delete('token')

    return new Response(JSON.stringify({message : "logout Success"}), {status:200})
    }
    catch(e){
        console.log(e)
        return new Response(JSON.stringify({message : "logout failed"}), {status:500})
    }

}