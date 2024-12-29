import React from 'react'

function InputFields({value,onChangeEvent,inputType,placeholder}) {

    const inputFieldCss = 'w-3/4 border-2 outline-none rounded-xl border-grey h-16 mt-6 pl-1'

    return (
        <input value={value} onChange={(e) => onChangeEvent(e.target.value)} type={inputType} placeholder={placeholder} className={`${inputFieldCss}`} />

    )
}

export default InputFields