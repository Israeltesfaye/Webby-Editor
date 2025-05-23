import type { Context } from 'hono'
import type { Session } from '@supabase/supabase-js'
import { deleteCookie, setCookie } from 'hono/cookie'

export const setAuthCookies =async (c: Context, session: Session) => {
 await setCookie(c,'sb-access-token', session.access_token, {
    httpOnly: process.env.NODE_ENV == "production" && true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: session.expires_in,
  })

  await setCookie(c,'sb-refresh-token', session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export const clearAuthCookies = async (c: Context) => {
    await deleteCookie(c, 'sb-access-token', { path: '/' })
    await deleteCookie(c, 'sb-refresh-token', { path: '/' })
  }
