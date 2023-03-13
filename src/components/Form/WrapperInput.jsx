import { TEXT_JA } from '@/constants'
import PropTypes from 'prop-types'
import { Children, cloneElement, forwardRef, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import classNames from 'classnames'
import { mergeRefs } from '@/utils/Function'
import FormItem from './FormItem'

const WrapperInput = forwardRef(
  (
    {
      label,
      control,
      name,
      formItemProps,
      children,
      isUpload,
      onChangeInput = () => {},
      ...inputProps
    },
    ref
  ) => {
    const inputRef = useRef()
    const { control: controlContext } = useFormContext() || {}
    const controlProps = control || controlContext
    const child = Children.only(children)
    const placeholder = !inputProps?.placeholder
      ? TEXT_JA.common.please_enter
      : inputProps?.placeholder

    return (
      <Controller
        control={controlProps}
        name={name}
        render={({ field, fieldState, formState }) => {
          const onChange = (...args) => {
            const [e] = args
            if (isUpload) {
              field.onChange({ value: e?.fileList?.[0] })
              return
            }
            field.onChange(...args)
            onChangeInput(...args)
          }
          return (
            <FormItem {...formItemProps} {...{ fieldState, formState, name, label, isUpload }}>
              {cloneElement(child, {
                ...field,
                ...inputProps,
                className: classNames(child?.props?.className, inputProps?.className),
                placeholder: child?.props?.placeholder || placeholder,
                onChange,
                ref: mergeRefs([inputRef, ref, field.ref]),
              })}
            </FormItem>
          )
        }}
      />
    )
  }
)

WrapperInput.propTypes = {
  control: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  formItemProps: PropTypes.objectOf(PropTypes.any),
}

export default WrapperInput
