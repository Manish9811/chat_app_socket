import Link from 'next/link'
import React from 'react'
import InputFields from './InputFields'

function ResetPasswordComp({title,inputType,placeholder,buttonText,event,value,onChangeEvent}) {
    const inputFieldCss = 'w-3/4 border-2 outline-none rounded-xl border-grey h-16 mt-6 pl-1'

  return (
    <div className='w-full h-screen flex items-center justify-center'>

        <div className='border-2 border-grey rounded-lg h-2.5/4 w-2/4 flex flex-col items-center'>

        <h1 className='font-bold text-xl mt-10'> {title} </h1>

        <InputFields value={value} onChangeEvent={onChangeEvent} inputType={inputType} placeholder={placeholder} inputFieldCss ={inputFieldCss}/>

        <button onClick={event} className='bg-red-500 p-4 mt-5 text-white rounded-md hover:bg-black'> {buttonText} </button>

        </div>

    </div>
  )
}

export default ResetPasswordComp