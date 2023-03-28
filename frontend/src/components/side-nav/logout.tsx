import { useLogout } from '@/features/auth'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { PillButton, TwitterIcon } from '../elements'

const Logout = () => {
  const { refetch } = useLogout()
  const [openModal, setOpenModal] = useState(false)

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-4">
          <ArrowLeftOnRectangleIcon className="h-7 w-7" />
          <span className="hidden text-xl xl:block">Log out</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 flex max-w-[320px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg bg-white p-6">
          <TwitterIcon className="mx-auto" />
          <Dialog.Title className="mt-3 text-lg font-bold">
            Log out of Twitter?
          </Dialog.Title>
          <Dialog.Description className="mt-1 text-dark-gray">
            You can always log back in at any time.
          </Dialog.Description>
          <PillButton
            className="mt-6"
            text="Log out"
            variant="black"
            size="large"
            onClick={refetch}
          />
          <Dialog.Close asChild>
            <PillButton
              text="Cancel"
              variant="white"
              size="large"
              aria-label="Close"
              className="mt-3"
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Logout
