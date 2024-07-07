import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import path from 'src/constants/path'

export default function UserSideNav() {
  return (
    <Fragment>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img
            src={
              'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-1/305202851_452055013536279_797964077833086645_n.jpg?stp=cp6_dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=EKmquWhl2V0Q7kNvgHB3noc&_nc_ht=scontent.fsgn6-1.fna&oh=00_AYC6Fzx2BI_3ftkWjcIz3nyi3hgOFJfgKbLLhDMSRf1U0w&oe=668FE759'
            }
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
        <Link to={path.profile} className='mb-3 flex items-center capitalize text-orange transition-colors'>
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            alt=''
          />
          Tài khoản của tôi
        </Link>
        <Link to={path.changePassword} className='mb-3 flex items-center capitalize transition-colors'>
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            alt=''
          />
          Đổi mật khẩu
        </Link>
        <Link to={path.historyPurchase} className='flex items-center capitalize transition-colors'>
          <img
            className='mr-3 h-7 w-7'
            src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
          />
          Đơn mua
        </Link>
      </div>
    </Fragment>
  )
}
