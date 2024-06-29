import type { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  autoComplete?: string
}

export default function Input({ type, errorMessage, placeholder, className, name, register, autoComplete }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-700 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-red-600 min-h-5 text-sm text-left'>{errorMessage}</div>
    </div>
  )
}
