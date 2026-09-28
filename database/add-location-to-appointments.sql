-- Add location field to appointments table
ALTER TABLE appointments
  ADD COLUMN location VARCHAR(255) NULL AFTER description;
