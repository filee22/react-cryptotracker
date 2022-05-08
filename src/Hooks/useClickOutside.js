import { useEffect, useRef } from 'react'

export default function useClickOutside(handler) {
  const ref = useRef()

  useEffect(() => {
    const maybeHandler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })

  return ref
}
