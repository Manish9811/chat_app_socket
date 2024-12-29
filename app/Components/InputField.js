import React from 'react'

function InputField({type,placeholder}) {
    const inputFieldCss = 'w-3/4 border-2 outline-none rounded-xl border-grey h-16 mt-6 pl-1'

  return (
    <input type={type} placeholder={placeholder} className={`${inputFieldCss}`}/>

  )
}

export default InputField