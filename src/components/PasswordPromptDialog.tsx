'use client'

import React, { useState, FormEvent } from 'react'

/**
 * This component renders a dialog for password input.
 * @param onSubmit - A callback function to handle the form submission.
 */
const PasswordPromptDialog: React.FC = () => {
  const [password, setPassword] = useState('')
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

  return (
    <div className="min-h-screen grid place-content-center">
      <form
        className="flex flex-col items-center gap-4 my-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="password">Insert Password:</label>
        <input
          className="p-2"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
        <p className="text-red-500">Password incorrect, please try again.</p>
      )}
    </div>
  )
}

export default PasswordPromptDialog
