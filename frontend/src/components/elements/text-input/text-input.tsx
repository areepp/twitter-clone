import { FieldValues, UseFormRegister } from 'react-hook-form'

interface Props {
  placeholder: string
  inputType?: 'text' | 'password'
  registerValue?: string
  register?: UseFormRegister<FieldValues>
}

export const TextInput = ({
  placeholder,
  registerValue,
  register,
  inputType = 'text',
}: Props) => (
  <input
    className="rounded border py-3 px-2 focus:outline-primary-blue"
    type={inputType}
    placeholder={placeholder}
    {...register(registerValue)}
  />
)
