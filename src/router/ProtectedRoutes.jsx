import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
  const credentials = JSON.parse(localStorage.getItem('credentials') || '{}')
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  if (
    (!credentials.username && !credentials.password) ||
    !users.some((user) => user.username === credentials.username && user.password === credentials.password)
  )
    return <Navigate to="/sign-in" replace={true} />

  return children
}

export default ProtectedRoutes
