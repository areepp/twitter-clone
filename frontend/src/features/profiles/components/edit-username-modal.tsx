import {
  PillButton,
  Spinner,
  TextInput,
  TwitterIcon,
} from '@/components/elements'
import { useGetUserQueryData } from '@/features/auth'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useEditProfile } from '../hooks/use-edit-profile'
import { useCheckUsernameAvailability } from '../hooks/use-check-username-availability'
import { NewUsernameInput } from '../types'

export const EditUserNameModal = () => {
  const user = useGetUserQueryData()

  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<NewUsernameInput>({
    resolver: zodResolver(NewUsernameInput),
    mode: 'all',
  })

  const { username } = useWatch({ control })

  const { refetch: checkAvailability, isError } =
    useCheckUsernameAvailability(username)

  const { mutateAsync: changeUsername, isLoading } = useEditProfile()

  const onSubmit: SubmitHandler<NewUsernameInput> = async (data) => {
    await changeUsername({
      username: user.username,
      newUsername: data.username,
    })
    setOpenModal(false)
  }

  useEffect(() => {
    const subscription = watch(async ({ username }) => {
      handleSubmit(() => checkAvailability())()
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <button className="rounded-full p-3 hover:bg-gray-100">
          <SparklesIcon className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content asChild>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed top-1/2 left-1/2 flex h-[512px] w-[90vw] max-w-[512px] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-lg bg-white p-6"
          >
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
                register={register}
                registerValue="username"
                className={
                  errors.username ? 'border-red-600 focus:border-red-600' : ''
                }
              />
              {(errors?.username || isError) && (
                <span className="text-sm text-red-600">
                  {errors.username?.message
                    ? errors.username.message
                    : 'This username has been taken. Please choose another.'}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <PillButton
                text={isLoading ? <Spinner /> : 'Set username'}
                variant="black"
                size="large"
                type="submit"
                disabled={isLoading}
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
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
