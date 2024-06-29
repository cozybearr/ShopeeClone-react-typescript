import { RegisterOptions, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { getRules } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  confirm_password: string
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)
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
              <div className='mt-2'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email as RegisterOptions<FormData, 'email'>)}
                />
                <div className='mt-1 text-red-600 min-h-5 text-sm text-left'>{errors.email?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password as RegisterOptions<FormData, 'password'>)}
                />
                <div className='mt-1 text-red-600 min-h-5 text-sm text-left'>{errors.password?.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  {...register('confirm_password', {
                    ...(rules.confirm_password as RegisterOptions<FormData, 'confirm_password'>)
                  })}
                />
                <div className='mt-1 text-red-600 min-h-5 text-sm text-left'>{errors.confirm_password?.message}</div>
              </div>
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
