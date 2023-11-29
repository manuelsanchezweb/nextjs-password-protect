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
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      This is secret content actually. You knew the password!!!
      <Image src={img} alt="Manu" width={300} height={300} />
      <LogoutButton />
    </main>
  )
}
