import { IUser } from '@/types/IUser'
import UserCard from './UserCard'

const USERS_DATA: IUser[] = [
  {
    userId: 'clara',
    userName: 'Clara',
    userImgUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    userId: 'johndoel',
    userName: 'John Doel',
    userImgUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    userId: 'lisa',
    userName: 'List A',
    userImgUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
]

const WhoToFollow = () => (
  <div className="mt-3 flex w-full flex-col gap-6 rounded-xl bg-gray-100 p-3">
    <h3 className="text-xl font-bold">Who to follow</h3>
    <div className="flex flex-col gap-6">
      {USERS_DATA.map((user) => (
        <UserCard key={user.userId} data={user} />
      ))}
    </div>
    <button className="self-start text-primary-blue">Show more</button>
  </div>
)

export default WhoToFollow
