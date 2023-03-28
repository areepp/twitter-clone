import { TrendsForYou } from '@/features/trending'
import { WhoToFollow } from '@/features/account-suggestions'
import { useGetUserQueryData } from '@/features/auth'

export const RightSection = () => {
  const user = useGetUserQueryData()
  return (
    <div className="ml-6 hidden w-[350px] py-3 lg:block">
      <TrendsForYou />
      {user && <WhoToFollow />}
    </div>
  )
}
