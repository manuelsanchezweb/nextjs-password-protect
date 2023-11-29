'use client'

import React, { useState, FormEvent, useCallback } from 'react'
import { IconEyeOff, IconEyeOn } from './Icons'

/**
 * This component renders a dialog for password input.
 * @param onSubmit - A callback function to handle the form submission.
 */
const PasswordPromptDialog: React.FC = () => {
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false) // New state for toggling visibility
  const [passwordIncorrect, setPasswordIncorrect] = useState(false)
  const [loading, setLoading] = useState(false)

  /**
   * Handles the form submission.
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true)
      const request = await fetch(`/api`, {
        body: JSON.stringify({ password }),
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      })

      if (request.status !== 200)
        return setPasswordIncorrect(true), setLoading(false)
      else window.location.reload()
    }

    onSubmit(e)
  }

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(!passwordVisible)
  }, [passwordVisible])

  return (
    <div className="min-h-screen grid place-content-center">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-2xl md:text-4xl font-bold">
          Nextjs 14 Template Password Protected
        </h1>
      </div>

      <form
        className="flex flex-col items-center gap-4 my-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="password">Insert Password:</label>
        <div className="relative">
          <input
            className="p-2"
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-1 flex justify-center items-center text-sm leading-5 text-black"
            onClick={() => togglePasswordVisibility()}
          >
            {passwordVisible ? <IconEyeOn /> : <IconEyeOff />}
          </button>
        </div>
        <button
          disabled={loading}
          className={`border border-white hover:bg-gray-200 focus-visible:bg-gray-200 hover:text-black focus-visible:text-black rounded-md px-4 py-2
          ${loading && 'pointer-events-none opacity-50'}
          `}
          type="submit"
        >
          Submit
        </button>
      </form>
      {passwordIncorrect && (
        <p className="text-red-500 text-center">
          Password incorrect. <p className="italic">Try writing msweb.</p>
        </p>
      )}
    </div>
  )
}

export default PasswordPromptDialog
