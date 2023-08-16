import React from 'react'

const Divider = ({ text = 'OR' }) => {
  return (
    <div
      className="
        relative w-full overflow-hidden text-center font-bold min-h-[4px] select-none
        before:absolute before:right-0 before:top-1/2 before:block before:h-0.5 before:w-1/2 before:translate-x-4 before:bg-slate-700
        after:absolute after:left-0 after:top-1/2 after:block after:h-0.5 after:w-1/2 after:-translate-x-4 after:bg-slate-700
      "
    >
      <span>{text}</span>
    </div>
  )
}

export default Divider
