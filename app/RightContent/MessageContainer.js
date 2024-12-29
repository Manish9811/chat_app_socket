'use client'

import React, { useContext, useState } from 'react';
import DisplayMessage from './DisplayMessage.js';
import MessageFooter from './MessageFooter.js';
import { createContext } from 'react';
import UserDataNav from './UserDataNav.js';
import { GlobalContext } from '../page.js';
import './responsive.css'

export const MyContext = createContext();

const MessageContainer = () => {

  const [emojiVisibilityStatus, setEmojiVisibilityStatus] = useState(false);
  const [optionVisibilityStatus, setOptionVisibilityStatus] = useState(false)
  const { activeChat } = useContext(GlobalContext)

  return (
    <MyContext.Provider value={{ emojiVisibilityStatus, setEmojiVisibilityStatus, optionVisibilityStatus, setOptionVisibilityStatus}}>

      <div className='messageContainer border-l-0 border-2 border-grey-500 absolute right-2 h-3/4 w-3/4 p-4 -z-10'>

        {activeChat && <UserDataNav />}




        {activeChat && <DisplayMessage />}
       {activeChat && <MessageFooter />}

        {!activeChat && <h1 className='flex justify-center items-center text-5xl text-bold h-100'> Choose the chat </h1>}



      </div>

    </MyContext.Provider>
  )
}




export default MessageContainer;