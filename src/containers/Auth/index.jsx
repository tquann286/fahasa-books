import { Alert } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'
import AuthLayout from '@/layouts/AuthLayout'

function LoginMessage({ content }) {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
}
LoginMessage.propTypes = {
  content: PropTypes.string,
}

function Login() {
  return (
    <AuthLayout>
      <div className={styles.main} />
    </AuthLayout>
  )
}

export default Login
