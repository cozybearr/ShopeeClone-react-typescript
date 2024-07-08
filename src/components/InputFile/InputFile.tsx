import { useRef } from 'react'
import { toast } from 'react-toastify'
import { Fragment } from 'react/jsx-runtime'
import config from 'src/constants/config'

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function InputFile({ setFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1MB. Định dạng .JPEG, .PNG')
    } else {
      setFile(fileFromLocal)
    }
  }

  return (
    <Fragment>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => ((event.target as any).value = null)}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  )
}
