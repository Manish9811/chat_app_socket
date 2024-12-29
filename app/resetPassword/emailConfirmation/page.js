'use client';

import React, { useState } from 'react'
import ResetPasswordComp from '../Components/ResetPasswordComp.js';
import { useRouter } from 'next/navigation.js';

function page() {
    const router = useRouter();


    const [email,setEmail] = useState('');
    const [emailVerification,setEmailVerification] = useState(false);



    const checkEmail = () => {
        setEmailVerification(true);

        console.log(emailVerification)

        if(emailVerification){
            router.push('otpConfirmation')
        }
    }
  return (
    <div>
        <ResetPasswordComp value={email} onChangeEvent={setEmail} title={'Email Confirmation'} inputType={'Email'} placeholder={'Enter Your Email'} buttonText={"Check Email"} event={checkEmail}/>
    </div>
  )
}

export default page