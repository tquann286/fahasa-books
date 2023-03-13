import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NoFoundPage() {
  const navigate = useNavigate()

  const extraItem = (
    <Button
      type="primary"
      onClick={() => {
        navigate('/')
      }}
    >
      Back Home
    </Button>
  )

  return (
    <Result
      status="404"
      title="404"
      subTitle="The page you accessed does not exist."
      extra={extraItem}
    />
  )
}

export default NoFoundPage
