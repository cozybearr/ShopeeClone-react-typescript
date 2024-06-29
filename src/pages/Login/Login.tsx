import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <div className='mt-2'>
                <input
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm'
                  autoComplete='on'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 min-h-5 text-sm text-left'></div>
              </div>
              <div className='mt-2'>
                <button
                  type='submit'
                  className='w-full py-4 px-2 text-center uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='mt-8 text-center'>
                <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                <Link to={'/register'} className='ml-2 text-red-400 '>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
