-- Add labels field to conversion_vehicles table (JSON-encoded array of free-text labels)
ALTER TABLE conversion_vehicles
ADD COLUMN labels TEXT NULL AFTER logbook_url;
