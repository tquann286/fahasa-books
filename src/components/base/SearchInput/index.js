import { forwardRef, useImperativeHandle, useRef, memo } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { FormProvider, useController, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from '@/configs/yup'

import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import Button from '../Button'

const SearchInput = forwardRef(
  ({ name = '', onSearch, placeholder = 'Please enter', className = '', refresh }, ref) => {
    const searchBtnRef = useRef(null)
    const router = useRouter()
    const querySearch = router.query?.search || ''
    const methods = useForm({
      mode: 'onChange',
      defaultValues: {
        search: querySearch,
      },
      resolver: yupResolver(
        Yup.object().shape({
          search: Yup.string(),
        })
      ),
    })

    const { field } = useController({ name, control: methods.control })

    const handleSearch = useDebouncedCallback(
      (values) => {
        const search = values?.search?.trim?.() || ''
        onSearch(search, 'search')
        refresh()
      },
      500,
      { leading: true, trailing: false, maxWait: 1000 }
    )

    useImperativeHandle(ref, () => ({}), [])

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSearch)} className="flex justify-center">
          <Input.Search
            name={name}
            onSearch={() => {
              searchBtnRef.current?.click?.()
            }}
            size="large"
            placeholder={placeholder}
            enterButton={
              <Button
                ref={searchBtnRef}
                isClean
                htmlType="submit"
                icon={<SearchOutlined color="#fff" size="large" />}
              />
            }
            allowClear
            className={className}
            {...field}
          />
        </form>
      </FormProvider>
    )
  }
)

export default memo(SearchInput)
