'use client'

import { useGetLoggedInUser, useLogout } from '@/features/auth'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/elements'
import { PillButton, TwitterIcon } from '../elements'
import { useState } from 'react'

const Logout = () => {
  const { refetch, isInitialLoading } = useLogout()
  const { data: user } = useGetLoggedInUser()
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="flex w-full items-center gap-1 p-4 transition hover:bg-gray-100 focus:outline-none">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span className="font-bold">Log out @{user?.username}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="flex !w-[320px] flex-col rounded-lg bg-white p-6">
        <TwitterIcon className="mx-auto" />
        <DialogTitle className="mt-3 text-xl font-bold">
          Log out of Twitter?
        </DialogTitle>
        <DialogDescription className="mt-1 text-dark-gray">
          You can always log back in at any time.
        </DialogDescription>
        <PillButton
          className="mt-6"
          text={isInitialLoading ? 'Logging out..' : 'Log out'}
          variant="black"
          size="large"
          onClick={refetch}
        />
        <DialogClose asChild>
          <PillButton
            text="Cancel"
            variant="white"
            size="large"
            aria-label="Close"
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default Logout
