CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contacts TO anon;
GRANT INSERT ON public.contacts TO authenticated;
GRANT ALL ON public.contacts TO service_role;

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policy
    WHERE polrelid = 'public.contacts'::regclass
      AND polname = 'Anyone can submit contact messages'
  ) THEN
    CREATE POLICY "Anyone can submit contact messages"
    ON public.contacts
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);
  END IF;
END;
$$;