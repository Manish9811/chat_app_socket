import React from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import Link from 'next/link';
import { useRouter } from 'next/navigation';




function SettingDropDown() {
    const router = useRouter()

    const logout = () => {
        localStorage.clear();
        router.push('/login')

    }

    const buttonstyles = 'flex items-center bg-black p-2 text-sm rounded-lg cursor-pointer text-white w-full text-center mt-2 hover:bg-orange-600'
    return (
        <div className='absolute border-2 border-slate-200 rounded-xl w-60 h-auto right-2 top-20 bg-white z-50 flex flex-col items-center p-5 overflow-scroll'>

            <Link href='/changePassword' className={`${buttonstyles} bg-black`}>
                <RiLockPasswordFill className='pr-1' size={20}/>
                Change Password
            </Link>

            <Link href='' className={`${buttonstyles} bg-green-600`}>
                <CgProfile className='pr-1' size={20}/>
                Your Profile
            </Link>
            <button onClick={logout} className={`${buttonstyles} bg-red-600`}>
                <CiLogout className='pr-1' size={20}/>
                Logout
            </button>
        </div>
    )
}

export default SettingDropDown