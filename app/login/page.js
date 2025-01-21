'use client'
import axios from 'axios';
import Link from 'next/link';
import React, {useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { socket } from '../socket';
import { useRouter } from 'next/navigation.js';
import { ServerUrl } from '../page';

function page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);






    // useEffect(() => {

    //     async function checkLogin() {
    //         console.log(process.env.NODE_ENV)

    
    //       try {
    //         const serverResponse = await axios.get('http://localhost:3000/api/loginCheck');
    //         console.log(serverResponse)
    //         const loginUserEmail = serverResponse.data.loginUserData.email;
    //         router.push('/');
    //         setIsLogin(true)
    //         socket.emit('loginSuccess', { userEmail: loginUserEmail })
    
    //       }
    //       catch (e) {
    //         router.push('/login');
    //         return setIsLogin(false)
    //       }
    //     }
    
    //     checkLogin();
    
    
    //   }, [])
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // toast.loading("Please wait")
            const data = await axios.post(`${process.env.NEXT_PUBLIC_NODE_ENV == 'development' ? `${ServerUrl}/login` : {ServerUrl}}`, {
                email, password
            })
            console.log(data)
            window.localStorage.setItem('token', email);
            socket.emit('loginSuccess',{ userEmail: email });
            router.push('/')
           
        }
        catch (e) {
            console.log(e)
            const errMessage = e.response?.data.message ? e.response.data.message : 'Login error !! Please try again'
            return toast.error(errMessage);

        }

    }
    return (
       !isLogin && <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Sign up</Link></p>
                </div>
            </div>
        </div>
    
    )
}

export default page