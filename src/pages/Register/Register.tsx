import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import type { Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button'
import { Helmet } from 'react-helmet-async'
// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  // const rules = getRules(getValues)
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <Helmet>
        <title>Đăng ký</title>
        <meta name='description' title='Shopee Clone Register page'></meta>
      </Helmet>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
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
                <Button
                  className='flex w-full items-center justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng Ký
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <span className='text-slate-400'>Bạn đã có tài khoản?</span>
                <Link to={'/login'} className='ml-2 text-red-400'>
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
