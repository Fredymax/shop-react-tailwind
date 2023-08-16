import React from 'react'
import { UserAccount } from './UserAccount'
import { Credentials } from './Credentials'
import { ReactComponent as SignOutIcon } from '@/assets/sign-out.svg'
import { useAuth } from '@/Hooks/useAuth'

const MyAccount = () => {
  const { logout } = useAuth()

  return (
    <main className="p-4 text-gray-700">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4 mb-4 justify-between">
          <h1 className="text-2xl font-bold">Account settings</h1>
          <button onClick={() => logout()} className="bg-red-600 hover:bg-red-500 text-white p-2 px-3 rounded text-sm">
            Log out
            <SignOutIcon className="hidden sm:inline w-4 h-5 ms-1" />
          </button>
        </div>
        <div className="md:flex md:gap-16">
          <Credentials />
          <UserAccount />
        </div>
      </div>
    </main>
  )
}

export default MyAccount
