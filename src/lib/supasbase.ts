import { createClient } from "@supabase/supabase-js";

// ✅ Your Supabase credentials
const supabaseUrl = "https://mqulsegzijgrazakjhnv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xdWxzZWd6aWpncmF6YWtqaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3ODgzODgsImV4cCI6MjA2NTM2NDM4OH0.HgQVeYsDZ2sS_PMqIJEzeVUfJfh3UTSZ2YSRCbbRI6s";

// ✅ Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
