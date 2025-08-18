"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseClient = getSupabaseClient;
const supabase_js_1 = require("@supabase/supabase-js");
let supabase = null;
function getSupabaseClient() {
    if (!supabase) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL or Key is not defined in the environment variables.');
        }
        supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        console.log('Supabase client created successfully.');
    }
    return supabase;
}
