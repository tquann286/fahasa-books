import useUrlState from '@ahooksjs/use-url-state'
import { useAntdTable } from 'ahooks'
import { Form, Table } from 'antd'
import { useSearchParams } from 'next/navigation'
import cn from 'classnames'
import { identity, pickBy } from 'lodash'

import api from '@/configs/Axios'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { DEFAULT_CONFIG } from '@/store/services/base'
import { buildURL } from '@/utils/Request'

export const useTable = ({ URL = '', method = DEFAULT_CONFIG.GET.method, params = {} }) => {
  const [form] = Form.useForm()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || params?.page || 1)
  const pageSize = Number(searchParams.get('pageSize') || params?.pageSize || DEFAULT_PAGE_SIZE)

  const [urlState, setUrlState] = useUrlState(
    {
      ...Object.keys(params)?.reduce(
        (res, current) => ({
          ...res,
          ...(params?.[current] ? { [current]: params?.[current] } : {}),
          ...(searchParams.get(current) ? { [current]: searchParams.get(current) } : {}),
        }),
        {}
      ),
      page: currentPage,
      pageSize,
    },
    {
      navigateMode: 'push',
    }
  )

  const allParams = {
    ...urlState,
  }

  const getConfig = (querySearch) => {
    const filter =
      querySearch?.filter && typeof querySearch?.filter === 'object'
        ? JSON.stringify(querySearch?.filter)
        : querySearch?.filter
    const filterObj =
      querySearch?.filter && typeof querySearch?.filter === 'string'
        ? JSON.parse(querySearch?.filter)
        : querySearch?.filter
    switch (method) {
      case DEFAULT_CONFIG.GET.method:
        return {
          method,
          url: buildURL(URL, {
            ...querySearch,
            filter,
            page: currentPage >= 1 ? currentPage - 1 : 1,
            pageSize,
          }),
        }

      case DEFAULT_CONFIG.POST.method:
        return {
          method,
          url: buildURL(URL, {}),
          data: {
            ...querySearch,
            filter: filterObj,
            page: currentPage >= 1 ? currentPage - 1 : 1,
            pageSize,
          },
        }

      default:
        return {
          method,
          url: buildURL(URL, {}),
        }
    }
  }

  const getTableData = async (nextParams) => {
    const { sorter = {} } = nextParams
    let sort = []
    if (allParams?.sort && typeof allParams?.sort === 'string') {
      sort = JSON.parse(allParams?.sort)
    }

    if (allParams?.sort && Array.isArray(allParams?.sort)) {
      sort = allParams?.sort
    }

    if (sorter?.field && sorter?.order) {
      const currentOrder = sorter?.order && sorter?.order === 'ascend' ? 'asc' : 'desc'
      if (sort?.findIndex?.((sortItem) => sortItem?.field === sorter?.field) >= 0) {
        sort = sort?.map((sortItem) => ({ ...sortItem, value: currentOrder }))
      } else {
        sort.push([
          {
            field: sorter?.field,
            value: currentOrder,
            option: 'nulls last',
          },
        ])
      }
    }
    const querySearch = pickBy(
      { ...allParams, sort: method === DEFAULT_CONFIG.GET.method ? JSON.stringify(sort) : sort },
      identity
    )

    try {
      const { data } = await api.request(getConfig(querySearch))
      const { results, total } = data || {}
      return {
        ...data,
        total: total || data?.length,
        list: results || data,
      }
    } catch (err) {
      return {}
    }
  }

  const { tableProps, search, ...rest } = useAntdTable(getTableData, {
    form,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultType: 'advance',
    refreshDeps: Object.keys(allParams),
    defaultParams: allParams,
    cacheKey: `${URL}_table`,
    cacheTime: 0,
    staleTime: 0,
    onSuccess: (res) => {
      if (currentPage > res?.totalPages && res?.totalPages) {
        setUrlState((prevUrl) => {
          return { ...prevUrl, page: res?.totalPages }
        })
      }
    },
  })

  const pagination = {
    ...tableProps.pagination,
    hideOnSinglePage: true,
    current: currentPage,
    defaultCurrent: currentPage,
    showSizeChanger: false,
    pageSize,
    onChange: (p) => {
      setUrlState((prevUrl) => {
        return { ...prevUrl, page: p }
      })
    },
  }

  return {
    table: ({
      className = 'bg-white overflow-x-scroll',
      rowClassName = 'align-top whitespace-pre-wrap break-words',
      ...props
    }) => (
      <Table
        {...tableProps}
        className={cn('rounded-md bg-white p-4 shadow-table', className)}
        pagination={pagination}
        rowKey="id"
        rowClassName={(_, index) => cn([index % 2 === 0 && 'bg-blue-50', rowClassName])}
        {...props}
      />
    ),
    allParams,
    updateParams: setUrlState,
    ...rest,
  }
}
