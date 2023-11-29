'use server'

import { cookies } from 'next/headers'
import React from 'react'

export const handleLogout = async () => {
  cookies().delete(process.env.PASSWORD_COOKIE_NAME!)

  return new Response(null, { status: 200 })
}

const LogoutButton = () => {
  return (
    <form action={handleLogout}>
      <button
        className={`border border-white hover:bg-gray-200 focus-visible:bg-gray-200 hover:text-black focus-visible:text-black rounded-md px-4 py-2`}
      >
        Logout
      </button>
    </form>
  )
}

export default LogoutButton
