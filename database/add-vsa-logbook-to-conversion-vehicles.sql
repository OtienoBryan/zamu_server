-- Add VSA and Logbook document upload fields to conversion_vehicles table
ALTER TABLE conversion_vehicles
ADD COLUMN vsa_url VARCHAR(500) NULL AFTER photo_urls,
ADD COLUMN logbook_url VARCHAR(500) NULL AFTER vsa_url;
