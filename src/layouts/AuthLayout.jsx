import { getMenuData, getPageTitle } from '@ant-design/pro-layout'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import styles from './userLayout.module.css'

function AuthLayout(props) {
  const auth = useSelector((state) => state.auth)
  const isLogged = auth?.isLogged && auth.token
  const navigate = useNavigate()
  const { route = { routes: [] } } = props
  const { routes = [] } = route
  const {
    children,
    location = {
      pathname: '',
    },
  } = props

  const { breadcrumb } = getMenuData(routes)
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    title: 'admin-site',
    ...props,
  })
  // useEffect(() => {
  //   if (isLogged) navigate('/')
  // }, [isLogged, navigate])

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>admin-site</div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  )
}

export default AuthLayout
