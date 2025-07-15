-- Add columns to support 3D models in shirt_designs table
ALTER TABLE public.shirt_designs 
ADD COLUMN model_url TEXT,
ADD COLUMN model_type TEXT CHECK (model_type IN ('2d', '3d')),
ADD COLUMN is_3d_model BOOLEAN DEFAULT FALSE;

-- Update existing records to be 2D models
UPDATE public.shirt_designs 
SET model_type = '2d', is_3d_model = FALSE 
WHERE model_type IS NULL;

-- Create storage bucket for 3D models
INSERT INTO storage.buckets (id, name, public) 
VALUES ('3d-models', '3d-models', true);

-- Create policies for 3D model uploads
CREATE POLICY "3D models are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = '3d-models');

CREATE POLICY "Users can upload 3D models" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = '3d-models');

CREATE POLICY "Users can update their own 3D models" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = '3d-models');

CREATE POLICY "Users can delete their own 3D models" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = '3d-models');