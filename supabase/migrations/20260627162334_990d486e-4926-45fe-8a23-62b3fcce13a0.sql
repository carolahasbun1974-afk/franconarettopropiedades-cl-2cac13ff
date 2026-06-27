
GRANT SELECT (id, title, description, price, location, property_type, hectares, image_url, created_at, updated_at) ON public.properties TO anon;
GRANT SELECT (id, title, description, price, location, property_type, hectares, image_url, created_at, updated_at) ON public.properties TO authenticated;
GRANT SELECT (user_id), INSERT, UPDATE, DELETE ON public.properties TO authenticated;
GRANT ALL ON public.properties TO service_role;
