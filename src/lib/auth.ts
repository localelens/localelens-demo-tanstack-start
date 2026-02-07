import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie, deleteCookie } from '@tanstack/react-start/server'
import { redirect } from '@tanstack/react-router'

const AUTH_COOKIE = 'demo_auth'

/**
 * Mock auth: Check if user is "logged in" via cookie.
 * In a real app, this would verify a session token.
 */
export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
  const auth = await getCookie(AUTH_COOKIE)
  if (!auth) return null
  return { name: 'Demo User', email: 'demo@localelens.ai' }
})

/**
 * Mock login: Set auth cookie.
 */
export const login = createServerFn({ method: 'POST' }).handler(async () => {
  await setCookie(AUTH_COOKIE, 'authenticated', {
    maxAge: 60 * 60, // 1 hour
    path: '/',
    sameSite: 'lax',
  })
  return { ok: true }
})

/**
 * Mock logout: Clear auth cookie.
 */
export const logout = createServerFn({ method: 'POST' }).handler(async () => {
  await deleteCookie(AUTH_COOKIE)
  return { ok: true }
})

/**
 * Require authentication for a route.
 * Use in route beforeLoad to protect routes.
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw redirect({ to: '/' })
  }
  return user
}
