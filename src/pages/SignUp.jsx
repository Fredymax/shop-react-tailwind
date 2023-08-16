import React, { useState } from 'react'
import ButtonGoogle from '@/components/@core/ButtonGoogle'
import ButtonGithub from '@/components/@core/ButtonGithub'
import Divider from '@/components/@core/Divider'

import { useAuth } from '@/Hooks/useAuth'
import { useForm } from '@/Hooks/useForm'
import { NavLink } from 'react-router-dom'

const SignUp = () => {
  const { register } = useAuth()
  const [errors, setErrors] = useState('')
  const { form, updateForm } = useForm({
    username: '',
    password: '',
    rememberMe: '',
  })
  const handleClick = (ev) => {
    ev.preventDefault()
    try {
      register(form)
    } catch (error) {
      setErrors(error.message)
      setTimeout(() => setErrors(''), 5000)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-700">
      <div className="flex-1 px-4">
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between py-4 font-bold">
            <NavLink to="/" className="text-2xl">
              Shop
            </NavLink>
            <NavLink to="/sign-in" className="text-xs underline">
              Sign In
            </NavLink>
          </header>
          <main className="grid flex-1 place-items-center">
            <div className="flex w-full max-w-xs flex-col items-center gap-6">
              <div className="w-full text-center">
                <h1 className="text-3xl font-bold">Create account</h1>
              </div>
              <div className="flex w-full flex-col gap-4 font-bold">
                <ButtonGoogle disabled />
                <ButtonGithub disabled />
              </div>
              <Divider text="OR" />
              {!!errors.length && (
                <div className="block w-full text-red-500 text-sm">
                  <p className="font-bold">Errors:</p>
                  <span>{errors}</span>
                </div>
              )}
              <form onSubmit={handleClick} autoComplete="off" className="flex w-full flex-col gap-4 font-light">
                <input
                  type="text"
                  placeholder="Username"
                  className="rounded-md p-3 outline-none placeholder:transition-opacity focus:placeholder:opacity-0"
                  name="username"
                  value={form.username}
                  onChange={updateForm}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded-md p-3 outline-none placeholder:transition-opacity focus:placeholder:opacity-0"
                  name="password"
                  value={form.password}
                  onChange={updateForm}
                />
                <button type="submit" className="rounded-md bg-gray-800 p-3 font-medium text-white outline-none">
                  Register
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
      <figure className="hidden sm:block sm:flex-1">
        <img className="h-full w-full object-cover object-right" src="/images/login.jpg" alt="Login" />
      </figure>
    </div>
  )
}

export default SignUp
