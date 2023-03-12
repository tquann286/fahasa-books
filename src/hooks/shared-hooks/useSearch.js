import React from 'react'
import { ROUTE_PATH } from '@/constants'
import { useRouter } from 'next/router'
import { SearchInput } from '@/components/base'
import { useFilter } from './useFilter'

const { BOOK } = ROUTE_PATH

const SHOW_SEARCH_LIST = [BOOK.LIST]

export const useSearch = (params = ['search']) => {
  const router = useRouter()

  const filters = useFilter(params)
  const { querySearch, onSearch } = filters

  const searchInput = (searchProps = {}) => {
    if (SHOW_SEARCH_LIST.includes(router.pathname)) {
      return (
        <SearchInput
          name="search"
          onSearch={onSearch}
          placeholder="Please enter"
          className="w-full max-w-2xl px-4"
          {...searchProps}
        />
      )
    }
    return <></>
  }

  return { ...filters, search: querySearch.search, searchInput }
}
