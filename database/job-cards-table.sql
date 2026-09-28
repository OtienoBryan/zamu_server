-- Create job_cards + job_card_items tables
-- A job card is a workshop work order: a client + vehicle, a list of parts/labor
-- line items, and billing (VAT, discount, other charges).
CREATE TABLE IF NOT EXISTS job_cards (
  id INT(11) NOT NULL AUTO_INCREMENT,
  conversion_client_id INT(11) NULL,
  conversion_vehicle_id INT(11) NULL,
  status ENUM('open', 'in_progress', 'completed', 'closed') NOT NULL DEFAULT 'open',
  vat_enabled TINYINT(1) NOT NULL DEFAULT 0,
  vat_rate DECIMAL(5, 2) NOT NULL DEFAULT 16.00,
  discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  other_charges DECIMAL(10, 2) NOT NULL DEFAULT 0,
  amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_conversion_client_id (conversion_client_id),
  INDEX idx_conversion_vehicle_id (conversion_vehicle_id),
  INDEX idx_status (status),
  FOREIGN KEY (conversion_client_id) REFERENCES conversion_clients(id) ON DELETE SET NULL,
  FOREIGN KEY (conversion_vehicle_id) REFERENCES conversion_vehicles(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS job_card_items (
  id INT(11) NOT NULL AUTO_INCREMENT,
  job_card_id INT(11) NOT NULL,
  item_type ENUM('part', 'labor') NOT NULL,
  part_id INT(11) NULL,
  service_id INT(11) NULL,
  assigned_staff_id INT(11) NULL,
  assigned_at DATETIME NULL,
  description VARCHAR(255) NOT NULL,
  cost DECIMAL(10, 2) NULL DEFAULT 0,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  quantity DECIMAL(10, 2) NOT NULL DEFAULT 1,
  taxable TINYINT(1) NOT NULL DEFAULT 1,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_job_card_id (job_card_id),
  INDEX idx_part_id (part_id),
  INDEX idx_service_id (service_id),
  INDEX idx_assigned_staff_id (assigned_staff_id),
  FOREIGN KEY (job_card_id) REFERENCES job_cards(id) ON DELETE CASCADE,
  FOREIGN KEY (part_id) REFERENCES Parts(id) ON DELETE SET NULL,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  FOREIGN KEY (assigned_staff_id) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
