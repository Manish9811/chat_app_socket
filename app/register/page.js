'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin,setIsLogin] = useState(false);



  
  
      useEffect(()=> {
          if(window.localStorage.getItem('token')){
              setIsLogin(true);
              router.push('/');
          }
          else{
              setIsLogin(false)
          }
      },[])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    // Reset error on successful submit
    setError('');

    // Handle sign up logic here, e.g., API call to register the user

    try{
      const serverResponse = await axios.post(`http://localhost:3000/api/register`, {
        email,password,confirmPassword
      })

      console.log(serverResponse)
    }
    catch(e){
      console.log(e)
    }
    // Redirect to login page after successful signup
    //   router.push('/login');
  };

 

  return (
   !isLogin && <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>

        {/* Display error if any */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default page