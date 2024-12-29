'use client'
import Image from "next/image";
import Friends from "./LeftContent/Friends.js";
import Nav from "./Nav/Nav.js";
import MessageContainer from "./RightContent/MessageContainer.js";
import { useEffect, useState } from "react";
import { socket } from "./socket.js";
import { createContext } from "react";
import { useRouter } from "next/navigation.js";
import { toast } from "react-toastify";


export const GlobalContext = createContext();
export const loginUser = localStorage.getItem('token')?localStorage.getItem('token'):null;


export default function Home() {


  const router = useRouter()



  const [allConnectedUser, setAllConnectedUser] = useState([]);
  const [activeChat, setActiveChat] = useState('');
  const [chats, setChats] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loginUserEmail, setLoginuserEmail] = useState('');

  useEffect(() => {

    const loginEmail = localStorage.getItem('token')
    setLoginuserEmail(loginEmail)

    if (loginEmail && loginUserEmail != null) {
      router.push('/');
      setIsLogin(true)
      socket.emit('loginSuccess', { userEmail: loginEmail })
    }
    else{
      router.push('/login');
      setIsLogin(false)
    }

  }, [],[socket])

  useEffect(() => {

    socket.on('newUserDetected', userEmail => {
      socket.emit('allConnectedUserEmail', { email: localStorage.getItem('token') })
    })
    socket.on('allUserData', (data) => {
      console.log(data)
    })

    return (() => {
      socket.off('allUserData')
      socket.off('newUserDetected')

    })
  }, [socket])

  return (


    <GlobalContext.Provider value={{ allConnectedUser, setAllConnectedUser, activeChat, setActiveChat, chats, setChats, allUsers, setAllUsers, loginUserEmail, setLoginuserEmail }} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">



      {isLogin && <Nav />}
      {isLogin && <Friends />}
      {isLogin && <MessageContainer />}


    </GlobalContext.Provider>


  );
}
