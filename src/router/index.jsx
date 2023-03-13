import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Loading from '@/components/shared-components/Loading'
import appRoutes from './Routers'

const router = createBrowserRouter(appRoutes, {})
const navigationConfig = [...appRoutes]

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

function RouterComponent() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}

export { navigationConfig }
export default RouterComponent
