import { PillButton } from '@/components/elements'
import { useGetUserQueryData } from '@/features/auth'
import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export const NewTweetDialogue = () => {
  const user = useGetUserQueryData()

  return (
    <div className="flex w-full gap-4 border-b px-3 py-2">
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
      <form className="grow">
        <input
          className="w-full py-3 text-xl focus:outline-none"
          type="text"
          placeholder="What's happening?"
        />

        <div className="flex items-center justify-between">
          <fieldset className="flex gap-4">
            <PhotoIcon className="h-5 w-5 text-primary-blue" />
            <GifIcon className="h-5 w-5 text-primary-blue" />
            <FaceSmileIcon className="h-5 w-5 text-primary-blue" />
            <MapPinIcon className="h-5 w-5 text-primary-blue" />
          </fieldset>
          <PillButton text="Tweet" variant="blue" />
        </div>
      </form>
    </div>
  )
}
