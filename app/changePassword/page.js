'use client'
import Link from 'next/link'
import React from 'react'
import InputField from '../Components/InputField'
import { changePassword } from './passwordChangeController.js';

export default function page() {
  const inputFieldCss = 'w-3/4 border-2 outline-none rounded-xl border-grey h-16 mt-6 pl-1';
  
  return (
    <div className='w-full h-screen flex items-center justify-center'>

        <div className='border-2 border-grey rounded-lg h-2.5/4 w-2/4 flex flex-col items-center'>

        <h1 className='font-bold text-xl mt-10'> Change Password </h1>

        <InputField inputFieldCss={inputFieldCss} placeholder={'Enter Last Password'} type={'password'}/>
        <InputField inputFieldCss={inputFieldCss} placeholder={'Enter New Password'} type={'password'}/>
        <InputField inputFieldCss={inputFieldCss} placeholder={'Confirm New Password'} type={'password'}/>

          <p className='mt-6'> forget Password ? <Link href='/resetPassword/emailConfirmation' className='text-blue-400 underline'> Reset Now </Link></p>

        <button className='bg-red-500 p-4 mt-5 text-white rounded-md hover:bg-black' onClick={()=>changePassword({validate: false, id : "88888uij"})}> change Password </button>

        </div>

    </div>
  )
}
