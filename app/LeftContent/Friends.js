import React, { useContext, useState } from 'react'
import DisplayFriends from './DisplayFriends';
import { BsChatSquareFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import './responsive.css';

function Friends() {
    const [friendListStatus,setFriendListStatus] = useState(false);
    const showChatFriends = () => {
        setFriendListStatus(!friendListStatus)

    }
    return (
        <>
        {!friendListStatus && <BsChatSquareFill onClick={showChatFriends} size={80} className='pl-5 absolute top-6 text-orange-600 md:hidden block'/>}

        {friendListStatus && <IoClose onClick={showChatFriends} size={80} className='pl-5 absolute top-6 text-orange-600 md:hidden block'/>}
        
        <div className={`${friendListStatus ? 'showMenu':'hideMenu'}  mainContainer absolute left-2 border-2 border-grey-400 rounded-md h-3/4   flex flex-col justify-center items-center`}>




            <h1 className='p-5 font-bold text-xl'> Friends </h1>

            {/* Connectedd friends parent container */}

            <div className='h-full w-80 overflow-scroll p-3 flex items-start justify-center'>

                {/* Friends details contain container */}

                <DisplayFriends />

            </div>
        </div>
        </>
    )
}

export default Friends