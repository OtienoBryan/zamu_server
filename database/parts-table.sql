-- Create Parts table
CREATE TABLE IF NOT EXISTS Parts (
  id INT(11) NOT NULL AUTO_INCREMENT,
  part_number VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  category VARCHAR(100) NULL,
  manufacturer VARCHAR(255) NULL,
  unit_price DECIMAL(10, 2) NULL,
  unit_price_usd DECIMAL(10, 2) NULL,
  stock_quantity INT(11) NULL DEFAULT 0,
  min_stock_level INT(11) NULL DEFAULT 0,
  location VARCHAR(255) NULL,
  image_url VARCHAR(500) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_part_number (part_number),
  INDEX idx_name (name),
  INDEX idx_category (category),
  INDEX idx_manufacturer (manufacturer),
  INDEX idx_location (location),
  INDEX idx_stock_quantity (stock_quantity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

