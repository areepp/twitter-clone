import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  activeTab: 'tweets' | 'replies' | 'media' | 'likes'
}

export const ProfileNav = ({ activeTab }: Props) => {
  const { query } = useRouter()
  console.log(query)
  return (
    <nav className="flex w-full min-w-[320px] cursor-pointer border-b font-medium text-dark-gray">
      <Link
        href={`/profile/${query.username}`}
        className="grow py-3 text-center hover:bg-gray-100"
      >
        <span
          className={clsx(
            activeTab === 'tweets' &&
              'rounded border-b-4 border-primary-blue py-3 font-bold text-slate-800'
          )}
        >
          Tweets
        </span>
      </Link>
      <Link
        href={`/profile/${query.username}/with_replies`}
        className="grow py-3 text-center hover:bg-gray-100"
      >
        <span
          className={clsx(
            activeTab === 'replies' &&
              'rounded border-b-4 border-primary-blue py-3 font-bold text-slate-800'
          )}
        >
          Replies
        </span>
      </Link>
      <Link
        href={`/profile/${query.username}/media`}
        className="grow py-3 text-center hover:bg-gray-100"
      >
        <span
          className={clsx(
            activeTab === 'media' &&
              'rounded border-b-4 border-primary-blue py-3 font-bold text-slate-800'
          )}
        >
          Media
        </span>
      </Link>
      <Link
        href={`/profile/${query.username}/likes`}
        className="grow py-3 text-center hover:bg-gray-100"
      >
        <span
          className={clsx(
            activeTab === 'likes' &&
              'rounded border-b-4 border-primary-blue py-3 font-bold text-slate-800'
          )}
        >
          Likes
        </span>
      </Link>
    </nav>
  )
}
