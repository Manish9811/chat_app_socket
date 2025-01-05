import { Op } from "sequelize";
import { registerUser } from "../database/schems";
import { cookies } from "next/headers";


    // search for other login user
    export async function GET(req) {

    try{

    const cookieStore = await cookies();

    const loginUserCookie = cookieStore.get('token');

    const getUsers = await registerUser.findAll({where : {[Op.not]:{loginUserid : loginUserCookie.value}}});

    return new Response(JSON.stringify({message : getUsers}), {status:200})
    }
    catch(e){
        return new Response(JSON.stringify({message : e}), {status:500})

    }
}