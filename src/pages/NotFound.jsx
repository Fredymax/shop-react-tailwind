import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <main>
      <div className="wrapper">
        <p className="font-bold">Not found</p>
        <NavLink to="/" className="font-bold underline underline-offset-4">
          Back
        </NavLink>
      </div>
    </main>
  )
}

export default NotFound
