import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Client-side Supabase client
export const createClientSupabaseClient = () => {
  return createClientComponentClient();
};

// Server-side Supabase client (without using next/headers)
export const createServerSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
