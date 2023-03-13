import { Navigate } from 'react-router-dom'

import { PERMISSION_ROLE_ADMIN, ROUTE_PATH } from '@/constants'
import AppLayout from '@/layouts/AppLayout'

import NotFound from '@/components/NotFound'
import Auth from '@/containers/Auth'
import BookList from '@/containers/BookList'

const navigationTree = [
  {
    path: '/',
    exact: true,
    redirect: ROUTE_PATH.BOOK_LIST,
    key: 'home',
    element: <Navigate replace to={ROUTE_PATH.BOOK_LIST} />,
  },
  // Book list
  {
    path: ROUTE_PATH.BOOK_LIST,
    name: PERMISSION_ROLE_ADMIN.BOOK_LIST.name,
    icon: 'chart',
    key: 'book-list',
    element: <BookList />,
  },
  {
    path: '*',
    element: <NotFound />,
    key: 'any',
  },
]

const Routers = [
  {
    path: ROUTE_PATH.LOGIN,
    element: <Auth />,
    name: 'Login',
    key: 'login',
  },
  {
    path: '/',
    element: <AppLayout />,
    key: 'layout',
    children: navigationTree,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export { navigationTree }
export default Routers
