'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  FeatherIcon,
  PillButton,
} from '@/components/elements'
import { useState } from 'react'
import { NewTweetDialogue } from './new-tweet-dialogue'
import clsx from 'clsx'

type Props = {
  className?: string
}

export const NewTweetModal = ({ className }: Props) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <div className={clsx('w-full', className)}>
          <PillButton
            text="Tweet"
            variant="blue"
            size="xl"
            className="hidden w-full text-base xl:block"
          />
          <button className="rounded-full bg-primary-blue p-3 font-bold text-white xl:hidden">
            <FeatherIcon className="h-6 w-6" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="!min-h-[320px] !w-[90vw] !min-w-[300px] !max-w-[600px]">
        <NewTweetDialogue isModal setOpenModal={setOpenModal} />
      </DialogContent>
    </Dialog>
  )
}
