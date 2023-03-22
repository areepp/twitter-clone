import { RightSection } from '@/components/right-section'
import { SideNav } from '@/components/side-nav'

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto flex h-screen xl:px-20">
    <SideNav />
    <main className="ml-[65px] max-w-[600px] grow border-r xl:ml-[250px]">
      {children}
    </main>
    <RightSection />
  </div>
)
