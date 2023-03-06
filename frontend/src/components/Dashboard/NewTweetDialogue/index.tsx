import {
  PhotoIcon,
  GifIcon,
  FaceSmileIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const NewTweetDialogue = () => (
  <div className="flex w-full gap-4 border-b px-3 py-2">
    <div className="h-12 w-12 rounded-full bg-slate-500" />
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

export default NewTweetDialogue
