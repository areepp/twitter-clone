'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { AuthInput, useLogin } from '@/features/auth'
import {
  Spinner,
  GoogleIcon,
  TwitterIcon,
  TextInput,
} from '@/components/elements'

const Login = () => {
  const router = useRouter()

  const { mutateAsync, isLoading } = useLogin()

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInput>({ resolver: zodResolver(AuthInput) })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [passwordInputType, setPasswordInputType] = useState<
    'text' | 'password'
  >('password')

  const signInWithEmailAndPassword: SubmitHandler<AuthInput> = async (data) => {
    try {
      setErrorMessage(null)
      await mutateAsync(data)
      router.push('/')
    } catch (err) {
      setErrorMessage(
        err.response.data.message ?? 'something wrong occured. Try again later'
      )
    }
  }

  const signInWithGoogle = () => {
    window.open(process.env.NEXT_PUBLIC_API_URL + '/auth/google', '_self')
  }

  const togglePasswordInputType = () =>
    setPasswordInputType((prev) => (prev === 'password' ? 'text' : 'password'))

  return (
    <main className="grid h-screen w-full lg:grid-cols-[1fr,45vw]">
      <div className="relative hidden lg:block">
        <Image
          className="object-cover"
          src="/twitter-banner.png"
          alt="twitter auth image"
          fill
        />
      </div>

      <div className="mx-auto flex h-full flex-col items-center justify-between p-6 lg:mx-0 lg:items-start lg:py-32">
        <TwitterIcon className="lg:h-12 lg:w-12 lg:self-start" />
        <h1 className="max-w-sm text-3xl font-bold lg:max-w-xl lg:text-4xl">
          See what's happening in the world right now.
        </h1>
        <div className="flex w-full max-w-sm flex-col items-center justify-center gap-3">
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border px-6 py-2 font-semibold"
            onClick={signInWithGoogle}
          >
            <GoogleIcon /> <span>Sign in with Google</span>
          </button>
          <div className="grid w-full grid-cols-[1fr,auto,1fr] items-center gap-2">
            <span className="border-b" />
            <span>or</span>
            <span className="border-b" />
          </div>
          <form
            onSubmit={handleSubmit(signInWithEmailAndPassword)}
            className="flex w-full flex-col gap-3"
          >
            <fieldset className="flex flex-col gap-1">
              <TextInput placeholder="email" name="email" />
              {errors.email && (
                <span className="text-xs">{errors.email.message}</span>
              )}
            </fieldset>
            <fieldset className="relative flex flex-col gap-1">
              <TextInput placeholder="password" name="password" />
              {passwordInputType === 'password' ? (
                <EyeIcon
                  className="absolute right-4 top-4 h-5 w-5 hover:cursor-pointer"
                  onClick={togglePasswordInputType}
                />
              ) : (
                <EyeSlashIcon
                  className="absolute right-4 top-4 h-5 w-5 hover:cursor-pointer"
                  onClick={togglePasswordInputType}
                />
              )}
              {errors.password && (
                <span className="text-xs">{errors.password.message}</span>
              )}
            </fieldset>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-full border bg-gray-900 px-6 py-2 font-semibold text-white"
            >
              {isLoading ? <Spinner /> : 'Log in'}
            </button>
            {errorMessage && <span className="text-xs">{errorMessage}</span>}
          </form>
          <p className="self-start">
            Don't have an account?{' '}
            <Link className="text-primary-blue" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Login
