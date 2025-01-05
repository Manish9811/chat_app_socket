'use client'

import axios, { all } from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './MessageContainer';
import { socket } from '../socket';
import { GlobalContext } from '../page'
import './responsive.css';

function MessageFooter() {



  const EmojiUrl = `https://emoji-api.com/emojis?access_key=c4e046fffc51cc6736e582b42fccb9202c17b800`

  const [emojis, setEmojis] = useState('');
  const [userInputMessage,setUserInputMessage] = useState('');
  const {emojiVisibilityStatus, setEmojiVisibilityStatus} = useContext(MyContext)
  const {activeChat,setActiveChat} = useContext(GlobalContext);
  const {chats, setChats} = useContext(GlobalContext);
  const {loginUserDetails} = useContext(GlobalContext)



  const showEmoji = () => {
    setEmojiVisibilityStatus(!emojiVisibilityStatus)
  }



  useEffect(() => {
    try {
      const fetchEmojis = async () => {
        const fetchURL = await fetch(EmojiUrl)
        const JSONEmoji = await fetchURL.json()

        setEmojis(JSONEmoji);

      }

      fetchEmojis();

    }
    catch (err) {
      console.log(err)
    }
  },[])

  const sendMessage = () => {
  
    console.log(activeChat)

    const ownMessages = {
      messageSentBy : loginUserDetails.loginUserId,
      receivedBy : activeChat,
      message : userInputMessage
    }


    console.log(activeChat)

    setChats((prevData) => [
      ...prevData,{
        messageSentBy : loginUserDetails.loginUserId,
        receivedBy : activeChat,
        message : userInputMessage,
        status : 'sentMessage'
      }
    ])
    
    socket.emit('messageSent', {loginUser : loginUserDetails.loginUserId, to : activeChat, sendMessage : userInputMessage});


    setEmojiVisibilityStatus(false)
    setUserInputMessage('');

  }


  return (
    <footer className='flex items-center justify-between h-20'>



     {emojiVisibilityStatus && <div className='absolute top-48 w-1/4 h-80 bg-slate-400 rounded-lg flex flex-wrap gap-4 border border-gray-300 overflow-scroll p-5 text-xl'>


        {emojis && emojis.map((value, index) => {
          return (
            <p onClick={()=>setUserInputMessage(userInputMessage + value.character)} key={index} className='cursor-pointer'> {value.character} </p>

          )
        })}


      </div>}

      <div className='ml-3'>
        <p className={`text-2xl cursor-pointer ${emojiVisibilityStatus && 'bg-violet-400'} w-10 text-center p-1 rounded-full`} onClick={showEmoji}> 😂 </p>
      </div>

      <div className='inputContainer w-full flex justify-start items-center ml-10'>
        <input placeholder='Your Message' onFocus={()=>setEmojiVisibilityStatus(false)}  onChange={(e)=>setUserInputMessage(e.target.value)} value={userInputMessage} type='text' className='border-2 border-slate-700 rounded-lg pl-2 outline-none h-10 w-3/4'>
        </input>

        <button onClick={sendMessage} className='ml-10 bg-violet-600 h-10 w-40 text-white rounded-2xl cursor-pointer hover:bg-black'> Send Now </button>
      </div>


    </footer>
  )
}

export default MessageFooter