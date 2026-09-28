-- Add engine capacity and engine code fields to conversion_vehicles
ALTER TABLE conversion_vehicles
ADD COLUMN engine_capacity VARCHAR(50) NULL AFTER engine,
ADD COLUMN engine_code VARCHAR(50) NULL AFTER engine_capacity;
