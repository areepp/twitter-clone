import clsx from 'clsx'

type Props = {
  icon: React.ReactNode
  count: number
  disabled?: boolean
}

const IconWithNumber = ({ icon, count, disabled }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          'transtion rounded-full p-2 hover:bg-gray-100',
          disabled && 'cursor-not-allowed'
        )}
      >
        {icon}
      </div>
      <span className="w-1 text-sm">{count == 0 ? '' : count}</span>
    </div>
  )
}

export default IconWithNumber
