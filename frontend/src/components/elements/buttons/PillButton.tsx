import clsx from 'clsx'

const variants = {
  dark: 'bg-black text-white',
  light: 'bg-white text-black border border-gray-200',
}

interface Props {
  text: string
  variant: keyof typeof variants
  classNames?: string
}

export const PillButton = ({ text, variant }: Props) => (
  <button
    className={clsx('rounded-full px-4 py-1 font-semibold', variants[variant])}
  >
    {text}
  </button>
)
