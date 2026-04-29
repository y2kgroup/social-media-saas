import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const isServer = typeof window === 'undefined'
  // During SSR, window is undefined and we can't use window.location.origin.
  // The browser client doesn't make fetches during SSR, so a dummy URL is safe.
  const url = isServer ? 'https://social-media-saas-plum.vercel.app/api/supabase' : `${window.location.origin}/api/supabase`
  return createBrowserClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
