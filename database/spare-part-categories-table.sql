CREATE TABLE IF NOT EXISTS spare_part_categories (
  id          INT(11)       NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
