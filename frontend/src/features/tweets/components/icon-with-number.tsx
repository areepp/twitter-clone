import { ReactElement } from 'react'

type Props = {
  icon: React.ReactNode
  count?: number
}

const IconWithNumber = ({ icon, count }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="w-1 text-sm">{count === 0 ? '' : count}</span>
    </div>
  )
}

export default IconWithNumber
