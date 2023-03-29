import { FieldValues, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'

interface Props {
  placeholder: string
  inputType?: 'text' | 'password'
  registerValue?: string
  register?: UseFormRegister<FieldValues>
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextInput = ({
  placeholder,
  registerValue,
  register,
  className,
  inputType = 'text',
  ...rest
}: Props) => {
  const props = register ? register(registerValue) : {}

  return (
    <input
      className={clsx(
        'rounded border py-3 px-2 focus:outline-primary-blue',
        className
      )}
      type={inputType}
      placeholder={placeholder}
      {...props}
      {...rest}
    />
  )
}
