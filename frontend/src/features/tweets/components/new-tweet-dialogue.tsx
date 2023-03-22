import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

export const NewTweetDialogue = () => (
  <div className="flex w-full gap-4 border-b px-3 py-2">
    <div>
      <Image
        src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
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
        <button className="rounded-full bg-primary-blue px-4 py-2 font-semibold text-white">
          Tweet
        </button>
      </div>
    </form>
  </div>
)
