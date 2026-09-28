-- Create appointments table
-- Generic calendar appointments (not tied to a vehicle conversion request),
-- optionally linked to a conversion_clients record.
CREATE TABLE IF NOT EXISTS appointments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  location VARCHAR(255) NULL,
  appointment_date DATETIME NOT NULL,
  end_date DATETIME NULL,
  conversion_client_id INT(11) NULL,
  conversion_vehicle_id INT(11) NULL,
  status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
  created_by INT(11) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_appointment_date (appointment_date),
  INDEX idx_conversion_client_id (conversion_client_id),
  INDEX idx_conversion_vehicle_id (conversion_vehicle_id),
  INDEX idx_status (status),
  FOREIGN KEY (conversion_client_id) REFERENCES conversion_clients(id) ON DELETE SET NULL,
  FOREIGN KEY (conversion_vehicle_id) REFERENCES conversion_vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
