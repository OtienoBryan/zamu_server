-- Add Tank Year of Production, Tank Serial Number and Kit Serial Number fields to conversion_vehicles table
ALTER TABLE conversion_vehicles
ADD COLUMN tank_year_of_production INT NULL AFTER tank_capacity,
ADD COLUMN tank_serial_number VARCHAR(100) NULL AFTER tank_year_of_production,
ADD COLUMN kit_serial_number VARCHAR(100) NULL AFTER tank_serial_number;
