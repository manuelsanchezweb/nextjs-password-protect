import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const password = request.nextUrl.searchParams.get(
    process.env.SEARCH_QUERY_NAME!
  )
  const hasCookie = request.cookies.has(process.env.PASSWORD_COOKIE_NAME!)
  const url = request.nextUrl.clone()
  const response = NextResponse.redirect(url)

  if (password === process.env.PAGE_PASSWORD && !hasCookie) {
    response.cookies.set(`${process.env.PASSWORD_COOKIE_NAME}`, 'true')
    return response
  }
}
