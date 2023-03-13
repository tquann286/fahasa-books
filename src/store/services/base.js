import { useCallback, useEffect, useState } from 'react'
import { useInfiniteScroll, usePagination, useRequest } from 'ahooks'
import isEmpty from 'lodash/isEmpty'

import api from '@/configs/Axios'
import { DEFAULT_PAGE_SIZE } from '@/constants'
import { generatePath } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { checkQueryKey } from '@/utils/helpers'
import { buildURL } from '@/utils/Request'

export const DEFAULT_CONFIG = {
  GET: { method: 'GET' },
  POST: { method: 'POST' },
  PUT: { method: 'PUT' },
  PATCH: { method: 'PATCH' },
  DELETE: { method: 'DELETE' },
}

export const fetcherData = async ({ url, defaultQuery, isDetail = false } = {}, initData) => {
  try {
    const { page, pageSize = DEFAULT_PAGE_SIZE, ...rest } = defaultQuery || {}
    const query = isDetail ? { ...rest } : { page: page ?? 1, pageSize, ...rest }

    const URL = buildURL(url, query)

    const { data } = await api.get(URL)
    if (initData && typeof initData === 'object' && data) {
      return {
        ...initData,
        ...data,
      }
    }

    return data
  } catch (error) {
    return error
  }
}

/**
 *
 * @param {string} url
 * @param {string[]} queryKey
 * @param {object} defaultQuery
 * @param {object} options
 * @returns
 */

// ref: https://ahooks.js.org/hooks/use-request/basic

export const useGetData = ({
  queryKey = '',
  url = '',
  defaultQuery = {},
  options = {},
  isDetail = false,
  isLazy = false,
} = {}) => {
  const _queryKey = checkQueryKey(queryKey, defaultQuery)
  const [stateOptions, setStateOptions] = useState({
    manual: true,
    ready: true,
    ...options,
  })

  const response = useRequest(
    async (newParams, nextOptions) => {
      const { body = {}, ...paramIds } = newParams || {}
      if (nextOptions) {
        setStateOptions((prevOptions) => ({ ...prevOptions, ...nextOptions }))
      }

      if (url && Array.isArray(url)) {
        const dataList = await Promise.all(
          url?.map((childrenUrl) => {
            return fetcherData(
              {
                url: generatePath(childrenUrl, paramIds || {}),
                defaultQuery: { ...defaultQuery, ...body },
                isDetail,
              },
              {
                url: generatePath(childrenUrl, paramIds || {}),
              }
            )
          })
        )
        return dataList
      }

      const data = await fetcherData({
        url: generatePath(url, paramIds || {}),
        defaultQuery: { ...defaultQuery, ...body },
        isDetail,
      })
      return data
    },
    {
      refreshDeps: _queryKey,
      debounceWait: 500,
      debounceLeading: true,
      debounceTrailing: false,
      ...stateOptions,
    }
  )

  const { data, run, loading } = response || {}
  const isCalled = !isEmpty(data)
  useEffect(() => {
    if (isEmpty(data) && !loading && !isLazy) {
      run()
    }
  }, [data])

  return { ...response, isCalled }
}

export const useGetDataPagination = ({
  queryKey = '',
  url = '',
  defaultQuery = {},
  options = {},
} = {}) => {
  const _queryKey = checkQueryKey(queryKey, defaultQuery)
  const responsePaging = usePagination(
    async (newParams) => {
      const {
        current = defaultQuery?.page || 1,
        pageSize = defaultQuery?.pageSize || 10,
        body = {},
        ...paramIds
      } = newParams || {}
      const newQuery = { ...defaultQuery, ...body }
      const data = await fetcherData({
        url: generatePath(url, paramIds || {}),
        defaultQuery: { ...newQuery, page: current - 1, pageSize },
        isDetail: false,
      })

      return {
        ...data,
        list: (data && Array.isArray(data) ? data : data?.results) || [],
      }
    },
    {
      defaultPageSize: defaultQuery?.pageSize || 10,
      defaultParams: defaultQuery,
      refreshDeps: _queryKey,
      cacheKey: _queryKey,
      ...options,
    }
  )

  useEffect(() => {
    if (isEmpty(responsePaging?.data)) {
      responsePaging?.run()
    }
  }, [responsePaging?.data])

  return responsePaging
}

export const useInfinite = (queryKey = '', url = '', defaultQuery = {}, options = {}) => {
  const _queryKey = checkQueryKey(queryKey, defaultQuery)

  const result = useInfiniteScroll(() => fetcherData({ url, defaultQuery }), {
    refreshDeps: _queryKey,
    loadingDelay: 250,
    manual: true,
    ...options,
  })

  const { loadMoreAsync, data } = result
  const hasMore = data && data.list.length < data.total

  const loadMore = useCallback(() => {
    if (hasMore) {
      loadMoreAsync?.()
    }
  }, [hasMore])

  return {
    ...result,
    total: result?.data?.total,
    data: result?.data?.data?.filter(Boolean),
    currentPage: result?.data?.currentPage || 1,
    loadMore,
  }
}

export const useRequestMutation = (queryKey = '', configs = {}, options = {}) => {
  const [mutateOptions, setMutateOptions] = useState(options)
  const { url, method, ...restConfig } = configs

  const { runAsync, ...propsMutation } = useRequest(
    async ({ body, ...paramIds }, _mutateOptions) => {
      setMutateOptions(_mutateOptions)
      const API_URL =
        Object.values(paramIds).some((param) => param) && url
          ? generatePath(url, paramIds || {})
          : url
      const { data } = await api.request({ ...restConfig, url: API_URL, method, data: body })
      return data
    },
    {
      refreshDeps: checkQueryKey(queryKey),
      manual: true,
      ...options,
      ...mutateOptions, // handle onSuccess and onError
    }
  )

  const handleRunAsync = useDebouncedCallback(runAsync, 250, {
    leading: true,
    trailing: false,
    maxWait: 2000,
  })

  return [handleRunAsync, { ...propsMutation }]
}

export const usePostMutation = (queryKey = '', url = '', options = {}, configs = {}) => {
  return useRequestMutation(queryKey, { url, ...DEFAULT_CONFIG.POST, ...configs }, options)
}
export const usePutMutation = (queryKey = '', url = '', options = {}) => {
  return useRequestMutation(queryKey, { url, ...DEFAULT_CONFIG.PUT }, options)
}
export const useDeleteMutation = (queryKey = '', url = '', options = {}) => {
  return useRequestMutation(queryKey, { url, ...DEFAULT_CONFIG.DELETE }, options)
}
export const usePatchMutation = (queryKey = '', url = '', options = {}) => {
  return useRequestMutation(queryKey, { url, ...DEFAULT_CONFIG.PATCH }, options)
}
