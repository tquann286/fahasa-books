import { Form } from 'antd'
import PropTypes from 'prop-types'

const FormItem = ({
  name,
  label,
  labelCol,
  wrapperCol,
  labelAlign,
  children,
  fieldState,
  formState,
  ...rest
}) => {
  const getValidateStatus = (_fieldState) => {
    let validateStatus = ''

    if (_fieldState?.error) {
      validateStatus = 'error'
    }

    if (_fieldState?.isDirty && !_fieldState?.error) {
      validateStatus = 'success'
    }

    return validateStatus
  }
  const getHelpMessage = (_fieldState) => _fieldState?.error?.message

  // eslint-disable-next-line no-shadow
  const getLayoutProps = ({ labelAlign, labelCol, wrapperCol } = {}) => {
    const layoutProps = {}

    if (labelAlign) {
      layoutProps.labelAlign = labelAlign
    }

    if (labelCol) {
      layoutProps.labelCol = labelCol
    }

    if (wrapperCol) {
      layoutProps.wrapperCol = wrapperCol
    }

    return layoutProps
  }

  const layoutProps = getLayoutProps({ labelCol, wrapperCol, labelAlign })
  const validateStatus = getValidateStatus(fieldState)
  const help = getHelpMessage(fieldState)

  return (
    <Form.Item
      label={label}
      name={name}
      help={help}
      validateStatus={validateStatus}
      valuePropName="value"
      getValueProps={(value) => {
        return value
      }}
      getValueFromEvent={(event) => {
        return event?.target?.value
      }}
      {...layoutProps}
      {...rest}
    >
      {children}
    </Form.Item>
  )
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelCol: PropTypes.any,
  wrapperCol: PropTypes.any,
  labelAlign: PropTypes.any,
  fieldState: PropTypes.any,
  children: PropTypes.node.isRequired,
}

export default FormItem
