'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'
import clsx from 'clsx'

interface Props extends React.HTMLProps<HTMLInputElement> {
  registerValue?: string
  register?: UseFormRegister<FieldValues>
  value?: string
}

export const TextInput = ({
  registerValue,
  register,
  className,
  ...rest
}: Props) => {
  const props = register ? register(registerValue) : {}

  return (
    <input
      className={clsx(
        className,
        'rounded border px-2 py-3 focus:border-primary-blue focus:outline-none'
      )}
      {...props}
      {...rest}
    />
  )
}
