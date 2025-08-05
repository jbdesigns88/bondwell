import { createClient } from '@supabase/supabase-js'
 
let supabase = null
const EXPO_PUBLIC_SUPABASE_URL="https://wwlfextskovtoabipiud.supabase.co"
const EXPO_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_CThiKS0hJV96ASxcpDiVhA_tffrDCDb"
const supabase_url =  process.env.EXPO_PUBLIC_SUPABASE_URL || EXPO_PUBLIC_SUPABASE_URL
const supabase_anon_key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || EXPO_PUBLIC_SUPABASE_ANON_KEY
 
try {
  if (!supabase_url || !supabase_anon_key) {
    throw new Error('Supabase URL or Anon Key is missing in environment variables.')
  }

  supabase = createClient(supabase_url, supabase_anon_key)
  console.log('connected successfully')
} catch (error) {
  console.error('Failed to create Supabase client:', error.message)
  // Optionally: fallback to mock client or show error screen
}

export { supabase }
