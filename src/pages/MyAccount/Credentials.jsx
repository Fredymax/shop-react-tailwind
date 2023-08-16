import React, { useEffect, useState } from 'react'
import { useForm } from '@/Hooks/useForm'
import { useAuth } from '@/Hooks/useAuth'
import * as initialState from '@/Hooks/values.initial'

import InputPlaceholder from '@components/@core/InputPlaceholder'
import { UploadAvatar } from './UploadAvatar'

export const Credentials = () => {
  const { setAvatar, avatar, credentials: _credentials, updateUserByCredentials } = useAuth()

  const { restoreValue: updateAvatar, form: _avatar } = useForm(() => localStorage['avatar'])
  const { form: credentials } = useForm(() => JSON.parse(localStorage['credentials']))

  const {
    updateForm: setResetPassword,
    form: resetPassword,
    restoreValue: restoreResetPassword,
  } = useForm(initialState.initialResetPassword)

  const [changePassword, setChangePassword] = useState(false)
  const [errors, setErrors] = useState(null)

  let timerErrors
  const saveCredentialsHandleSubmit = (ev) => {
    if (timerErrors) clearTimeout(timerErrors)
    ev.preventDefault()
    if (!changePassword) return
    try {
      if (!resetPassword.currentPassword.length) throw new Error('The current password is empty')

      if (_credentials.password !== resetPassword.currentPassword) throw new Error('The current password is incorrect.')

      if (!resetPassword.newPassword.length || !resetPassword.repeatNewPassword.length)
        throw new Error('The new password or repeat new password are empty.')

      if (resetPassword.newPassword !== resetPassword.repeatNewPassword)
        throw new Error('The new password and repeat new password are different.')

      updateUserByCredentials({
        ...credentials,
        password: resetPassword.newPassword,
      })
    } catch (error) {
      setErrors(error.message)

      timerErrors = setTimeout(() => {
        setErrors('')
      }, 8000)
    }
  }

  useEffect(() => {
    if (!changePassword) restoreResetPassword(initialState.initialResetPassword)
  }, [changePassword])

  return (
    <div className="basis-1/2 mb-10 md:mb-0 space-y-1">
      <h3 className="text-xl font-bold">Profile photo</h3>
      <UploadAvatar updateAvatar={updateAvatar} formAvatar={_avatar} avatar={avatar} setAvatar={setAvatar} />
      <form onSubmit={saveCredentialsHandleSubmit} autoComplete="off" className="space-y-4">
        <p className="font-medium mt-10 text-sm w-full">Credentials</p>
        <div className="w-full">
          <InputPlaceholder label="Username" name="username" value={credentials.username} readOnly />
        </div>
        <div className="space-x-1">
          <input
            type="checkbox"
            name="changePassword"
            id="changePassword"
            className="m-0 cursor-pointer align-middle accent-current"
            checked={changePassword}
            onChange={(ev) => setChangePassword(() => ev.target.checked)}
          />
          <label htmlFor="changePassword" className="text-xs font-bold cursor-pointer select-none">
            Change password
          </label>
        </div>
        {changePassword && (
          <div className="space-y-6">
            {errors && <p className="text-red-500 text-sm">{errors}</p>}
            <div className="w-full flex gap-4">
              <div className="flex-1">
                <InputPlaceholder
                  label="Current password"
                  name="currentPassword"
                  value={resetPassword.currentPassword}
                  onChange={setResetPassword}
                />
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <InputPlaceholder
                  label="New password"
                  name="newPassword"
                  value={resetPassword.newPassword}
                  onChange={setResetPassword}
                />
              </div>
              <div className="flex-1">
                <InputPlaceholder
                  label="Repeat new password"
                  name="repeatNewPassword"
                  value={resetPassword.repeatNewPassword}
                  onChange={setResetPassword}
                />
              </div>
            </div>
            <button type="submit" className="p-3 bg-gray-700 text-white rounded hover:bg-gray-600">
              Change password
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
