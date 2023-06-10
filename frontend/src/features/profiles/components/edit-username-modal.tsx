'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  PillButton,
  Spinner,
  TextInput,
  TwitterIcon,
} from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useEditProfile } from '../hooks/use-edit-profile'
import { useCheckUsernameAvailability } from '../hooks/use-check-username-availability'
import { NewUsernameInput } from '../types'

export const EditUserNameModal = () => {
  const { data: user } = useGetLoggedInUser()
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

  const { refetch: checkAvailability, isError } = useCheckUsernameAvailability(
    username as string
  )

  const { mutateAsync: changeUsername, isLoading } = useEditProfile()

  const onSubmit: SubmitHandler<NewUsernameInput> = async (data) => {
    await changeUsername({
      username: user!.username,
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

  if (!user) return null

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="rounded-full p-3 hover:bg-gray-100">
          <SparklesIcon className="h-5 w-5" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-[512px] w-[90vw] max-w-[512px] flex-col justify-between p-6"
        >
          <div className="flex flex-col gap-3">
            <TwitterIcon className="mx-auto" />
            <DialogTitle className="text-2xl font-bold">
              Change your username?
            </DialogTitle>
            <DialogDescription className="text-dark-gray">
              Your @username is unique. You can always change it here again.
            </DialogDescription>
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
            <DialogClose asChild>
              <PillButton
                text="Cancel"
                variant="white"
                size="large"
                aria-label="Close"
                className="mt-3"
              />
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
