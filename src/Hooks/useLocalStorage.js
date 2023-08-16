import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue, stringify = true) {
  const [data, setData] = useState(initialValue)
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
    setLoader(true)
    try {
      let data = localStorage[key]
      if (data) {
        setData(() => {
          if (stringify) return JSON.parse(localStorage[key])
          return localStorage[key]
        })
      } else {
        localStorage[key] = stringify ? JSON.stringify(initialValue) : initialValue
        setData(initialValue)
      }
    } catch (error) {
      setError(true)
    } finally {
      setLoader(false)
    }
  }, [])

  const storeData = (newValue) => {
    setData(newValue)
    localStorage[key] = stringify ? JSON.stringify(newValue) : newValue
  }

  return {
    storeData,
    data,
    loader,
    error,
  }
}
