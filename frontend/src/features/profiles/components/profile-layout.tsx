import { useGetUserQueryData } from '@/features/auth'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import { useGetUserProfile } from '../hooks/use-get-user-profile'
import { EditProfileModal } from './edit-profile-modal'

export const ProfileLayout = () => {
  const { push } = useRouter()
  const { username: usernameQuery } = useParams()

  const { data: user, isLoading } = useGetUserProfile(usernameQuery as string)

  const loggedInUser = useGetUserQueryData()

  if (isLoading) return <div>loading screen..</div>

  if (!user) return <div>blank</div>

  return (
    <>
      <div className="flex w-full items-center gap-6 border-b px-3 py-1">
        <ArrowLeftIcon
          onClick={() => push('/')}
          className="h-5 w-5 shrink-0 cursor-pointer"
        />
        <div className="w-full">
          <p className="w-11/12 truncate text-xl font-semibold">
            {user.displayName}
          </p>
          <p className="text-xs text-dark-gray">15 Tweets</p>
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <section className="h-[27vw] max-h-[200px] w-full flex-shrink bg-slate-200"></section>
        <section className="relative h-auto min-h-[220px] p-5">
          {loggedInUser && loggedInUser.username === user.username && (
            <EditProfileModal />
          )}

          <div className="mt-6 flex flex-col gap-3 xs:mt-14 sm:top-20">
            <div>
              <h1 className="truncate text-xl font-semibold">
                {user.displayName}
              </h1>
              <p className=" text-dark-gray">@{user.username}</p>
            </div>
            <p>{user.bio}</p>
            <div className="flex gap-3">
              <div className="flex gap-1">
                <span className="font-bold">29</span>
                <span>Following</span>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">1</span>
                <span>Follower</span>
              </div>
            </div>
          </div>
          <div className="absolute -top-8 left-5 h-16 w-16 overflow-hidden rounded-full border-2 border-white xs:-top-12 xs:h-[100px] xs:w-[100px] sm:-top-16 sm:h-[132px] sm:w-[132px] sm:border-4">
            <Image
              className="object-cover"
              src={user.profilePictureUrl ?? '/twitter-default-pp.png'}
              alt="profile picture"
              sizes="100vw"
              fill
            />
          </div>
        </section>
      </div>
    </>
  )
}
