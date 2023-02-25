import { useRef, createContext, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useDidUpdate, useForceUpdate } from '@/hooks/shared-hooks'
import NotificationContainer from '../NotificationContainer'
import { useNotificationsEvents } from '../events'
import useNotificationsState from './useNotificationsState'

export const NotificationContext = createContext(null)

export const NotificationProvider = ({ children }) => {
  const forceUpdate = useForceUpdate()
  const previousLength = useRef(0)

  const {
    notifications,
    queue,
    showNotification,
    updateNotification,
    hideNotification,
    clean,
    cleanQueue,
  } = useNotificationsState({ limit: 8 })
  const ctx = useMemo(
    () => ({
      notifications,
      queue,
      showNotification,
      hideNotification,
      updateNotification,
      clean,
      cleanQueue,
    }),
    [
      notifications,
      queue,
      showNotification,
      hideNotification,
      updateNotification,
      clean,
      cleanQueue,
    ]
  )

  useNotificationsEvents(ctx)

  useDidUpdate(() => {
    if (notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0)
    }
    previousLength.current = notifications.length
  }, [notifications])

  return (
    <NotificationContext.Provider value={ctx}>
      <>
        <div
          aria-live="assertive"
          className="pointer-events-none fixed -inset-x-1 -top-1 z-[9999] mx-auto flex items-end px-4 py-6 duration-75 sm:items-start sm:p-6 md:inset-0"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <AnimatePresence>
              {notifications?.map((item) => (
                <NotificationContainer
                  key={item.id}
                  onHide={hideNotification}
                  notification={item}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {children}
      </>
    </NotificationContext.Provider>
  )
}
