-- Physical LPG tanks at each station. A station's stock is the sum of its tanks'
-- current_quantity; Stations.lpgQuantity is kept in sync as a mirror of that sum.
CREATE TABLE IF NOT EXISTS station_tanks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  station_id INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  capacity DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  current_quantity DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  status ENUM('active', 'inactive', 'maintenance') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_station_id (station_id),
  FOREIGN KEY (station_id) REFERENCES Stations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
