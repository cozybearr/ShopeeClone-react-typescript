import { RegisterOptions, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Schema } from 'src/utils/rules'
// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  // const rules = getRules(getValues)

  const onSubmit = handleSubmit(
    (data) => {},
    (data) => {
      const password = getValues('password')
      console.log(password)
    }
  )
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                className='mt-8'
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
                name={'email'}
                autoComplete='on'
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Password'
                register={register}
                errorMessage={errors.password?.message}
                name={'password'}
                autoComplete='on'
              />
              <Input
                className='mt-2'
                type='password'
                placeholder='Confirm Password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                name={'confirm_password'}
                autoComplete='on'
              />
              <div className='mt-2'>
                <button className='w-full py-4 px-2 text-center uppercase bg-red-500 text-white text-sm hover:bg-red-600'>
                  Đăng Ký
                </button>
              </div>
              <div className='mt-8 text-center'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to={'/login'} className='ml-2 text-red-400 '>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
