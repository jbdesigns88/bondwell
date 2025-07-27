import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
let supabase = null

try{
    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL or Key is not defined in the environment variables.');
    }
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created successfully.');
}

catch (error) {
  console.error('Error creating Supabase client:', error);
}

export default supabase;