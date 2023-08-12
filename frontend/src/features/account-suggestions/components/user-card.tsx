import Image from 'next/image'
import { IUserTemp } from '@/features/profiles'
import { PillButton } from '@/components/elements'

export const UserCard = ({ data }: { data: IUserTemp }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-grow gap-3">
      <Image
        src={data.userImgUrl}
        width="48"
        height="48"
        className="h-12 rounded-full object-cover"
        alt="photo profile"
      />

      <div className="flex flex-col">
        <span className="font-bold">{data.userName}</span>
        <span className="text-dark-gray">@{data.userId}</span>
      </div>
    </div>
    <PillButton text="Follow" variant="black" size="small" disabled />
  </div>
)
