'use client'

import { PillButton } from '@/components/elements'
import { useGetUserQueryData } from '@/features/auth'
import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import clsx from 'clsx'
import TextareaAutosize from 'react-textarea-autosize'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NewTweetSchema } from '../types'
import { useCreateTweet } from '../hooks/use-create-tweet'

interface Props {
  isModal?: boolean
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewTweetDialogue = ({ isModal, setOpenModal }: Props) => {
  const user = useGetUserQueryData()

  const { register, handleSubmit, formState, reset } = useForm<NewTweetSchema>({
    resolver: zodResolver(NewTweetSchema),
    mode: 'all',
  })

  const { mutateAsync } = useCreateTweet()

  const onSubmit: SubmitHandler<NewTweetSchema> = async (data) => {
    await mutateAsync(data)
    if (isModal) {
      setOpenModal(false)
    }
    reset()
  }

  if (!user) return null

  return (
    <div
      className={clsx('flex w-full gap-4 px-3 py-2', !isModal && 'border-b')}
    >
      <div>
        <div className="relative h-12 w-12">
          <Image
            src={user.profilePictureUrl ?? '/twitter-default-pp.png'}
            fill
            className="rounded-full object-cover"
            alt="photo profile"
          />
        </div>
      </div>
      <form className="grow" onSubmit={handleSubmit(onSubmit)}>
        <TextareaAutosize
          className={clsx(
            'w-full resize-none pt-3 text-lg focus:outline-none',
            isModal && 'min-h-[200px]'
          )}
          maxLength={280}
          placeholder="What's happening?"
          {...register('text', { required: true })}
        />

        <div className="mt-3 flex items-center justify-between">
          <fieldset className="flex gap-4">
            <PhotoIcon className="h-5 w-5 text-primary-blue" />
            <GifIcon className="h-5 w-5 text-primary-blue" />
            <FaceSmileIcon className="h-5 w-5 text-primary-blue" />
            <MapPinIcon className="h-5 w-5 text-primary-blue" />
          </fieldset>
          <PillButton
            text="Tweet"
            variant="blue"
            type="submit"
            disabled={!formState.isValid}
          />
        </div>
      </form>
    </div>
  )
}
