import TrendsForYou from './TrendsForYou'
import WhoToFollow from './WhoToFollow'

const RightPanel = () => (
  <div className="ml-6 hidden w-[350px] py-3 lg:block">
    <TrendsForYou />
    <WhoToFollow />
  </div>
)

export default RightPanel
