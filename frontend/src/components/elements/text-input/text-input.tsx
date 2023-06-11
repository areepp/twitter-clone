'use client'

import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'

interface Props extends React.HTMLProps<HTMLInputElement> {
  name: string
  value?: string
}

export const TextInput = ({ name, className, ...rest }: Props) => {
  const { register } = useFormContext()

  console.log('AAAAAAAA', useFormContext())

  return (
    <input
      className={clsx(
        className,
        'rounded border px-2 py-3 focus:border-primary-blue focus:outline-none'
      )}
      {...register(name)}
      {...rest}
    />
  )
}
