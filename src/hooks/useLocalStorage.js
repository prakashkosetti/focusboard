import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or blocked: the app still works, it just won't persist
    }
  }, [key, value])

  return [value, setValue]
}