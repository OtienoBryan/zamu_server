-- Add region column to KeyAccounts table
ALTER TABLE KeyAccounts
ADD COLUMN region VARCHAR(191) NULL AFTER description,
ADD INDEX idx_region (region);

-- Update existing records if needed (optional)
-- UPDATE KeyAccounts SET region = '' WHERE region IS NULL;

