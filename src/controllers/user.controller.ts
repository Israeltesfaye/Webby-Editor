import type { Context } from "hono";
import supabase from "../utils/supabase.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.js";

export async function Register(c: Context) {
  const { email, password } = await c.req.json()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return c.json({ error: error.message }, 400)
  }

  return c.json({ message: 'User registered', user: data.user })
}
export async function Login(c: Context) {
  const { email, password } = await c.req.json()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    return c.json({ error: error?.message || 'Login failed' }, 401)
  }

  await setAuthCookies(c, data.session)
  return c.json({ message: 'Logged in', user: data.user })
}
export async function Logout(c: Context) {
  await clearAuthCookies(c)
  return c.json({ message: 'Logged out' })
}
