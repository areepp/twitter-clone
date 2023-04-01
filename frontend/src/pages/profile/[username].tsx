import Image from 'next/image'
import { MainLayout } from '@/components/layouts/main-layout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useGetLoggedInUser } from '@/features/auth'
import { useRouter } from 'next/router'
import { EditProfileModal, useGetUserProfile } from '@/features/profiles'

const Profile = () => {
  const { query, isReady, push } = useRouter()
  const { username } = query

  const { data, isLoading } = useGetUserProfile(username as string, {
    enabled: isReady,
  })

  const { data: loggedInUser } = useGetLoggedInUser()

  if (isLoading || !isReady) return <div>loading screen..</div>

  if (!data) return <div>blank</div>

  return (
    <MainLayout>
      <div className="flex w-full items-center gap-6 border-b px-3 py-1">
        <ArrowLeftIcon
          onClick={() => push('/')}
          className="h-5 w-5 shrink-0 cursor-pointer"
        />
        <div className="w-full">
          <p className="w-11/12 truncate text-xl font-semibold">
            {data.displayName}
          </p>
          <p className="text-xs text-dark-gray">15 Tweets</p>
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <section className="h-[27vw] max-h-[200px] w-full flex-shrink bg-slate-200"></section>
        <section className="relative h-auto min-h-[250px] p-5">
          {loggedInUser && data.username === loggedInUser.username && (
            <EditProfileModal />
          )}

          <div className="mt-6 flex flex-col gap-3 xs:mt-14 sm:top-20">
            <div>
              <h1 className="truncate text-xl font-semibold">
                {data.displayName}
              </h1>
              <p className=" text-dark-gray">@{data.username}</p>
            </div>
            <p>{data.bio}</p>
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
              src={
                data.profilePicture === ''
                  ? '/twitter-default-pp.png'
                  : data.profilePicture
              }
              alt="profile picture"
              fill
            />
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

export default Profile
