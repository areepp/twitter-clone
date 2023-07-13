'use client'

import { PillButton } from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import clsx from 'clsx'
import TextareaAutosize from 'react-textarea-autosize'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { MAX_FILE_SIZE, NewTweetSchema } from '../types'
import { useCreateTweet } from '../hooks/use-create-tweet'
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import MediaAttachments from './media-attachments'

interface Props {
  isModal?: boolean
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewTweetDialogue = ({ isModal, setOpenModal }: Props) => {
  const { data: user } = useGetLoggedInUser()

  const { register, handleSubmit, formState, reset, control } =
    useForm<NewTweetSchema>({
      resolver: zodResolver(NewTweetSchema),
      mode: 'all',
    })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media_attachments',
  })

  const onDrop = useCallback(
    (files: File[]) => {
      append({ url: URL.createObjectURL(files[0]), file: files[0] })
    },
    [append]
  )

  const { open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    noDrag: true,
    maxSize: MAX_FILE_SIZE,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  })

  const { mutateAsync, isLoading } = useCreateTweet()

  const onSubmit: SubmitHandler<NewTweetSchema> = async (data) => {
    await mutateAsync(data)
    if (isModal && setOpenModal) {
      setOpenModal(false)
    }
    reset()
  }

  if (!user) return null

  return (
    <div
      className={clsx(
        'flex w-full gap-4 px-3 pb-3 pt-6',
        !isModal && 'border-b'
      )}
    >
      <div className="relative h-12 w-12">
        <Image
          src={user.profilePictureUrl ?? '/twitter-default-pp.png'}
          fill
          className="rounded-full object-cover"
          alt="photo profile"
        />
      </div>

      <form
        className="flex h-full grow flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextareaAutosize
          className={clsx(
            'w-full resize-none pt-3 text-lg focus:outline-none',
            isModal && 'min-h-[50px]'
          )}
          maxLength={280}
          placeholder="What's happening?"
          {...register('text', { required: true })}
        />

        <div className="flex-1">
          {fields.length > 0 && (
            <MediaAttachments
              attachments={fields}
              hasDeleteButton
              handleDelete={(index: number) => remove(index)}
              className={!isModal ? 'mt-2' : ''}
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <fieldset className="flex gap-4">
            <PhotoIcon
              onClick={open}
              className="h-5 w-5 cursor-pointer text-primary-blue"
            />
            <GifIcon className="h-5 w-5 text-primary-blue" />
            <FaceSmileIcon className="h-5 w-5 text-primary-blue" />
            <MapPinIcon className="h-5 w-5 text-primary-blue" />
          </fieldset>
          <PillButton
            text="Tweet"
            variant="blue"
            type="submit"
            disabled={!formState.isValid || isLoading}
            isLoading={isLoading}
          />
        </div>
      </form>
    </div>
  )
}
