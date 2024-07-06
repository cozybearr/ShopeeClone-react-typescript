import { forwardRef, InputHTMLAttributes, useState } from 'react'
import type { UseFormRegister } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<any>
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function (
  {
    errorMessage,
    className,
    onChange,
    value = '',
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-5 text-sm',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(event)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} value={value || localValue} {...rest} ref={ref} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
