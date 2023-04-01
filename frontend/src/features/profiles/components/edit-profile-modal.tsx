import { PillButton, Spinner, TextInput } from '@/components/elements'
import { useGetUserQueryData } from '@/features/auth'
import {
  CameraIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EditProfileInput } from '../types'
import { useEditProfile } from '../hooks/use-edit-profile'

export const EditProfileModal = () => {
  const user = useGetUserQueryData()
  const [openModal, setOpenModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(EditProfileInput),
    defaultValues: {
      displayName: user?.displayName,
      bio: user?.bio,
    },
  })
  const { mutateAsync, isLoading } = useEditProfile()

  const onSubmit: SubmitHandler<EditProfileInput> = async (data) => {
    await mutateAsync({ username: user.username, ...data })
    setOpenModal(false)
  }

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger asChild>
        <PillButton
          className="absolute top-3 right-3"
          text="Edit profile"
          variant="white"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 min-h-[650px] w-[90vw] min-w-[300px] max-w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white">
          <header className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <Dialog.Close>
                <XMarkIcon className="h-5 w-5" />
              </Dialog.Close>
              <Dialog.Title className="text-lg font-bold">
                Edit profile
              </Dialog.Title>
            </div>
            <PillButton
              text={isLoading ? <Spinner /> : 'Save'}
              variant="white"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            />
          </header>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex w-full flex-col"
          >
            <section className="h-[27vw] max-h-[200px] w-full flex-shrink bg-slate-200"></section>
            <section className="relative h-auto min-h-[250px] p-5">
              <div className="absolute -top-8 left-5 h-16 w-16 overflow-hidden rounded-full border-2 border-white xs:-top-12 xs:h-[100px] xs:w-[100px] sm:-top-16 sm:h-[132px] sm:w-[132px] sm:border-4">
                <Image
                  src={
                    user.profilePicture === ''
                      ? '/twitter-default-pp.png'
                      : user.profilePicture
                  }
                  alt="profile picture"
                  fill
                />
                <div className="absolute top-[10px] left-[10px] z-50 h-fit w-fit rounded-full bg-black bg-opacity-50 p-2 xs:top-[28px] xs:left-[28px] sm:top-[42px] sm:left-[42px]">
                  <CameraIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-6 xs:mt-20 sm:top-20">
                <fieldset className="flex flex-col gap-1">
                  <TextInput
                    placeholder="Display name"
                    maxLength={50}
                    register={register}
                    registerValue="displayName"
                    className={
                      errors.displayName
                        ? 'border-red-600 focus:border-red-600'
                        : ''
                    }
                  />
                  {errors.displayName && (
                    <span className="text-xs text-red-600">
                      {errors.displayName.message}
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  <textarea
                    className="h-[100px] w-full resize-none rounded border py-3 px-2 focus:border-primary-blue focus:outline-none"
                    placeholder="Bio"
                    maxLength={160}
                    {...register('bio')}
                  />
                </fieldset>
              </div>
            </section>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
