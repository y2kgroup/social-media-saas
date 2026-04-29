import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const isServer = typeof window === 'undefined'
  return createBrowserClient(
    isServer ? process.env.NEXT_PUBLIC_SUPABASE_URL! : `${window.location.origin}/api/supabase`,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
