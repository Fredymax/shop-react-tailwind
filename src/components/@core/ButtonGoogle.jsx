import React from 'react'
import { ReactComponent as GoogleIcon } from '@/assets/google-icon.svg'

const ButtonGoogle = ({ children, onClick, ...attributes }) => {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white py-3 text-sm disabled:opacity-50 select-none"
      onClick={() => onClick()}
      {...attributes}
    >
      <GoogleIcon className="h-6 w-6" />
      Log in with Google
    </button>
  )
}

export default ButtonGoogle
