-- Add Tank Capacity and Telemetry Status fields to conversion_vehicles table
ALTER TABLE conversion_vehicles
ADD COLUMN tank_capacity VARCHAR(50) NULL AFTER unit_number,
ADD COLUMN telemetry_status VARCHAR(50) NULL AFTER tank_capacity;
