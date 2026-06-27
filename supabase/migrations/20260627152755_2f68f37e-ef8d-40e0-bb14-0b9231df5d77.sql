
-- Roll back the previous security-definer view approach
DROP VIEW IF EXISTS public.properties_public;
DROP POLICY IF EXISTS "Owners can view their properties" ON public.properties;

-- Public catalog read stays open for the existing app, but column-level grants
-- ensure the internal owner UUID is never exposed to anon/authenticated clients.
CREATE POLICY "Public catalog read"
  ON public.properties FOR SELECT
  TO anon, authenticated
  USING (true);

-- Reset column privileges: revoke broad SELECT, then grant only non-sensitive columns.
REVOKE SELECT ON public.properties FROM anon;
REVOKE SELECT ON public.properties FROM authenticated;

GRANT SELECT (id, title, description, price, location, property_type, hectares, image_url, created_at, updated_at)
  ON public.properties TO anon, authenticated;

-- service_role keeps full access for admin/edge-function flows.
GRANT ALL ON public.properties TO service_role;
