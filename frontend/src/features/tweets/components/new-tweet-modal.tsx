'use client'

import { FeatherIcon, PillButton } from '@/components/elements'
import { XMarkIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { NewTweetDialogue } from './new-tweet-dialogue'

export const NewTweetModal = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <div className="w-full">
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
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed left-1/2 top-1/4 min-h-[320px] w-[90vw] min-w-[300px] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
          <header className="p-3">
            <Dialog.Close asChild>
              <XMarkIcon className="h-5 w-5 cursor-pointer" />
            </Dialog.Close>
          </header>
          <NewTweetDialogue isModal setOpenModal={setOpenModal} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
