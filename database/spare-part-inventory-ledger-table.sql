CREATE TABLE IF NOT EXISTS spare_part_inventory_ledger (
  id                 INT(11)       NOT NULL AUTO_INCREMENT,
  store_id           INT(11)       NOT NULL,
  spare_part_id      INT(11)       NOT NULL,
  transaction_type   ENUM('adjustment_in','adjustment_out','transfer_in','transfer_out') NOT NULL,
  quantity           DECIMAL(14,2) NOT NULL,
  previous_quantity  DECIMAL(14,2) NOT NULL,
  new_quantity       DECIMAL(14,2) NOT NULL,
  notes              TEXT          NULL,
  created_by         INT(11)       NULL,
  created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_spare_part_id (spare_part_id),
  INDEX idx_store_id (store_id),
  CONSTRAINT fk_spil_store FOREIGN KEY (store_id) REFERENCES raw_material_stores (id) ON DELETE CASCADE,
  CONSTRAINT fk_spil_spare_part FOREIGN KEY (spare_part_id) REFERENCES spare_parts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
