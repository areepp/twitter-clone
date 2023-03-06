import TwitterIcon from '../Icons/TwitterIcon'
import Navigations from './Navigations'

const Sidebar = () => (
  <header className="fixed flex h-screen flex-col items-center justify-between border-r p-3 xl:w-[250px]">
    <section className="flex flex-col gap-8">
      <h1>
        <TwitterIcon />
      </h1>
      <Navigations />
    </section>
    <section className="mb-2 flex items-center gap-4">
      <div className="h-[40px] w-[40px] rounded-full bg-slate-500" />
      <p className="hidden xl:block">user blablabla</p>
    </section>
  </header>
)

export default Sidebar
