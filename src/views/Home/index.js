import { ROUTE_PATH } from '@/constants'
import { useRouter } from 'next/router'
import BookList from '../BookList'

const HomeView = () => {
  const router = useRouter()

  router.replace(ROUTE_PATH.BOOK.LIST)

  return <BookList />
}

export default HomeView
