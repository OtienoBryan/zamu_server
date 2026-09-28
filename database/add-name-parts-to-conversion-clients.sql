-- Split the single "name" field into structured First / Middle / Surname parts for conversion_clients.
-- "name" is kept as the composed full/display name (still required, still used everywhere else);
-- these new columns are only populated for individual clients, and are nullable for company clients
-- and pre-existing rows created before this change.
ALTER TABLE conversion_clients
ADD COLUMN first_name VARCHAR(100) NULL AFTER name,
ADD COLUMN middle_name VARCHAR(100) NULL AFTER first_name,
ADD COLUMN surname VARCHAR(100) NULL AFTER middle_name;
