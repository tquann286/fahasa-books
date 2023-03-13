import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/reducers/authSlice'
import { clearCache } from 'ahooks'

const LogoutContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    clearCache()
    dispatch(logout())
    navigate('/', { replace: true })
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spin size="large" spinning />
    </div>
  )
}

export default LogoutContainer
