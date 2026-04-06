-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  language TEXT DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_provider TEXT DEFAULT 'clickpay',
  payment_id TEXT,
  payment_status TEXT DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  delivery_status TEXT DEFAULT 'pending'
    CHECK (delivery_status IN ('pending', 'generating', 'sent', 'failed')),
  download_token TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  download_expires_at TIMESTAMPTZ DEFAULT (now() + interval '72 hours'),
  download_count INT DEFAULT 0,
  max_downloads INT DEFAULT 3,
  personalized_pdf_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_orders_download_token ON orders(download_token);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON orders(payment_id);

-- 2. Create site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  book_price DECIMAL(10,2) DEFAULT 9.99,
  currency TEXT DEFAULT 'USD',
  max_downloads INT DEFAULT 3,
  download_link_hours INT DEFAULT 72,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings if they don't exist
INSERT INTO site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- 3. Row Level Security (RLS) setup
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- By default, no public access policies means it's secure. Admin API uses service_role key to bypass RLS.

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
-- Allow public read access to settings
CREATE POLICY "Anyone can read settings" ON site_settings
  FOR SELECT USING (true);
