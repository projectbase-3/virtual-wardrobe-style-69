-- Create table for storing 3D shirt designs
CREATE TABLE public.shirt_designs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  colors TEXT[] DEFAULT ARRAY['#ffffff', '#000000'],
  price INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.shirt_designs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is implemented yet)
CREATE POLICY "Shirt designs are viewable by everyone" 
ON public.shirt_designs 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create shirt designs" 
ON public.shirt_designs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update shirt designs" 
ON public.shirt_designs 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete shirt designs" 
ON public.shirt_designs 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_shirt_designs_updated_at
BEFORE UPDATE ON public.shirt_designs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();