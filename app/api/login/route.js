import validator from 'validator';
import { registerUser } from '../database/schems';
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'

export async function POST(req, response) {
  const body = await req.json();
  const { email, password } = body;

  try {

    if(email && password){

      const ifEmailRegistered = await registerUser.findAll({where: {email:email}});

      if(ifEmailRegistered && ifEmailRegistered[0]?.email){

        // Check for password
        const salt = await bcrypt.genSalt(10);
        const isPasswordCorrect = await bcrypt.compare(password,ifEmailRegistered[0].password)
        if(isPasswordCorrect){

          const cookieStore = await cookies()

          console.log(ifEmailRegistered[0].loginUserId)

          // If login success save the token of the user

         const saveCookies =  cookieStore.set('token', ifEmailRegistered[0].loginUserId)
          console.log(saveCookies)
          return new Response(JSON.stringify({ message: "lOGIN SUCCESS" }), { status: 200 })


        }else{
        return new Response(JSON.stringify({ message: "Password doesn't match" }), { status: 400 })
        }
      }
      else{
        return new Response(JSON.stringify({ message: "Email not found" }), { status: 400 })
      }

    }
    else{
      return new Response(JSON.stringify({ message: "Email and Password required" }), { status: 500 })
    }

  }
  catch (e) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
  }
}