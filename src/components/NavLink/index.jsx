import { forwardRef, Children, cloneElement } from 'react'
import { NavLink as BaseNavLink } from 'react-router-dom'

const NavLink = forwardRef(
  (
    {
      className = 'flex flex-row items-center justify-between',
      activeClassName,
      activeStyle,
      children,
      ...props
    },
    ref
  ) => {
    const child = Children.only(children)
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [className, isActive ? activeClassName : null].filter(Boolean).join(' ')
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null),
        })}
      >
        {({ isActive }) =>
          cloneElement(child, {
            className: [className, isActive ? activeClassName : null].filter(Boolean).join(' '),
          })
        }
      </BaseNavLink>
    )
  }
)

export default NavLink
