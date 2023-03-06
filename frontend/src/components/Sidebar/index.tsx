import TwitterIcon from '../Icons/TwitterIcon'
import Navigations from './Navigations'

const Sidebar = () => (
  <header className="flex h-screen flex-col items-center justify-between border-r p-3 xl:w-[250px]">
    <section className="flex flex-col gap-8">
      <h1>
        <TwitterIcon />
      </h1>
      <Navigations />
    </section>
    <section className="mb-2 xl:self-start">
      <div className="h-[40px] w-[40px] rounded-full bg-slate-500" />
    </section>
  </header>
)

export default Sidebar
