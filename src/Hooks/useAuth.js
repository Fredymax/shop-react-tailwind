import { useEffect, useState } from 'react'
import { useLocalStorage } from '@/Hooks/useLocalStorage'
import { initialInformation, initialCredentials, initialAvatar } from './values.initial'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const { storeData: setInformation, data: information } = useLocalStorage('information', initialInformation)
  const { storeData: setUsers, data: users } = useLocalStorage('users', [])
  const { storeData: setCredentials, data: credentials } = useLocalStorage('credentials', initialCredentials)
  const { storeData: setAvatar, data: avatar } = useLocalStorage('avatar', initialAvatar, false)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(() =>
      users.some((user) => user.username === credentials.username && user.password === credentials.password)
    )
  }, [credentials])

  const login = (payload) => {
    const { username, password } = payload

    let errors
    if (!username && !password) {
      errors = new Error('Please enter a username or/and password.')
      throw errors
    }
    const userIndex = users.findIndex((user) => user.username === username && user.password === password)
    if (userIndex === -1) {
      errors = new Error(`The user ${username} does not exist in our records.`)
      throw errors
    }

    const newUsers = [...users]
    newUsers[userIndex] = payload
    setUsers(newUsers)

    setCredentials(payload)
    navigate('/')
  }

  const logout = () => {
    setCredentials(initialCredentials)
    navigate('/sign-in')
  }

  const register = (payload) => {
    const { username, password } = payload
    if (!username && !password) {
      throw new Error('Please enter a username or/and password.')
    }
    setUsers([...users, payload])
    setCredentials(payload)
    navigate('/')
  }

  const updateUserByCredentials = (payload) => {
    const { username, password } = payload
    const userIndex = users.findIndex((user) => user.username === username && user.password === password)
    if (userIndex === -1) throw new Error(`The user ${username} does not exist in our records.`)

    const newUsers = [...users]
    newUsers[userIndex] = payload
    setUsers(newUsers)

    setCredentials(payload)
    logout()
  }

  return {
    register,
    logout,
    login,
    updateUserByCredentials,

    setCredentials,
    credentials,

    setInformation,
    information,

    setAvatar,
    avatar,

    isAuth,
  }
}
