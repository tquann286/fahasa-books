/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

const Form = ({ onSubmit, errors, methods, children, ...rest }) => {
  const { setError } = methods

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([name, message]) => {
        setError(name, {
          types: 'mannual',
          message,
        })
      })
    }
  }, [errors])

  return <FormProvider {...methods}>{children}</FormProvider>
}

export default Form
