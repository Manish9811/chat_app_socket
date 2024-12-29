'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { GlobalContext } from '../page.js';
import { socket } from '../socket';
import { useRouter } from 'next/navigation.js';

function page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin,setIsLogin] = useState(false);


    useEffect(()=> {
        if(window.localStorage.getItem('token')){
            socket.emit('loginSuccess',email );
            setIsLogin(true);
            router.push('/');
        }
        else{
            setIsLogin(false)
        }
    },[])




    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // toast.loading("Please wait")
            const data = await axios.post(`http://localhost:3000/api/login`, {
                email, password
            })
            window.localStorage.setItem('token', email);
            socket.emit('loginSuccess',{ userEmail: email });
            router.push('/')
           
        }
        catch (e) {
            console.log(e)
            return toast.error('Login error !! Please try again', );

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