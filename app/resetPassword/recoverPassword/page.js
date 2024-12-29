'use client'
import React from 'react'
import ResetPasswordComp from '../Components/ResetPasswordComp.js'
import InputField from '@/app/Components/InputField.js'
import Link from 'next/link.js'
import { changePassword } from '@/app/changePassword/passwordChangeController.js'

function page() {
  return (

    <div className='w-full h-screen flex items-center justify-center'>

    <div className='border-2 border-grey rounded-lg h-2.5/4 w-2/4 flex flex-col items-center'>

    <h1 className='font-bold text-xl mt-10'> Recover Password </h1>

    <InputField placeholder={'Enter New Password'} type={'password'}/>
    <InputField  placeholder={'Confirm New Password'} type={'password'}/>


    <button className='bg-red-500 p-4 mt-5 text-white rounded-md hover:bg-black' onClick={() => changePassword({validate : true , id : "uiuijiji"})}> change Password </button>

    </div>

</div>

  )
}

export default page