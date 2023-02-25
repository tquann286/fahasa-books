import { useRef, useEffect, forwardRef } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

const DEFAULT_DELAY = 3000

const NotificationContainer = forwardRef(({ onHide, notification }, forwaredRef) => {
  const hideTimeout = useRef()
  const { id, severity = 'success', message, title } = notification || {}

  const handleHide = () => {
    onHide?.(id)
    window.clearTimeout(hideTimeout.current)
  }
  const handleDelayedHide = () => {
    hideTimeout.current = window.setTimeout(handleHide, DEFAULT_DELAY)
  }

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current)
  }

  useEffect(() => {
    handleDelayedHide()
    return cancelDelayedHide
  }, [])

  const rootClassnames = twMerge(
    cn(
      'border border-solid pointer-events-auto py-3 px-4  max-w-sm w-full overflow-hidden',
      severity === 'error' && 'bg-[#FEE2E2] border-red',
      severity === 'success' && 'bg-[#EEFBF4] border-[#27AE60]'
    )
  )

  return (
    <motion.div
      initial={{
        y: 0,
        x: 250,
        opacity: 0.8,
      }}
      animate={{
        y: 0,
        x: 0,
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      layout
      className={rootClassnames}
      role="presentation"
      onClick={handleHide}
      ref={forwaredRef}
      onMouseEnter={cancelDelayedHide}
      onMouseLeave={handleDelayedHide}
    >
      <div className="relative flex flex-row items-center">
        {severity === 'error' && <XCircleIcon className="h-5 w-5 text-red" aria-hidden="true" />}
        {severity === 'success' && (
          <CheckCircleIcon className={cn('h-5 w-5 text-[#27AE60]')} aria-hidden="true" />
        )}
        <div className="ml-3 flex-grow">
          {title && <h3 className="text-base font-medium">{title}</h3>}
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </motion.div>
  )
})

export default NotificationContainer
