-- Add tax_pin column to conversion_clients table
-- Used to store the KRA Tax PIN for company-category clients
ALTER TABLE conversion_clients
ADD COLUMN tax_pin VARCHAR(50) NULL AFTER category;
