import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-7 pb-20 shadow'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lí thông tin hồ sơ bảo mật tài khoản</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-grow'>
            <div className='w-[15%] truncate pt-3 text-right capitalize'>Email</div>
            <div className='w-[75%] pl-5'>
              <div className='pt-3 text-gray-700'>quanbui@gmail.com</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[15%] truncate pt-3 text-right capitalize'>Tên</div>
            <div className='w-[75%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Tên'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[15%] truncate pt-3 text-right capitalize'>Số điện thoại</div>
            <div className='w-[75%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Số điện thoại'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[15%] truncate pt-3 text-right capitalize'>Địa chỉ</div>
            <div className='w-[75%] pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                placeholder='Địa chỉ'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[15%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
            <div className='w-[75%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3'>
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src='https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-1/305202851_452055013536279_797964077833086645_n.jpg?stp=cp6_dst-jpg_p160x160&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=EKmquWhl2V0Q7kNvgHB3noc&_nc_ht=scontent.fsgn6-1.fna&oh=00_AYC6Fzx2BI_3ftkWjcIz3nyi3hgOFJfgKbLLhDMSRf1U0w&oe=668FE759'
                alt=''
              ></img>
            </div>
            <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lượng tối đa 1 MB</div>
              <div>Định dạng .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
