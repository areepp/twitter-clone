import Image from 'next/image'
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
      <Image
        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        width="40"
        height="40"
        className="rounded-full"
        alt="photo profile"
      />
      <p className="hidden xl:block">user blablabla</p>
    </section>
  </header>
)

export default Sidebar
