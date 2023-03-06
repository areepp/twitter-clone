import Dashboard from '@/components/Dashboard'
import Sidebar from '@/components/Sidebar'

const Home = () => (
  <div className="container mx-auto flex h-screen xl:px-20">
    <Sidebar />
    <Dashboard />
  </div>
)

export default Home
