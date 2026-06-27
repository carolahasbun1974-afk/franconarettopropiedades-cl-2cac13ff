DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contacts;

CREATE POLICY "Public can submit valid contact messages"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) > 0
  AND length(btrim(email)) > 3
  AND position('@' in email) > 1
  AND length(btrim(message)) > 0
  AND (phone IS NULL OR length(phone) <= 50)
);