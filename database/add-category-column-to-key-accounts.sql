-- Add category column to KeyAccounts table
-- This column distinguishes whether the account is an 'individual' or a 'company'
ALTER TABLE KeyAccounts
ADD COLUMN category ENUM('individual', 'company') NOT NULL DEFAULT 'individual' AFTER type,
ADD INDEX idx_category (category);

-- Default existing records to 'individual' (if any exist)
UPDATE KeyAccounts SET category = 'individual' WHERE category IS NULL OR category = '';
