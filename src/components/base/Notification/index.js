import { useContext } from 'react'
import { NotificationContext } from './NotificationProvider'

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotificationContext hook was called outside of Provider context')
  }

  return context
}

export const useNotification = () => {
  const { showNotification } = useNotificationContext()

  return {
    success: (message) => showNotification({ severity: 'success', message }),
    error: (message) => showNotification({ severity: 'error', message }),
  }
}
