import { Link } from 'react-router-dom'
import React from 'react'

const Logo = ({ navWidth }) => {
  return (
    <div style={{ width: navWidth }}>
      <Link to="/">
        <div className="relative mx-auto flex h-full select-none px-3 py-2">
          <img
            alt=""
            src="/logo.png"
            className="w-full fill-theme hover:fill-theme_active hover:text-theme_active"
          />
        </div>
      </Link>
    </div>
  )
}

export default Logo
