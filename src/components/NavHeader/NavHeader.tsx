import { AppContext } from 'src/contexts/app.context'
import Popover from '../Popover'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchasesStatus } from 'src/constants/purchase'
import authApi from 'src/apis/auth.api'

export default function NavHeader() {
  const queryClient = useQueryClient()
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='flex justify-end'>
      <Popover
        className='flex cursor-pointer items-center py-1 hover:text-white/70'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col px-3 py-2'>
              <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
              <button className='px-3 py-2 hover:text-orange'>Tiếng Anh</button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span className='mx-1'>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
        </svg>
      </Popover>
      {isAuthenticated && (
        <Popover
          className='ml-6 flex cursor-pointer items-center py-1 hover:text-white/70'
          renderPopover={
            <div>
              <Link to={path.profile} className='block bg-white px-3 py-2 hover:bg-slate-100 hover:text-cyan-600'>
                Tài khoản của tôi
              </Link>
              <Link to={'/'} className='block bg-white px-3 py-2 hover:bg-slate-100 hover:text-cyan-600'>
                Đơn mua
              </Link>
              <button
                className='block w-full bg-white px-3 py-2 text-left hover:bg-slate-100 hover:text-cyan-600'
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <div className='h-5 w-5 flex-shrink-0'>
            <img
              src='https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/305202851_452055013536279_797964077833086645_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=GEmhfgVJeigQ7kNvgHaphib&_nc_ht=scontent.fsgn6-1.fna&oh=00_AYCHG-geQHe6hp_YKeGOK5rQOtjXmyDhFFh8W_R5XrK_kA&oe=6686DD3B'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            />
          </div>
          <div className='mr-8'>{profile?.email}</div>
        </Popover>
      )}
      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to={path.register} className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='h-4 border-r-[1px] border-r-white/40'></div>
          <Link to={path.login} className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}