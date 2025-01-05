import { cookies } from 'next/headers'
import { registerUser } from '../database/schems';

export async function GET(req) {
    const cookieStore = await cookies();

    try{
    if (cookieStore.get('token') != null) {
        const loginUserId = cookieStore.get('token').value;
        const getLoginUserInfo = await registerUser.findAll({ where: { loginUserId: loginUserId } });
        console.log(getLoginUserInfo[0].userName )
        return new Response(JSON.stringify({ message: "login Success", loginUserData: { email: getLoginUserInfo[0].email , token: getLoginUserInfo[0].loginUserId, userName: getLoginUserInfo[0].userName }}), { status: 200 })

    }
    else {
        return new Response(JSON.stringify({ message: "login Failed" }), { status: 400 })
    }
}
catch(e){
    console.log(e)
    return new Response(JSON.stringify({ message: e }), { status: 500 })

}
}