import React, { useContext } from 'react';
import { MdMenu } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import UserOptions from './UserOptions';
import { MyContext } from './MessageContainer';


function UserDataNav() {
    const {optionVisibilityStatus,setOptionVisibilityStatus} = useContext(MyContext)
    return (
        <nav className='h-20 flex items-center justify-between p-3 border-b-2 border-slate-200'>
            <div className='flex justify-center item-center'>
                <img className='w-10 rounded-full' src='https://scontent.fsyd14-1.fna.fbcdn.net/v/t39.30808-1/400673790_849335756657919_1695206515175180306_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=fe756c&_nc_ohc=1M1HN1UVHUkQ7kNvgFHiOHt&_nc_zt=24&_nc_ht=scontent.fsyd14-1.fna&_nc_gid=AWKIJKxHmz6UIlxbA1nYYp5&oh=00_AYAtpKLgZwxUOv65GDfI-hyLRFmSYNjDTPVr2qpn8b3p0w&oe=676D8E86' />

                <div className='ml-5'>
                    <h1 className='font-bold '> Manish pokhrel</h1>
                    <p> Online </p>
                </div>
            </div>

            <div>
                {!optionVisibilityStatus && <MdMenu size={30} onClick={()=>setOptionVisibilityStatus(!optionVisibilityStatus)} className='cursor-pointer' />}
                {optionVisibilityStatus && <FaTimes size={30} onClick={()=>setOptionVisibilityStatus(!optionVisibilityStatus)} className='cursor-pointer' />}


            </div>

            {optionVisibilityStatus && <UserOptions />}

        </nav>
    )
}

export default UserDataNav