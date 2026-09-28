-- Create conversion_clients table
-- Stores clients for the conversion/workshop business (separate from gas-distribution Clients and KeyAccounts)
CREATE TABLE IF NOT EXISTS conversion_clients (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NULL,
  contact VARCHAR(50) NOT NULL,
  address TEXT NULL,
  region VARCHAR(191) NULL,
  category ENUM('individual', 'company') NOT NULL DEFAULT 'individual',
  tax_pin VARCHAR(50) NULL,
  is_active INT(1) DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_name (name),
  INDEX idx_contact (contact),
  INDEX idx_category (category),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
