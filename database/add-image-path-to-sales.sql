-- Add image_path field to Sales table
ALTER TABLE sales
  ADD COLUMN image_path VARCHAR(500) NULL AFTER notes;
