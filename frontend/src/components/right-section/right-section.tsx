import { TrendsForYou } from '@/features/trending'
import { WhoToFollow } from '@/features/account-suggestions'

export const RightSection = () => (
  <div className="ml-6 hidden w-[350px] py-3 lg:block">
    <TrendsForYou />
    <WhoToFollow />
  </div>
)
