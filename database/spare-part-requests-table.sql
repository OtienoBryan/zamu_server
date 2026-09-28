CREATE TABLE IF NOT EXISTS spare_part_requests (
  id            INT(11)       NOT NULL AUTO_INCREMENT,
  store_id      INT(11)       NOT NULL,
  status        ENUM('pending','fulfilled','cancelled') NOT NULL DEFAULT 'pending',
  requested_by  INT(11)       NULL,
  notes         TEXT          NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_store_id (store_id),
  INDEX idx_status (status),
  CONSTRAINT fk_spr_store FOREIGN KEY (store_id) REFERENCES raw_material_stores (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
