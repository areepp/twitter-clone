import { PillButton } from '@/components/elements'
import { useGetLoggedInUser } from '@/features/auth'
import {
  FaceSmileIcon,
  GifIcon,
  MapPinIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useCreateTweetReply } from '../hooks/use-create-tweet'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MAX_FILE_SIZE, NewTweetSchema } from '../types'
import { useDropzone } from 'react-dropzone'
import MediaAttachments from './media-attachments'

const TweetYourReply = ({
  replyToUsernames,
  parentTweetId,
  parentReplyId,
}: {
  replyToUsernames: string[]
  parentTweetId: string
  parentReplyId?: string
}) => {
  const { data: loggedInUser } = useGetLoggedInUser()
  const [isExpanded, setIsExpanded] = useState(false)

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

  const { mutateAsync: doCreateTweetReply, isLoading } = useCreateTweetReply()

  if (!loggedInUser) return null

  const handleReplyClick = () => {
    if (!isExpanded) {
      setIsExpanded(true)
    }
  }

  const onSubmit: SubmitHandler<NewTweetSchema> = async (data) => {
    await doCreateTweetReply({
      ...data,
      tweetId: parentTweetId,
      in_reply_to_reply_id: parentReplyId,
    })
    setIsExpanded(false)
    reset({
      text: '',
      media_attachments: [],
    })
  }

  return (
    <>
      {isExpanded && (
        <p className="mb-3 ml-[52px] text-dark-gray">
          Replying to{' '}
          {replyToUsernames.map((username) => (
            <span className="ml-1 text-primary-blue first:ml-0">
              @{username}
            </span>
          ))}
        </p>
      )}
      <div
        className={clsx(
          !isExpanded && 'flex items-center justify-between',
          'transition'
        )}
        onClick={handleReplyClick}
      >
        <div className="flex space-x-3">
          <div className="relative h-10 w-10">
            <Image
              src={loggedInUser.profilePictureUrl ?? '/twitter-default-pp.png'}
              className="h-auto w-full rounded-full object-cover"
              alt="photo profile"
              fill
            />
          </div>
          <form
            className={clsx(isExpanded && 'grow')}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextareaAutosize
              className={clsx(
                'resize-none pt-1 text-lg focus:outline-none',
                isExpanded && 'w-full'
              )}
              maxLength={280}
              placeholder="Tweet your reply!"
              {...register('text', { required: true })}
            />
            <div className="flex-1">
              {fields.length > 0 && (
                <MediaAttachments
                  attachments={fields}
                  hasDeleteButton
                  handleDelete={(index: number) => remove(index)}
                />
              )}
            </div>
            {isExpanded && (
              <div
                className={clsx(
                  isExpanded && 'mt-3 flex items-center justify-between'
                )}
              >
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
                  className="!font-bold"
                  variant="blue"
                  text="Reply"
                  type="submit"
                  disabled={!formState.isValid || isLoading}
                  isLoading={isLoading}
                />
              </div>
            )}
          </form>
        </div>
        {!isExpanded && (
          <PillButton className="!font-bold" variant="blue" text="Reply" />
        )}
      </div>
    </>
  )
}

export default TweetYourReply
