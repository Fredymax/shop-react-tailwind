import React, { useEffect, useState } from 'react'
import { useForm } from '@/Hooks/useForm'
import { useAuth } from '@/Hooks/useAuth'

import { NavLink } from 'react-router-dom'
import ButtonGoogle from '@/components/@core/ButtonGoogle'
import ButtonGithub from '@/components/@core/ButtonGithub'
import Divider from '@/components/@core/Divider'

const SignIn = () => {
  const { login, credentials } = useAuth()
  const { updateForm, form, restoreValue } = useForm(credentials)
  const [errors, setErrors] = useState('')

  useEffect(() => {
    if (credentials.rememberMe === 'remember') restoreValue(credentials)
  }, [credentials])

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      login(form)
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
            <NavLink to="/sign-up" className="text-xs underline">
              Create an account
            </NavLink>
          </header>
          <main className="grid flex-1 p-4 place-items-center">
            <div className="flex w-full max-w-xs flex-col items-center gap-6">
              <div className="w-full text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-sm">Enter your account details.</p>
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
              <form autoComplete="off" onSubmit={handleSubmit} className="flex w-full flex-col gap-4 font-light">
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
                <div className="space-x-1">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="m-0 cursor-pointer align-middle accent-current"
                    value="remember"
                    checked={form.rememberMe}
                    onChange={updateForm}
                  />
                  <label htmlFor="rememberMe" className="text-xs font-bold cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
                <button type="submit" className="rounded-md bg-gray-800 p-3 font-medium text-white outline-none">
                  Sign In
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

export default SignIn
