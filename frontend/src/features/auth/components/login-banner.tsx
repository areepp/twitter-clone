import { PillButton } from '@/components/elements'
import Link from 'next/link'
import { useState } from 'react'

export const LoginBanner = () => {
  const [showModal, setShowModal] = useState(true)
  return (
    <>
      <div className="fixed bottom-0 w-full bg-primary-blue px-6 py-3 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden flex-col md:flex">
            <span className="text-2xl font-bold">
              Don't miss what's happening
            </span>
            <span>People on Twitter are first to know.</span>
          </div>
          <div className="flex flex-grow gap-3 md:max-w-[175px] md:flex-auto">
            <Link
              href="/login"
              className="w-full md:w-fit"
              onClick={() => setShowModal(true)}
            >
              <PillButton
                text="Log in"
                variant="blue"
                className="w-full border border-white"
              />
            </Link>
            <Link href="/signup" className="w-full md:w-fit">
              <PillButton text="Sign up" variant="white" className="w-full" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
