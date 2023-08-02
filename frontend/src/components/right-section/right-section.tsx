import { TrendsForYou } from '@/features/trending'
import { WhoToFollow } from '@/features/account-suggestions'

export const RightSection = () => {
  return (
    <div className="ml-6 hidden min-h-[1200px] w-[350px] py-3 lg:block">
      <TrendsForYou />
      <WhoToFollow />
    </div>
  )
}
