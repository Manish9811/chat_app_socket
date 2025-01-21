'use client'
import React, { useContext, useEffect } from 'react'
import { GlobalContext, ServerUrl } from '../page'
import { socket } from '../socket'
import axios from 'axios'

function DisplayFriends() {

    const { allConnectedUser, setAllConnectedUser } = useContext(GlobalContext)
    const { activeChat, setActiveChat } = useContext(GlobalContext)
    const { allUsers, setAllUsers } = useContext(GlobalContext);
    const { loginUserEmail, setLoginuserEmail } = useContext(GlobalContext)
    const {loginUserDetails} = useContext(GlobalContext)


    useEffect(()=>{
       async function fetchFriends(){

        try{
        const serverData = await axios.get(`${process.env.NEXT_PUBLIC_NODE_ENV == 'development' ? `${ServerUrl}/fetchFriends` : {ServerUrl}}`,{
            withCredentials: true
        });
        setAllUsers(serverData.data.message)
       }
    catch(err){
        console.log(err)
    }
}

fetchFriends()
    },[])


    return (


        allUsers ? allUsers.length > 0 ? allUsers.map((value, index) => {
            // const message = value.message.length > 9 ? value.message.slice(0,7) + " ..."  : value.message
            return (
                value != loginUserDetails.loginUserId && <div onClick={() => setActiveChat(value.loginUserId)} className={`mt-2 p-3 transition-all flex items-center justify-between rounded-md cursor-pointer w-80 hover:bg-slate-300 ${activeChat == value ? 'bg-slate-300':''} border-2 border-slate-200`} key={index}>
                    <div className='w-80 h-full flex items-cente'>
                        <img className='w-10 rounded-full' src='https://scontent.fsyd14-1.fna.fbcdn.net/v/t39.30808-1/400673790_849335756657919_1695206515175180306_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=fe756c&_nc_ohc=1M1HN1UVHUkQ7kNvgFHiOHt&_nc_zt=24&_nc_ht=scontent.fsyd14-1.fna&_nc_gid=AWKIJKxHmz6UIlxbA1nYYp5&oh=00_AYAtpKLgZwxUOv65GDfI-hyLRFmSYNjDTPVr2qpn8b3p0w&oe=676D8E86'></img>


                        <div className='flex-col w-40'>
                            <h1 className='text-sm ml-2 font-bold'> {value.userName} </h1>

                            <p className='text-sm ml-2'> You : <span className='font-bold text-sm'>lorem</span></p>

                        </div>

                    </div>

                    <div>
                        <p> lorem</p>
                    </div>


                </div>
            )
        
        }):<h1 className='text-60 text-center text-blue-500'> No friends Found </h1>:<h1 className='text-60 text-center text-blue-500'> No friends Found </h1>
    )
    
    }

export default DisplayFriends