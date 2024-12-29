import React from 'react'

function UserOptions() {
  return (
    <div className='absolute right-0 w-40 h-40 top-20 bg-violet-400 rounded-3xl flex flex-col items-center justify-center'>
        <button className='text-white bg-red-500 p-2 cursor-pointer mt-2'>
            Block User
        </button>

        <button className='text-white bg-green-500 p-2 cursor-pointer mt-2'>
            Mute User
        </button>
    </div>
  )
}

export default UserOptions