import type { Context } from "hono";
import supabase from "../utils/supabase.js";

export async function Register(c: Context) {
  const { email, password } = await c.req.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  return c.json({ message: "User registered", data });
}
export async function Login(c: Context) {
  const { email, password } = await c.req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return c.json({ error: error.message }, 401);
  }

  return c.json({
    message: "Logged in",
    session: data.session,
    user: data.user,
  });
}
export async function Logout(c: Context) {
  c.text("signout");
}
