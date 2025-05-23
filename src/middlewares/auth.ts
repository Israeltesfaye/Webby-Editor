import type { MiddlewareHandler } from 'hono'
import supabase from '../utils/supabase.js'
import { setAuthCookies } from '../utils/cookie.js'
import { getCookie } from 'hono/cookie'
import type { Session } from '@supabase/supabase-js'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  let accessToken = await getCookie(c, 'sb-access-token')
  const refreshToken = await getCookie(c, 'sb-refresh-token')

  if (!accessToken && !refreshToken) {
    return c.json({ error: 'Unauthorized: No tokens' }, 401)
  }

  let { data: userData, error } = await supabase.auth.getUser(accessToken!)

  if (error && refreshToken) {
    const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    })

    if (refreshError || !refreshed.session) {
      return c.json({ error: 'Session expired or invalid refresh token' }, 401)
    }

    await setAuthCookies(c, refreshed.session as Session)
    accessToken = refreshed.session.access_token
    userData = { user: refreshed.user }
  }

  if (!userData?.user) {
    return c.json({ error: 'Unauthorized: No user found' }, 401)
  }

  c.set('user', userData.user)
  await next()
}
