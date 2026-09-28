CREATE TABLE IF NOT EXISTS PartCategories (
  id          INT(11)       NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  description TEXT          NULL,
  is_active   TINYINT(1)    NOT NULL DEFAULT 1,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_name (name),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
