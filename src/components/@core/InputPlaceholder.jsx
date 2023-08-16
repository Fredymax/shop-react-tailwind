import React from 'react'

const InputPlaceholder = ({ type = 'text', label, children, ...props }) => {
  return (
    <div className="relative">
      <input
        type={type}
        className="peer border rounded-xl p-3 w-full outline-none read-only:bg-gray-50 read-only:select-none"
        placeholder=" "
        {...props}
      />
      {label && (
        <span
          className="
          absolute block px-2 top-0 rounded-full pointer-events-none bg-white translate-x-2 translate-y-3 text-gray-300 whitespace-nowrap
          peer-focus:-translate-y-2.5 peer-focus:text-gray-800 peer-focus:text-xs
          peer-not-placeholder-shown:-translate-y-2.5 peer-not-placeholder-shown:text-gray-800 peer-not-placeholder-shown:text-xs
          transition-all"
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default InputPlaceholder
