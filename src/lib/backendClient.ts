import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const FALLBACK_BACKEND_URL = "https://uqlakdaddjxykmvhgvvo.supabase.co";
const FALLBACK_BACKEND_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxbGFrZGFkZGp4eWttdmhndnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwOTQwODYsImV4cCI6MjA5MDY3MDA4Nn0.SjSK5axESoOMf4sf4WZ9ymsaxY7JxlBFh00D5rWHR8c";

const envBackendUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const envBackendKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const backendUrl =
  envBackendUrl && envBackendUrl !== "https://supabase.co"
    ? envBackendUrl
    : FALLBACK_BACKEND_URL;

export const backendAnonKey = envBackendKey || FALLBACK_BACKEND_KEY;

export const backend = createClient<Database>(backendUrl, backendAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});