import React, { useEffect } from 'react'
import InputPlaceholder from '@components/@core/InputPlaceholder'
import { useForm } from '@/Hooks/useForm'
import { useAuth } from '@/Hooks/useAuth'
import { initialInformation } from '@/Hooks/values.initial'

export const UserAccount = () => {
  const { setInformation, information } = useAuth()
  const { restoreValue, updateForm, form } = useForm(initialInformation)

  useEffect(() => {
    restoreValue(information)
  }, [information])

  const saveInformationHandleSubmit = (ev) => {
    ev.preventDefault()
    setInformation(form)
  }

  return (
    <div className="basis-1/2">
      <form onSubmit={saveInformationHandleSubmit} autoComplete="off" className="container space-y-4">
        <h2 className="text-xl font-bold">User account</h2>
        <div className="text-gray-400 text-sm">
          <p>Here you can edit public information about yourself</p>
          <p>The changes will be displayed for other users within 5 minutes.</p>
        </div>
        <div className="space-y-1">
          <label className="block font-medium text-sm" htmlFor="email">
            Email address
          </label>
          <InputPlaceholder
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={updateForm}
            autoComplete="off"
          />
        </div>
        <div className="space-y-6">
          <p className="font-medium text-sm w-full">Personal information</p>
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <InputPlaceholder
                label="N° Document"
                type="number"
                name="nroDocument"
                value={form.nroDocument}
                onChange={updateForm}
              />
            </div>
            <div className="flex-1">
              <InputPlaceholder label="N° Phone" type="tel" name="phone" value={form.phone} onChange={updateForm} />
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <InputPlaceholder label="First name" name="firstName" value={form.firstName} onChange={updateForm} />
            </div>
            <div className="flex-1">
              <InputPlaceholder label="Last name" name="lastName" value={form.lastName} onChange={updateForm} />
            </div>
          </div>
          <div className="w-full">
            <InputPlaceholder label="Address" name="address" value={form.address} onChange={updateForm} />
          </div>
          <button type="submit" className="p-3 bg-gray-700 text-white rounded hover:bg-gray-600">
            Save changes
          </button>
        </div>
      </form>
    </div>
  )
}
