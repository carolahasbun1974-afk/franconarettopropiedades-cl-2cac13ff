
CREATE TABLE public.property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view property images"
  ON public.property_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert property images"
  ON public.property_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
  );

CREATE POLICY "Authenticated users can delete property images"
  ON public.property_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.properties WHERE id = property_id AND user_id = auth.uid())
  );

-- Migrate existing image_url data to the new table
INSERT INTO public.property_images (property_id, image_url, position)
SELECT id, image_url, 0 FROM public.properties WHERE image_url IS NOT NULL;
