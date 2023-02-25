import { useEffect } from 'react'

export const NOTIFICATIONS_EVENTS = {
  show: 'show-notification',
  hide: 'hide-notification',
  update: 'update-notification',
  clean: 'clean-notifications',
  cleanQueue: 'clean-notifications-queue',
}

export function createEvent(type, detail) {
  return new CustomEvent(type, { detail })
}

export function showNotification(notification) {
  window.dispatchEvent(createEvent(NOTIFICATIONS_EVENTS.show, notification))
}

export function updateNotification(notification) {
  window.dispatchEvent(createEvent(NOTIFICATIONS_EVENTS.update, notification))
}

export function hideNotification(id) {
  window.dispatchEvent(createEvent(NOTIFICATIONS_EVENTS.hide, id))
}

export function cleanNotifications() {
  window.dispatchEvent(createEvent(NOTIFICATIONS_EVENTS.clean))
}

export function cleanNotificationsQueue() {
  window.dispatchEvent(createEvent(NOTIFICATIONS_EVENTS.cleanQueue))
}

export function useNotificationsEvents(ctx) {
  const events = {
    show: (event) => ctx.showNotification(event.detail),
    hide: (event) => ctx.hideNotification(event.detail),
    update: (event) => ctx.updateNotification(event.detail.id, event.detail),
    clean: ctx.clean,
    cleanQueue: ctx.cleanQueue,
  }

  useEffect(() => {
    Object.keys(events).forEach((event) => {
      window.addEventListener(NOTIFICATIONS_EVENTS[event], events[event])
    })

    return () => {
      Object.keys(events).forEach((event) => {
        window.removeEventListener(NOTIFICATIONS_EVENTS[event], events[event])
      })
    }
  }, [])
}
