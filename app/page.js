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
import axios from "axios";


export const GlobalContext = createContext();


export default function Home() {


  const router = useRouter()



  const [allConnectedUser, setAllConnectedUser] = useState([]);
  const [activeChat, setActiveChat] = useState('');
  const [chats, setChats] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loginUserDetails, setLoginUserDetails] = useState([]);

  useEffect(() => {

    async function checkLogin() {

      try {
        const serverResponse = await axios.get('http://localhost:3000/api/loginCheck');
        setLoginUserDetails({ userName: serverResponse.data.loginUserData.userName, email: serverResponse. data.loginUserData.email, loginUserId: serverResponse.data.loginUserData.token })
        socket.emit('loginSuccess', { loginUserId: serverResponse.data.loginUserData.token })
        router.push('/');
        setIsLogin(true);
      }
      catch (e) {
        setLoginUserDetails('')
        router.push('/login');
        return setIsLogin(false)
      }
    }

    checkLogin();


  }, [socket])



  return (


    <GlobalContext.Provider value={{ allConnectedUser, setAllConnectedUser, activeChat, setActiveChat, chats, setChats, allUsers, setAllUsers, loginUserDetails, setLoginUserDetails }} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">



      {isLogin && <Nav />}
      {isLogin && <Friends />}
      {isLogin && <MessageContainer />}


    </GlobalContext.Provider>


  );
}
