/* eslint-disable react/button-has-type */
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useButton } from '@react-aria/button'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'
import Spin from '../Spin'

const Button = forwardRef(
  (
    {
      size = 'medium',
      href,
      type = 'button',
      disabled,
      label,
      loading,
      variant = 'primary',
      fullWidth = false,
      className,
      bold = true,
      leftIcon,
      shadow = true,
      onPress,
      onPressStart,
      onPressEnd,
      clean = false,
      ...props
    },
    ref
  ) => {
    const { children } = props

    const nativeButtonRef = useRef()
    const { buttonProps } = useButton(
      {
        isDisabled: disabled,
        onPress,
        onPressStart,
        onPressEnd,
        ...props,
        elementType: 'button',
      },
      nativeButtonRef
    )

    useImperativeHandle(ref, () => ({
      get nativeElement() {
        return nativeButtonRef.current
      },
    }))

    const sizeClassNames = cn({
      'h-6 text-xs': size === 'tiny',
      'h-8 text-sm leading-[18px]': size === 'small',
      'h-10 text-sm leading-[18px]': size === 'medium',
      'h-12 text-sm leading-[18px]': size === 'large',
    })

    const rootClassnames = !clean
      ? cn(
          'rounded-full px-4 select-none transition-all duration-200 ease-linear inline-block',
          {
            'bg-white border border-solid border-light-blue text-primary': variant === 'outline',
            'bg-secondary text-white  hover:bg-secondary-600': disabled || variant === 'secondary',
            'text-black bg-white font-normal border-primary': variant === 'subtle',
            'opacity-50 ': disabled,
            'bg-blue text-white hover:bg-blue-600': variant === 'primary',
            'bg-white-blue text-primary': variant === 'light',
            'shadow-drop': shadow,
            'w-full': fullWidth,
          },
          className
        )
      : className

    const classes = twMerge(cn(sizeClassNames, rootClassnames, 'focus:outline-none'))
    return (
      <button
        disabled={disabled}
        ref={nativeButtonRef}
        className={classes}
        type={type}
        {...(type !== 'submit' ? buttonProps : {})}
      >
        <div className={cn('flex-center w-full gap-2', { 'font-semibold': bold })}>
          {loading && (
            <Spin size={18} className={cn(variant === 'primary' ? 'text-white' : 'text-primary')} />
          )}
          {!loading && leftIcon && <div>{leftIcon}</div>}
          {label || children}
        </div>
      </button>
    )
  }
)

export default Button
