import React, { useEffect, useRef } from 'react'
import { ReactComponent as CameraIcon } from '@/assets/camera.svg'

export const UploadAvatar = ({ updateAvatar, avatar, formAvatar, setAvatar }) => {
  const imgRef = useRef(null)

  useEffect(() => {
    imgRef.current.src = formAvatar
  }, [formAvatar])

  useEffect(() => {
    updateAvatar(avatar)
  }, [avatar])

  function uploadFile({ target }) {
    const [avatarFile] = target.files
    if (!avatarFile) return

    const reader = new FileReader()
    reader.readAsDataURL(avatarFile)

    reader.onload = ({ currentTarget }) => {
      updateAvatar(currentTarget.result)
      setAvatar(currentTarget.result)
    }
  }

  return (
    <div>
      <figure className="w-52 h-52 rounded-full relative ">
        <img
          src="/images/user-default.png"
          ref={imgRef}
          className="object-cover h-full rounded-full m-auto"
          alt="User avatar"
        />
        <label
          htmlFor="input-file-avatar"
          className="group inline-block cursor-pointer absolute -bottom-5 p-2 bg-gray-700 rounded-full inset-x-0 mx-auto w-max hover:bg-gray-600"
          role="button"
        >
          <CameraIcon className="group-hover:-translate-y-0.5 inline w-6 h-5 text-white transition-transform" />
        </label>
      </figure>
      <input type="file" className="hidden" id="input-file-avatar" onChange={uploadFile} />
    </div>
  )
}
