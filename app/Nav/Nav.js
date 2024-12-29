'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosSettings } from "react-icons/io";
import SettingDropDown from '../Dropdown/SettingDropDown';
import { loginUser } from '../page';


function Nav() {

    const [dropDownVisibilityStatus,setDropDownVisibilityStatus] = useState(false)

    return (
        <div className='w-full h-20 flex justify-between'>
            <h1 className='font-bold text-xl cursor-pointer'> {`Welcome ${loginUser}`} </h1>

            {/* Nav Content */}

            <div>
                <IoIosSettings  size={30} className={`cursor-pointer ${dropDownVisibilityStatus && 'bg-orange-500 rounded-full p-1 text-white'}`} onClick={()=>setDropDownVisibilityStatus(!dropDownVisibilityStatus)}/> 
            </div>

            {dropDownVisibilityStatus && <SettingDropDown />}
        </div>
    )
}

export default Nav