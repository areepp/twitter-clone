import { RightSection } from '@/components/right-section'
import { SideNav } from '@/components/side-nav'

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto flex min-h-screen xl:px-20">
    <SideNav />
    <main className="ml-[72px] max-w-[600px] grow overflow-hidden border-r xl:ml-[260px]">
      {children}
    </main>
    <RightSection />
  </div>
)
