-- Add type column to KeyAccounts table
-- This column will distinguish between 'client' and 'key_account' types
ALTER TABLE KeyAccounts
ADD COLUMN type ENUM('client', 'key_account') NOT NULL DEFAULT 'key_account' AFTER account_number,
ADD INDEX idx_type (type);

-- Update existing records to be 'key_account' type (if any exist)
UPDATE KeyAccounts SET type = 'key_account' WHERE type IS NULL OR type = '';

