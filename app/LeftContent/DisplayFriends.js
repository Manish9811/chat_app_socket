'use client'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../page'
import { socket } from '../socket'

function DisplayFriends() {

    const { allConnectedUser, setAllConnectedUser } = useContext(GlobalContext)
    const { activeChat, setActiveChat } = useContext(GlobalContext)
    const { allUsers, setAllUsers } = useContext(GlobalContext);
    const { loginUserEmail, setLoginuserEmail } = useContext(GlobalContext)

    useEffect(() => {
        socket.on('allUserData', (data) => {
            console.log(data)
            setAllUsers(data)
        })

        return (() => {
            socket.off('allUserData')
        })

    },[], [socket])




console.log(allUsers.length)
    return (


        allUsers ? allUsers.length > 0 ? allUsers.map((value, index) => {
            // console.log(value)
            // const message = value.message.length > 9 ? value.message.slice(0,7) + " ..."  : value.message
            return (
                value != loginUserEmail && <div onClick={() => setActiveChat(value)} className={` p-3 transition-all flex items-center justify-between rounded-md cursor-pointer w-60 hover:bg-slate-300 ${activeChat == value ? 'bg-slate-300':''} border-2 border-slate-500`} key={index}>
                    <div className='w-40 h-full flex items-center justify-center'>
                        <img className='w-20 rounded-full' src='https://scontent.fsyd14-1.fna.fbcdn.net/v/t39.30808-1/400673790_849335756657919_1695206515175180306_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=fe756c&_nc_ohc=1M1HN1UVHUkQ7kNvgFHiOHt&_nc_zt=24&_nc_ht=scontent.fsyd14-1.fna&_nc_gid=AWKIJKxHmz6UIlxbA1nYYp5&oh=00_AYAtpKLgZwxUOv65GDfI-hyLRFmSYNjDTPVr2qpn8b3p0w&oe=676D8E86'></img>


                        <div className='flex-col'>
                            <h1 className='text-sm'> {value} </h1>

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