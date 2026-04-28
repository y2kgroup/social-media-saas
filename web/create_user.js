const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function signUp() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@socialsaas.com',
    password: 'password123',
  })
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success:', data)
  }
}

signUp()
