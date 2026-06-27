
-- Remove permissive public SELECT and the temporary one created earlier
DROP POLICY IF EXISTS "Properties are viewable by everyone" ON public.properties;
DROP POLICY IF EXISTS "Public can view properties" ON public.properties;
DROP POLICY IF EXISTS "Anyone can view properties" ON public.properties;
DROP POLICY IF EXISTS "Public catalog read" ON public.properties;
DROP POLICY IF EXISTS "Owners can view their properties" ON public.properties;

-- Owners can read their own rows directly (admin panel use)
CREATE POLICY "Owners can view their properties"
  ON public.properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Public catalog view that omits user_id; runs with definer rights to bypass base RLS
DROP VIEW IF EXISTS public.properties_public;
CREATE VIEW public.properties_public
WITH (security_invoker = off) AS
SELECT id, title, description, price, location, property_type, hectares, image_url, created_at, updated_at
FROM public.properties;

GRANT SELECT ON public.properties_public TO anon, authenticated;
