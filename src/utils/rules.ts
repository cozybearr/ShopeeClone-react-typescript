import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email là bắt buộc'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Email không đúng định dạng'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài email phải từ 5 - 160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài email phải từ 5 - 160 ký tự'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Mật khẩu là bắt buộc'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài mật khẩu phải từ 5 - 160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài mật khẩu phải từ 5 - 160 ký tự'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Hãy xác nhận lại mật khẩu'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Độ dài mật khẩu phải từ 5 - 160 ký tự'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài mật khẩu phải từ 5 - 160 ký tự'
//     },
//     validate:
//       typeof getValues === 'function'
//         ? (value) => value === getValues('password') || 'Nhập lại mật khẩu không khớp'
//         : undefined
//   }
// })

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .min(5, 'Độ dài email phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài email phải từ 5 - 160 ký tự')
    .matches(/^\S+@\S+\.\S+$/, 'Email không đúng định dạng'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(5, 'Độ dài mật khẩu phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài mật khẩu phải từ 5 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(5, 'Độ dài mật khẩu phải từ 5 - 160 ký tự')
    .max(160, 'Độ dài mật khẩu phải từ 5 - 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export type Schema = yup.InferType<typeof schema>
