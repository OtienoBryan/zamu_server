-- Create conversion_vehicles table
-- Stores vehicles attached to a conversion_clients record
CREATE TABLE IF NOT EXISTS conversion_vehicles (
  id INT(11) NOT NULL AUTO_INCREMENT,
  conversion_client_id INT(11) NOT NULL,
  registration_number VARCHAR(50) NOT NULL,
  vin_serial_number VARCHAR(100) NULL,
  vehicle_type VARCHAR(50) NULL,
  year INT(4) NULL,
  make VARCHAR(100) NULL,
  model VARCHAR(255) NOT NULL,
  trim_option VARCHAR(100) NULL,
  transmission_type VARCHAR(50) NULL,
  driven_wheel VARCHAR(50) NULL,
  engine VARCHAR(100) NULL,
  current_odo INT(11) NULL,
  odo_unit ENUM('KM', 'Miles') NOT NULL DEFAULT 'KM',
  color VARCHAR(50) NULL,
  unit_number VARCHAR(100) NULL,
  notes TEXT NULL,
  photo_url VARCHAR(500) NULL,
  photo_urls TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_conversion_client_id (conversion_client_id),
  INDEX idx_registration_number (registration_number),
  FOREIGN KEY (conversion_client_id) REFERENCES conversion_clients(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
