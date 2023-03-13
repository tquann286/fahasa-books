import { Button as ButtonAntd } from 'antd'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import styles from './styles.module.css'

const Button = forwardRef(
  (
    {
      title = '',
      className = '',
      htmlType = 'button',
      shape = 'default', // "default", "circle", "round"
      type = 'default', // "default", "success", "primary", "danger"
      onClick,
      buttonClassName = 'w-full flex flex-row items-center text-center align-middle object-center',
      isClean = false,
      ...rest
    },
    ref
  ) => {
    const wrapperClassName = cn(
      isClean
        ? [styles.button__clean]
        : [
            styles.button__base,
            // type
            { [styles.button__success]: type === 'success' },
            { [styles.button__default]: type === 'default' },
            { [styles.button__primary]: type === 'primary' },
            { [styles.button__danger]: type === 'danger' },
            { [styles.button__warning]: type === 'warning' },
            { [styles.button__text]: type === 'text' },
            // shape
            { [styles.button__round]: shape === 'round' },
          ],

      className
    )

    return (
      <div className={`${wrapperClassName}`}>
        <ButtonAntd
          ref={ref}
          type="text"
          htmlType={htmlType}
          onClick={onClick}
          className={buttonClassName}
          {...rest}
        >
          {title || rest?.children}
        </ButtonAntd>
      </div>
    )
  }
)

Button.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  htmlType: PropTypes.string,
  shape: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  buttonClassName: PropTypes.string,
  isClean: PropTypes.bool,
}

export default Button
