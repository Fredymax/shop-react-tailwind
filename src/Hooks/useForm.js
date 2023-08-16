import { useState } from 'react'

export const useForm = (initialValue) => {
  const [form, setForm] = useState(initialValue)

  const updateForm = ({ target }) => {
    if (!target) return
    const property = target.getAttribute('name')

    switch (target.type) {
      case 'checkbox':
        setForm((prev) => ({
          ...prev,
          [property]: target.checked ? target.value : '',
        }))
        break
      default:
        setForm((prev) => ({
          ...prev,
          [property]: target.value,
        }))
        break
    }
  }

  const restoreValue = (newValue) => {
    setForm(newValue)
  }

  const updateProperty = (property, value) => {
    setForm((prev) => ({
      ...prev,
      [property]: value,
    }))
  }

  return {
    updateForm,
    restoreValue,
    updateProperty,
    form,
  }
}
