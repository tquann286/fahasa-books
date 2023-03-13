import { Form as FormAntd, Spin as Spinner } from 'antd'

const PureFormItem = FormAntd.Item

export * from './Input'
export { default as FormItem } from './FormItem'
export { default as SelectInput } from './SelectInput'

export { default as Form } from './Form'

export { PureFormItem, Spinner }
