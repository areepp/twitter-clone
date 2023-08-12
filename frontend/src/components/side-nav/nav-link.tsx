import clsx from 'clsx'
import Link from 'next/link'
import { ForwardRefExoticComponent, SVGProps } from 'react'

interface Props {
  href: string
  Icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>
  text: string
  disabled?: boolean
}

const NavLink = ({ href, Icon, text, disabled }: Props) => (
  <Link
    href={href}
    className={clsx(
      'flex items-center gap-4 rounded-full px-4 py-3 transition hover:bg-zinc-300',
      disabled && 'cursor-not-allowed'
    )}
  >
    <Icon className="h-7 w-7" />
    <span className="hidden text-xl xl:block">{text}</span>
  </Link>
)

export default NavLink
