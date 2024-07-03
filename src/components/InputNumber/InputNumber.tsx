import { onChange } from 'node_modules/react-toastify/dist/core/store'
import { forwardRef, InputHTMLAttributes } from 'react'
import type { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function (
  {
    errorMessage,
    className,
    onChange,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-5 text-sm',
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
