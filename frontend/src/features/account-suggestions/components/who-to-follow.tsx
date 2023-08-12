'use client'

import { IUserTemp } from '@/features/profiles'
import { UserCard } from './user-card'
import { useGetLoggedInUser } from '@/features/auth'

const USERS_DATA: IUserTemp[] = [
  {
    userId: 'clara',
    userName: 'Clara',
    userImgUrl:
      'https://images.unsplash.com/photo-1613489047219-a93dfb72da35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    userId: 'johndoel',
    userName: 'John Doel',
    userImgUrl:
      'https://images.unsplash.com/photo-1613489047219-a93dfb72da35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
  {
    userId: 'lisa',
    userName: 'List A',
    userImgUrl:
      'https://images.unsplash.com/photo-1613489047219-a93dfb72da35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  },
]

export const WhoToFollow = () => {
  const { data: user } = useGetLoggedInUser()

  if (!user) return null

  return (
    <div className="mt-3 flex w-full cursor-not-allowed flex-col gap-6 rounded-xl bg-gray-100 p-3">
      <h3 className="text-xl font-bold">Who to follow</h3>
      <div className="flex flex-col gap-6">
        {USERS_DATA.map((user) => (
          <UserCard key={user.userId} data={user} />
        ))}
      </div>
      <button className="cursor-not-allowed self-start text-primary-blue">
        Show more
      </button>
    </div>
  )
}
