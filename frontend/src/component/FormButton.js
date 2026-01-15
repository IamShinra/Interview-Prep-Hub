import React from 'react'
import { GoogleIcon } from './Icon'

const FormButton = ({text, className, logo}) => {

  return (
    <div className='w-full h-full'>
        <button className={`w-full h-full flex items-center justify-center bg-theme-primary rounded-lg text-sm text-white font-normal ${className}`}>
            <span>{logo}</span>
            {text}
        </button>
    </div>
  )
}

export default FormButton
