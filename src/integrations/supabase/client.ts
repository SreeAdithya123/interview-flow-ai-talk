// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://udzrthlergbhrpzwqokc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkenJ0aGxlcmdiaHJwendxb2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODU5MDUsImV4cCI6MjA2NTY2MTkwNX0.d-fmzKrlnaUVPI2Qu6j1iA2AX4YZN8dQ2w4L_lPlHO0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);