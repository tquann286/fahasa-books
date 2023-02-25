import { v4 as uuidv4 } from 'uuid'
import { useQueue } from '@/hooks/shared-hooks/useQueue'

export default function useNotificationsState({ limit }) {
  const { state, queue, update, cleanQueue } = useQueue({
    initialValues: [],
    limit,
  })

  const showNotification = (notification) => {
    const id = notification.id || uuidv4()

    update((notifications) => {
      if (notification.id && notifications.some((n) => n.id === notification.id)) {
        return notifications
      }

      return [...notifications, { ...notification, id }]
    })

    return id
  }

  const updateNotification = (notification) =>
    update((notifications) => {
      const index = notifications.findIndex((n) => n.id === notification.id)

      if (index === -1) {
        return notifications
      }

      const newNotifications = [...notifications]
      newNotifications[index] = notification

      return newNotifications
    })

  const hideNotification = (id) =>
    update((notifications) =>
      notifications.filter((notification) => {
        if (notification.id === id) {
          notification?.onClose?.(notification)
          return false
        }

        return true
      })
    )

  const clean = () => update(() => [])

  return {
    notifications: state,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    cleanQueue,
    clean,
  }
}
