import React from 'react'
import { useLocation } from 'react-router-dom'
import { useFilter } from '@/hooks'
import SearchInput from '@/components/SearchInput'

const SHOW_SEARCH_LIST = []

export const useSearch = (params = ['search']) => {
  const location = useLocation()
  const { pathname } = location

  const filters = useFilter(params)
  const { querySearch, onSearch } = filters

  const searchInput = (searchProps = {}) => {
    if (SHOW_SEARCH_LIST.includes(pathname)) {
      return (
        <SearchInput
          name="search"
          onSearch={onSearch}
          placeholder="Search..."
          className="w-full max-w-2xl px-4"
          {...searchProps}
        />
      )
    }
    return <></>
  }

  return { ...filters, search: querySearch.search, searchInput }
}
