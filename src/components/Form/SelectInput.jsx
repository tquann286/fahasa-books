import PropTypes from 'prop-types'
import { Select as AntdSelect } from 'antd'

import WrapperInput from './WrapperInput'

const placeholderOptions = [
  {
    label: <span className="opacity-40">Please select</span>,
    value: '',
    disabled: true,
    className: 'hidden',
  },
]

const SelectInput = ({
  options = [],
  mode = 'tag',
  onChangeInput = () => {},
  formItemProps = {
    valuePropName: 'value',
  },
  className = 'min-w-full',
  placeholder = TEXT_JA.common.please_select,
  isCoreOptions = false,
  ...props
}) => {
  return (
    <WrapperInput
      type="text"
      size="large"
      onChangeInput={onChangeInput}
      formItemProps={formItemProps}
      className={className}
      placeholder={placeholder}
      {...props}
    >
      <AntdSelect
        allowClear
        mode={mode}
        placeholder={placeholder}
        {...(isCoreOptions ? { options: placeholderOptions.concat(options) } : {})}
      >
        {!isCoreOptions &&
          placeholderOptions.concat(options).map(({ key, value, label, ...option }) => (
            <AntdSelect.Option key={key || value} label={label} value={value} {...option}>
              {label}
            </AntdSelect.Option>
          ))}
      </AntdSelect>
    </WrapperInput>
  )
}

SelectInput.propTypes = { options: PropTypes.arrayOf(PropTypes.object), mode: PropTypes.string }

export default SelectInput
