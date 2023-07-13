import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  attachments: MediaAttachment[]
  className?: string
  hasDeleteButton?: boolean
  handleDelete?: (id: number) => void
}

const MediaAttachments = ({
  attachments,
  className,
  hasDeleteButton,
  handleDelete,
}: Props) => {
  const totalAttachments = attachments.length

  return (
    <div
      className={clsx(
        'h-[50vw] max-h-[285px]',
        className,
        totalAttachments > 1 && 'grid grid-cols-2 gap-px'
      )}
    >
      {attachments.map((media, index) => (
        <div
          key={media.url}
          className={clsx(
            'relative h-full w-full overflow-hidden',
            totalAttachments === 1 && 'rounded-2xl',
            totalAttachments === 2 && 'first:rounded-l-2xl last:rounded-r-2xl',
            totalAttachments === 3 &&
              'first:row-span-2 first:rounded-l-2xl last:rounded-br-2xl even:rounded-tr-2xl',
            totalAttachments === 4 &&
              'first:rounded-tl-2xl last:rounded-br-2xl [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(3)]:rounded-bl-2xl'
          )}
        >
          <Image
            src={media.url}
            fill={true}
            alt="tweet image"
            className="object-cover"
          />
          {hasDeleteButton && (
            <div
              className="absolute right-3 top-3 z-30 cursor-pointer rounded-full bg-black/50 p-1"
              onClick={() => handleDelete?.(index)}
            >
              <XMarkIcon className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MediaAttachments
