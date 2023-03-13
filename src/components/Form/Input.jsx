import { Input } from 'antd'
import { useController } from 'react-hook-form'
import WrapperInput from './WrapperInput'

export const TextInput = (props) => (
  <WrapperInput type="text" {...props}>
    <Input allowClear />
  </WrapperInput>
)

export const InputNumber = (props) => (
  <WrapperInput type="number" {...props}>
    <Input allowClear />
  </WrapperInput>
)

export const PasswordInput = (props) => (
  <WrapperInput type="text" {...props}>
    <Input.Password allowClear />
  </WrapperInput>
)

export const TextAreaInput = (props) => {
  const { field } = useController({
    control: props?.control,
    name: props?.name,
  })
  return (
    <WrapperInput type="text" {...props} value={field?.value}>
      <Input.TextArea />
    </WrapperInput>
  )
}

export const TextInputSearch = (props) => (
  <WrapperInput type="text" {...props}>
    <Input.Search allowClear />
  </WrapperInput>
)
