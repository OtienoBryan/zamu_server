CREATE TABLE IF NOT EXISTS spare_part_store_inventory (
  id             INT(11)       NOT NULL AUTO_INCREMENT,
  store_id       INT(11)       NOT NULL,
  spare_part_id  INT(11)       NOT NULL,
  quantity       DECIMAL(14,2) NOT NULL DEFAULT 0,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY idx_store_spare_part (store_id, spare_part_id),
  INDEX idx_spare_part_id (spare_part_id),
  CONSTRAINT fk_spi_store FOREIGN KEY (store_id) REFERENCES raw_material_stores (id) ON DELETE CASCADE,
  CONSTRAINT fk_spi_spare_part FOREIGN KEY (spare_part_id) REFERENCES spare_parts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
