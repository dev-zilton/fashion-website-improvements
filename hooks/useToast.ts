import { useState, useCallback } from 'react'

export interface ToastState {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    isVisible: false,
  })

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success') => {
      setToast({ message, type, isVisible: true })

      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, isVisible: false }))
      }, duration)

      return () => clearTimeout(timer)
    },
    [duration]
  )

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }))
  }, [])

  return { toast, showToast, hideToast }
}
