-- Create Category table
CREATE TABLE IF NOT EXISTS Category (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(191) NOT NULL,
  description TEXT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY idx_name (name),
  INDEX idx_name_search (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

