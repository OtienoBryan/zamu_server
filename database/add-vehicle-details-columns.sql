-- Add detailed vehicle information columns to Vehicles table
ALTER TABLE Vehicles
ADD COLUMN vin_serial_number VARCHAR(100) NULL AFTER registration_number,
ADD COLUMN vehicle_type VARCHAR(50) NULL AFTER vin_serial_number,
ADD COLUMN year INT NULL AFTER vehicle_type,
ADD COLUMN make VARCHAR(100) NULL AFTER year,
ADD COLUMN trim_option VARCHAR(100) NULL AFTER model,
ADD COLUMN transmission_type VARCHAR(50) NULL AFTER trim_option,
ADD COLUMN driven_wheel VARCHAR(50) NULL AFTER transmission_type,
ADD COLUMN current_odo INT NULL AFTER driven_wheel,
ADD COLUMN color VARCHAR(50) NULL AFTER current_odo,
ADD INDEX idx_vin (vin_serial_number),
ADD INDEX idx_vehicle_type (vehicle_type),
ADD INDEX idx_make (make);

