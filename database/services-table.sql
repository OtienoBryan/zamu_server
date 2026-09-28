-- Create services table
-- Stores labour/service line items (fixed-price or hourly-rate)
CREATE TABLE IF NOT EXISTS services (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  rate DECIMAL(10, 2) NOT NULL,
  pricing_type ENUM('fixed', 'hourly') NOT NULL DEFAULT 'fixed',
  is_active INT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_title (title),
  INDEX idx_pricing_type (pricing_type),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
