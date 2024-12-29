'use client'
import React, { useState } from 'react'
import ResetPasswordComp from '../Components/ResetPasswordComp.js'
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const [otp,setOtp] = useState('');

  const checkOtp = () => {
    router.push('recoverPassword')

  }
  return (
    <div>
        <ResetPasswordComp value={otp} onChangeEvent={setOtp} title={'OTP Confirmation'} inputType={'Email'} placeholder={'Enter The OTP'} buttonText={"Check OTP"} event={checkOtp}/>
    </div>
  )
}

export default page