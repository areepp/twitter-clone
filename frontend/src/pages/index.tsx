import Dashboard from '@/components/Dashboard'
import RightPanel from '@/components/RightPanel'
import Sidebar from '@/components/Sidebar'

const Home = () => (
  <div className="container mx-auto flex h-screen xl:px-20">
    <Sidebar />
    <Dashboard />
    <RightPanel />
  </div>
)

export default Home
