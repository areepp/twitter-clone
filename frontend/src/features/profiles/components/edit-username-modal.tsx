import { PillButton, TextInput, TwitterIcon } from '@/components/elements'
import { SparklesIcon } from '@heroicons/react/24/outline'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

export const EditUserNameModal = () => {
  const [newUsername, setNewUsername] = useState('')

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value)
  }

  const handleChangeUsername = () => {
    console.log(newUsername)
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="rounded-full p-3 hover:bg-gray-100">
          <SparklesIcon className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 flex h-[512px] w-[90vw] max-w-[512px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-6">
          <div className="flex flex-col gap-3">
            <TwitterIcon className="mx-auto" />
            <Dialog.Title className="text-2xl font-bold">
              Change your username?
            </Dialog.Title>
            <Dialog.Description className="text-dark-gray">
              Your @username is unique. You can always change it here again.
            </Dialog.Description>
            <TextInput
              placeholder="Username"
              value={newUsername}
              onChange={handleOnchange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <PillButton
              text="Set username"
              variant="black"
              size="large"
              onClick={handleChangeUsername}
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
