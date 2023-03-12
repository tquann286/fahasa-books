import * as Yup from 'yup'
import dayjs from 'dayjs'

Yup.addMethod(Yup.string, 'html', function add() {
  return this.test({
    name: 'html',
    message: 'Please enter',
    test: (value = '') => {
      const trimHtml = value
        ?.replace(/<[^>]*>/g, '')
        ?.replace(/&nbsp;/g, '')
        ?.replace(' ', '')
        ?.replace('　', '')
        ?.trim()
      return Yup.string().required().isValidSync(trimHtml)
    },
  })
})

Yup.addMethod(Yup.string, 'date', function add() {
  return this.test({
    name: 'date',
    message: 'Please enter',
    test: (value) => {
      if (!value) {
        return false
      }
      const isDate = dayjs(value).isValid()
      return Yup.string().required().isValidSync(isDate)
    },
  })
})

Yup.addMethod(Yup.string, 'phone', function add() {
  return this.test({
    name: 'phone',
    message: 'Invalid phone',
    test: (value = '') => {
      const trimValue = value?.replace(' ', '')?.replace('　', '')?.trim()
      return Yup.string()
        .required()
        .matches(/^0\d{9,10}$/)
        .isValidSync(trimValue)
    },
  })
})

export default Yup
