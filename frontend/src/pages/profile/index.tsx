import Image from 'next/image'
import { MainLayout } from '@/components/layouts/main-layout'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { PillButton } from '@/components/elements'
import { useUser } from '@/features/profiles'

const Profile = () => {
  const { data, isLoading } = useUser()

  if (isLoading) return <div>loading screen..</div>
  return (
    <MainLayout>
      <div className="flex items-center gap-6 border-b px-3 py-1">
        <ArrowLeftIcon className="h-5 w-5" />
        <div>
          <p className="text-xl font-semibold">ramarimari</p>
          <p className="text-xs text-dark-gray">15 Tweets</p>
        </div>
      </div>
      <div className="relative flex h-[320px] w-full  flex-col xs:h-[380px] sm:h-[450px]">
        <section className="w-full flex-shrink grow-[1] bg-slate-200 xs:grow-[3] sm:grow-[8]"></section>
        <section className="relative w-full grow-[2] xs:grow-[4] sm:grow-[10]">
          <div className="absolute top-3 right-3">
            <PillButton text="Edit profile" variant="light" />
          </div>
          <div className="absolute left-5 top-12 flex flex-col gap-3 sm:top-20">
            <div>
              <h1 className="text-xl font-semibold">ramarimari</h1>
              <p className=" text-dark-gray">@pentlogoreng</p>
            </div>
            <p>Paulin</p>
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
        </section>
        <div className="absolute top-[75px] left-5 h-16 w-16 overflow-hidden rounded-full border-2 border-white xs:top-[110px] xs:h-[100px] xs:w-[100px] sm:top-[130px] sm:h-[132px] sm:w-[132px] sm:border-4">
          <Image
            src={data.profilePicture ?? '/twitter-default-pp.png'}
            alt="profile picture"
            fill
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile
