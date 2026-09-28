-- Reference for the existing inspections table (vehicle inspections assigned to a technician)
CREATE TABLE IF NOT EXISTS inspections (
  id INT(11) NOT NULL AUTO_INCREMENT,
  conversion_vehicle_id INT(11) NOT NULL,
  conversion_client_id INT(11) NOT NULL,
  assigned_staff_id INT(11) NOT NULL,
  inspection_date DATE NOT NULL,
  status ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',
  summary TEXT NULL,
  checklist LONGTEXT NULL CHECK (json_valid(checklist)),
  issues_found INT(11) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_inspections_vehicle (conversion_vehicle_id),
  KEY idx_inspections_client (conversion_client_id),
  KEY idx_inspections_staff (assigned_staff_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
