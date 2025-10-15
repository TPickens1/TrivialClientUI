import { createClient } from '@supabase/supabase-js'

// 🔒 Hard-locked Supabase connection (bypasses Bolt’s internal DB)
const SUPABASE_URL = 'https://yeblzfjsilzcnginmoze.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYmx6ZmpzaWx6Y25naW5tb3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNDMxNzgsImV4cCI6MjA3NTcxOTE3OH0.gt1BX-JTrzSdwgDJtM8c16dRp_XZ1d3cNWdApy-plFs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: { schema: 'public' },
})
