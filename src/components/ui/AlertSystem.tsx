'use client'

import { useAppSelector } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'

interface AlertProps {
  alert: {
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }
}

function Alert({ alert }: AlertProps) {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-4 border rounded-lg ${getAlertStyles(alert.type)}`}
    >
      <p className="text-sm font-medium">{alert.message}</p>
    </motion.div>
  )
}

export function AlertSystem() {
  const alerts = useAppSelector((state) => state.helpers.alerts)

  if (alerts.length === 0) return null

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-3 space-y-2">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <Alert key={index} alert={alert} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}