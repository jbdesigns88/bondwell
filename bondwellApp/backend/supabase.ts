import { createClient,SupabaseClient } from '@supabase/supabase-js';
 
 
let supabase:SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL or Key is not defined in the environment variables.');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created successfully.');
  }
  return supabase;
}
