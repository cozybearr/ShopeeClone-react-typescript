import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import path from 'src/constants/path'

export default function NotFound() {
  return (
    <Fragment>
      <Helmet>
        <title>Trang không khả dụng</title>
        <meta name='description' title='Shopee Clone Not Found page'></meta>
      </Helmet>
      <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='text-center'>
          <p className='text-base font-semibold text-orange'>404</p>
          <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>Trang không khả dụng.</h1>
          <p className='mt-6 text-base leading-7 text-gray-600'>Không thể tải trang này</p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              to={path.home}
              className='rounded-md bg-orange px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              Về lại trang chủ
            </Link>
          </div>
        </div>
      </main>
    </Fragment>
  )
}
