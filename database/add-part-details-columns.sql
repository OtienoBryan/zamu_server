-- Add new detail columns to Parts table
ALTER TABLE Parts
  ADD COLUMN IF NOT EXISTS unit           VARCHAR(50)     NULL          AFTER location,
  ADD COLUMN IF NOT EXISTS purchase_cost  DECIMAL(10,2)   NULL          AFTER unit,
  ADD COLUMN IF NOT EXISTS selling_price  DECIMAL(10,2)   NULL          AFTER purchase_cost,
  ADD COLUMN IF NOT EXISTS status         VARCHAR(50)     NULL DEFAULT 'active' AFTER selling_price,
  ADD COLUMN IF NOT EXISTS notes          TEXT            NULL          AFTER status;

-- Index on status for filtered queries
ALTER TABLE Parts
  ADD INDEX IF NOT EXISTS idx_status (status);
