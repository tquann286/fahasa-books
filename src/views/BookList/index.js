import BaseLayout from '@/components/base'
import { API_ENDPOINT } from '@/configs'
import { useTable } from '@/hooks'

const BookList = () => {
  const { table } = useTable({
    URL: API_ENDPOINT.BOOK.LIST,
  })

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
  ]

  return <BaseLayout title="Tuyển tập sách">{table(columns)}</BaseLayout>
}

export default BookList
