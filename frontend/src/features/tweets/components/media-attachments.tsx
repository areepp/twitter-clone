import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  attachments: MediaAttachment[]
  className?: string
}

const MediaAttachments = ({ attachments, className }: Props) => {
  const totalAttachments = attachments.length

  return (
    <div
      className={clsx(
        'h-[50vw] max-h-[285px]',
        className,
        totalAttachments > 1 && 'grid grid-cols-2 gap-px'
      )}
    >
      {attachments.map((media) => (
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
        </div>
      ))}
    </div>
  )
}

export default MediaAttachments
