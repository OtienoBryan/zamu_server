-- Create Stores table
CREATE TABLE IF NOT EXISTS stores (
  id INT(11) NOT NULL AUTO_INCREMENT,
  store_code VARCHAR(20) NOT NULL,
  store_name VARCHAR(100) NOT NULL,
  address TEXT NULL,
  country_id INT(11) NOT NULL,
  is_active BOOLEAN NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_store_code (store_code),
  INDEX idx_store_name (store_name),
  INDEX idx_country_id (country_id),
  INDEX idx_is_active (is_active),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



