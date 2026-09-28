-- Add a generic Documents field (JSON array of {title, url}) to conversion_vehicles table
-- so vehicles are no longer limited to just VSA and Logbook uploads.
ALTER TABLE conversion_vehicles
ADD COLUMN documents TEXT NULL AFTER logbook_url;
