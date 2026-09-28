-- Add image_url field to Parts table
ALTER TABLE Parts
  ADD COLUMN image_url VARCHAR(500) NULL AFTER notes;
