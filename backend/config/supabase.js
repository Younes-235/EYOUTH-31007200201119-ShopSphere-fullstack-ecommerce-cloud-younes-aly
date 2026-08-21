const { createClient } = require('@supabase/supabase-js');

let supabase = null;

if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
} else {
  console.warn('⚠️ Supabase Storage not configured — SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY missing.');
}

module.exports = supabase;