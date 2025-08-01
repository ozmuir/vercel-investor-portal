import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VUE_APP_SUPABASE_URL;
if (!SUPABASE_URL) throw new Error("VUE_APP_SUPABASE_URL not set.");

const SUPABASE_ANON_KEY = process.env.VUE_APP_SUPABASE_ANON_KEY;
if (!SUPABASE_ANON_KEY) throw new Error("VUE_APP_SUPABASE_ANON_KEY not set.");

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
