import { RightSection } from '@/components/right-section'
import { SideNav } from '@/components/side-nav'

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="container mx-auto flex h-screen xl:px-20">
    <SideNav />
    {children}
    <RightSection />
  </div>
)
