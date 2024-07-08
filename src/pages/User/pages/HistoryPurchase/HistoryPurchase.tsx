import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTab = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.all
  const { isAuthenticated } = useContext(AppContext)
  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data
  console.log(purchasesInCart)
  const purchaseTabLinks = purchaseTab.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: tab.status.toString()
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <Fragment>
      <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabLinks}</div>
      <div className='mt-2 flex-col py-4'>
        {purchasesInCart?.map((purchase) => (
          <Link
            to={{
              pathname: `${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`
            }}
            key={purchase._id}
          >
            <div className='mt-4 flex justify-between bg-white px-4 py-6'>
              <div className='flex'>
                <img
                  src={purchase.product.image}
                  alt={purchase.product.name}
                  className='h-24 w-24 text-wrap rounded-sm border-2 border-slate-500 bg-white object-cover'
                  loading='lazy'
                  aria-hidden='true'
                />
                <div className='ml-4'>
                  <div>{purchase.product.name}</div>
                  <div className='mt-2'>x{purchase.buy_count}</div>
                </div>
              </div>
              <div>
                <div className='flex justify-end'>
                  <div>
                    <span className='text-xs'>₫</span>
                    <span className='text-gray-500 line-through'>
                      {formatCurrency(purchase.product.price_before_discount)}
                    </span>
                  </div>
                  <div className='ml-4 text-orange'>
                    <span className='text-xs'>₫</span>
                    <span>{formatCurrency(purchase.product.price)}</span>
                  </div>
                </div>
                <div className='mt-12 flex items-center'>
                  <div>
                    <span className='capitalize'>Tổng giá tiền</span>
                  </div>
                  <div className='ml-4 text-orange'>
                    <span className='text-xs'>₫</span>
                    <span className='text-lg'>{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Fragment>
  )
}
