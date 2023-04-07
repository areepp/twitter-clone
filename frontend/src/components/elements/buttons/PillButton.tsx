import clsx from 'clsx'

const variants = {
  black: 'bg-black text-white',
  white: 'bg-white text-black border border-gray-200',
  blue: 'bg-primary-blue text-white disabled:bg-blue-200 disabled:cursor-not-allowed',
}

const sizes = {
  small: 'h-[32px] text-sm',
  medium: 'h-[36px] text-sm',
  large: 'h-[42px] text-sm',
  xl: 'h-[50px] text-lg',
}

interface Props {
  text: string | React.ReactNode
  variant: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

export const PillButton = ({
  text,
  variant,
  size = 'medium',
  className,
  onClick,
  ...rest
}: Props) => (
  <button
    className={clsx(
      'flex h-[36px] items-center justify-center rounded-full px-4 font-semibold',
      className,
      variants[variant],
      sizes[size]
    )}
    onClick={onClick}
    {...rest}
  >
    {text}
  </button>
)
