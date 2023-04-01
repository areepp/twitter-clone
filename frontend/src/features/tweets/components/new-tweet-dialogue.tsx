import { PillButton } from '@/components/elements'
import { useUser } from '@/features/auth'
import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export const NewTweetDialogue = () => {
  const { data } = useUser()

  return (
    <div className="flex w-full gap-4 border-b px-3 py-2">
      <div>
        <Image
          src={
            data.profilePicture === ''
              ? '/twitter-default-pp.png'
              : data.profilePicture
          }
          width="48"
          height="48"
          className="rounded-full"
          alt="photo profile"
        />
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
