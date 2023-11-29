import { cookies } from 'next/headers'
import PasswordPromptDialog from '../components/PasswordPromptDialog'
import LogoutButton from '../components/LogoutButton'
import Image from 'next/image'

import img from '../../public/img.png'

export default function Home() {
  const cookiesStore = cookies()
  const loginCookies = cookiesStore.get(process.env.PASSWORD_COOKIE_NAME!)
  const isLoggedIn = !!loginCookies?.value

  if (!isLoggedIn) {
    return <PasswordPromptDialog />
  }

  return (
    <main className="flex min-h-screen flex-col text-center items-center justify-center gap-12 p-24">
      <h1 className="text-2xl md:text-4xl font-bold">
        {' '}
        This is the secret content
      </h1>
      <Image src={img} alt="Manu" width={200} height={200} />
      <LogoutButton />
    </main>
  )
}
