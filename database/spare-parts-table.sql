CREATE TABLE IF NOT EXISTS spare_parts (
  id              INT(11)         NOT NULL AUTO_INCREMENT,
  name            VARCHAR(150)    NOT NULL,
  category_id     INT(11)         NULL,
  part_number     VARCHAR(100)    NULL,
  unit_of_measure VARCHAR(20)     NOT NULL,
  quantity        DECIMAL(12,2)   NOT NULL DEFAULT 0,
  alert_quantity  DECIMAL(12,2)   NOT NULL DEFAULT 0,
  cost            DECIMAL(12,2)   NOT NULL DEFAULT 0,
  description     TEXT            NULL,
  status          ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_category_id (category_id),
  CONSTRAINT fk_spare_parts_category FOREIGN KEY (category_id) REFERENCES spare_part_categories (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
