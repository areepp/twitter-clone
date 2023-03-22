import Link from 'next/link'
import { ForwardRefExoticComponent, SVGProps } from 'react'

interface Props {
  href: string
  Icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  text: string
}

const NavLink = ({ href, Icon, text }: Props) => (
  <Link href={href} className="flex items-center gap-4">
    <Icon className="h-7 w-7" />
    <span className="hidden text-xl xl:block">{text}</span>
  </Link>
)

export default NavLink
