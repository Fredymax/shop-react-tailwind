import React from 'react'
import { ReactComponent as GithubIcon } from '@/assets/github-icon.svg'

const ButtonGithub = ({ children, onClick, ...attributes }) => {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white py-3 text-sm disabled:opacity-50 select-none"
      onClick={() => onClick()}
      {...attributes}
    >
      <GithubIcon className="h-6 w-6" />
      Log in with Github
    </button>
  )
}

export default ButtonGithub
