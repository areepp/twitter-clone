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
          <div className="flex w-full gap-3 md:max-w-[175px]">
            <Link
              href="/login"
              onClick={() => setShowModal(true)}
              className="flex-grow rounded-full border border-slate-50 py-1 text-center font-semibold"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="flex-grow rounded-full bg-slate-50 py-1 text-center font-semibold  text-black"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
