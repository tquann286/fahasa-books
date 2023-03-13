import useUrlState from '@ahooksjs/use-url-state'
import pick from 'lodash/pick'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

export const useFilter = (
  params,
  wait = 500,
  options = { leading: true, trailing: false, maxWait: 1000 }
) => {
  const [queryURL] = useSearchParams()

  const getAllParams = () => {
    return params?.reduce(
      (res, current) => {
        return {
          ...res,
          ...(queryURL.get(current) ? { [current]: queryURL.get(current) } : {}),
        }
      },
      {
        search: queryURL.get('search') || '',
      }
    )
  }

  const [search, setSearch] = useUrlState(getAllParams(), { navigateMode: 'push' })

  const { ...rest } = search
  const currentPage = Number(queryURL.get('page') || params?.page || 1)
  const pageSize = Number(queryURL.get('pageSize') || params?.pageSize || DEFAULT_PAGE_SIZE)

  const querySearch = pick(rest, params)
  querySearch.page = currentPage
  querySearch.pageSize = pageSize

  const handleReset = (param) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      [param]: undefined,
    }))
  }

  const handleSearch = (param, value) => {
    setSearch((prevSearch) => ({
      ...prevSearch,
      page: 1,
      pageSize,
      [param]: value,
    }))
  }

  const handleChangeDebounce = useDebouncedCallback(
    (value, param) => {
      if (value || value === 0) handleSearch(param, value)
      else handleReset(param)
    },
    wait,
    options
  )

  useEffect(
    () => () => {
      handleChangeDebounce.flush()
    },
    [handleChangeDebounce.isPending()]
  )

  return {
    querySearch,
    onSearch: handleChangeDebounce,
  }
}
