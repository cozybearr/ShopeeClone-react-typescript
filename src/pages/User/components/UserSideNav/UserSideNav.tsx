import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import userImage from 'src/assets/images/user.svg'
import { getAvatarUrl } from 'src/utils/utils'
import classNames from 'classnames'
export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <Fragment>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={getAvatarUrl(profile?.avatar as string) || userImage}
            alt=''
            className='h-full w-full object-cover'
          />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold'>quanbui</div>
          <Link to={path.profile} className='flex capitalize text-gray-500'>
            <svg className='mr-2 h-3 w-3' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('mb-3 flex items-center capitalize', {
              'text-orange transition-colors': isActive
            })
          }
        >
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            alt=''
          />
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mb-3 flex items-center capitalize', {
              'text-orange transition-colors': isActive
            })
          }
        >
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            alt=''
          />
          Đổi mật khẩu
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('mb-3 flex items-center capitalize', {
              'text-orange transition-colors': isActive
            })
          }
        >
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
          />
          Đơn mua
        </NavLink>
      </div>
    </Fragment>
  )
}
