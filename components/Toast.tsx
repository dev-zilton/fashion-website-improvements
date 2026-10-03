import { m, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

export interface ToastProps {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-6 py-4 rounded-lg text-white font-medium shadow-lg z-50 ${
            type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
          initial={{ opacity: 0, y: 20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, x: 20 }}
          transition={{ duration: 0.3 }}
          role="status"
          aria-live="polite"
        >
          {type === 'success' ? (
            <Check size={20} className="flex-shrink-0" />
          ) : (
            <X size={20} className="flex-shrink-0" />
          )}
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-2 hover:opacity-80 transition-opacity focus:outline-2 focus:outline-offset-2 focus:outline-white rounded"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
