import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:8000';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_anon_key';

// Browser client (limited by RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server/Admin client (full access — use ONLY in API routes, never in client components)
export function getSupabaseAdmin() {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_service_key';
  return createClient(supabaseUrl, supabaseServiceKey);
}
