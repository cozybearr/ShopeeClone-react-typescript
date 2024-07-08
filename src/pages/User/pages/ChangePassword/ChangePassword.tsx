import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import userApi, { BodyUpdateProfile } from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { ErrorResponse } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const changePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']) as BodyUpdateProfile)
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <Fragment>
      <div className='rounded-sm bg-white px-7 pb-20 shadow'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lí thông tin hồ sơ bảo mật tài khoản</div>
        </div>
        <form className='mt-8 flex w-3/4 flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
          <div className='mt-6 flex-grow pr-12 md:mt-2'>
            <div className='flex'>
              <div className='w-[15%] truncate pt-3 text-right capitalize'>Mật khẩu cũ</div>
              <div className='w-[75%] pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Nhập mật khẩu cũ'
                  register={register}
                  name='password'
                  type='password'
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[15%] truncate pt-3 text-right capitalize'>Mật khẩu mới</div>
              <div className='w-[75%] pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Nhập mật khẩu mới'
                  register={register}
                  name='new_password'
                  type='password'
                  errorMessage={errors.new_password?.message}
                />
              </div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[15%] truncate pt-3 text-right capitalize'>Nhập lại mật khẩu</div>
              <div className='w-[75%] pl-5'>
                <Input
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 pr-10 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Nhập lại mật khẩu mới'
                  register={register}
                  name='confirm_password'
                  type='password'
                  errorMessage={errors.confirm_password?.message}
                />
              </div>
            </div>
            <div className='mt-6 flex flex-wrap'>
              <div className='w-[15%] truncate pt-3 text-right capitalize'></div>
              <div className='w-[75%] pl-5'>
                <Button
                  className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
