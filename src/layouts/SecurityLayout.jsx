import { useState, useEffect } from 'react'
import { PageLoading } from '@ant-design/pro-layout'
import { Navigate, Outlet } from 'react-router-dom'
import { stringify } from 'query-string'
import { node, bool } from 'prop-types'

// eslint-disable-next-line import/no-unresolved
import { useAuth } from '@/hooks/useAuth'

const SecurityLayout = ({ children, loading }) => {
  const [isReady, setReady] = useState(false)
  const { admin, isLogged } = useAuth()

  useEffect(() => {
    setReady(true)
  }, [])

  // You can replace it to your authentication rule (such as check token exists)
  const isLogin = isLogged || admin

  const queryString = stringify({
    redirect: window.location.href,
  })

  if (loading || !isReady) {
    return <PageLoading />
  }
  if (!isLogin && window.location.pathname !== '/login') {
    return <Navigate to={`/login?${queryString}`} />
  }
  return (
    <>
      {children}
      <Outlet />
    </>
  )
}

SecurityLayout.propTypes = { children: node, loading: bool }

export default SecurityLayout
