import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../page'
import { socket } from '../socket'

function DisplayMessage() {

    const { chats, setChats } = useContext(GlobalContext);
    const {activeChat} = useContext(GlobalContext)
    const {loginUserEmail} = useContext(GlobalContext);
    const {loginUserDetails} = useContext(GlobalContext)

    useEffect(() => {
        socket.on('messageReceive', ({messageSentBy,receivedBy,message}) => {

            if(receivedBy === loginUserDetails.loginUserId){
                setChats((prevChat) => [...prevChat, {messageSentBy,receivedBy,message,status : 'receiveMessage'}])
            }
            
        })

      

        return (() => {
            socket.off('messageReceive');
        })
    }, [socket])



    return (
        <div className='border-b-2 border-slate-300 h-3/4 overflow-scroll'>

            {
                chats && chats.length > 0 && chats.map((value, index) => {
                    return (
                       (value.receivedBy == loginUserDetails.loginUserId || value.messageSentBy == loginUserDetails.loginUserId ) && (value.receivedBy == activeChat || value.messageSentBy == activeChat)  && <div key={index} className={value.messageSentBy == loginUserDetails.loginUserId ? `min-h-20 max-w-full max-h-3/4 m-4 flex justify-end items-center`:`flex justify-start items-center min-h-20 max-w-100 max-h-2/4 m-4`}>

                            <p className={value.messageSentBy == loginUserDetails.loginUserId ? `bg-green-700 text-white flex items-center justify-center min-w-2/4 max-w-80 max-h-3/4 rounded-md p-4`:`bg-green-700asskhe text-white flex items-center justify-center min-w-2/4 max-w-80 max-h-3/4 rounded-md bg-violet-800 p-4`}>
                                {value.message}
                            </p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DisplayMessage