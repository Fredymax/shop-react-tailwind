import { useEffect, useState } from 'react'
import axios from '@/utils/axios'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    categories,
    loading,
    error,
  }
}
