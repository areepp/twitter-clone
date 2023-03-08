import Image from 'next/image'
import { IUser } from '@/types/IUser'

const UserCard = ({ data }: { data: IUser }) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-grow gap-3">
      <Image
        src={data.userImgUrl}
        width="48"
        height="48"
        className="rounded-full object-cover"
        alt="photo profile"
      />
      <div className="flex flex-col">
        <span className="font-bold">{data.userName}</span>
        <span className="text-dark-gray">@{data.userId}</span>
      </div>
    </div>
    <button className="rounded-full bg-black px-3 py-1 font-semibold text-white">
      Follow
    </button>
  </div>
)

export default UserCard
