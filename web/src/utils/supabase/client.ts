import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/api/supabase`
    }
    // Fallback for SSR
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return `${process.env.NEXT_PUBLIC_SITE_URL}/api/supabase`
    }
    if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}/api/supabase`
    }
    return 'http://localhost:3000/api/supabase'
  }

  return createBrowserClient(
    getUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
