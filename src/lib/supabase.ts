import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("ATENCIÓN: Supabase URL o KEY no encontradas. Revisa .env.local");
}

// Inicializa y exporta el cliente único de base de datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
