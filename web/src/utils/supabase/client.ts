import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Always use the hardcoded absolute proxy URL to prevent Invalid supabaseUrl errors
  const url = 'https://social-media-saas-plum.vercel.app/api/supabase'
  return createBrowserClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
