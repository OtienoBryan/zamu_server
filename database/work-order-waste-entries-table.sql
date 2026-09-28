CREATE TABLE IF NOT EXISTS work_order_waste_entries (
  id                 INT(11)       NOT NULL AUTO_INCREMENT,
  work_order_id      INT(11)       NOT NULL,
  raw_material_id    INT(11)       NOT NULL,
  store_id           INT(11)       NOT NULL,
  type               ENUM('offcut','damage') NOT NULL,
  reusable           TINYINT(1)    NOT NULL DEFAULT 0,
  quantity           DECIMAL(14,2) NOT NULL,
  stock_action       ENUM('returned','deducted') NOT NULL,
  notes              VARCHAR(255)  NULL,
  created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_wowe_work_order_id (work_order_id),
  INDEX idx_wowe_raw_material_id (raw_material_id),
  INDEX idx_wowe_store_id (store_id),
  CONSTRAINT fk_wowe_work_order FOREIGN KEY (work_order_id) REFERENCES work_orders (id) ON DELETE CASCADE,
  CONSTRAINT fk_wowe_raw_material FOREIGN KEY (raw_material_id) REFERENCES raw_materials (id) ON DELETE CASCADE,
  CONSTRAINT fk_wowe_store FOREIGN KEY (store_id) REFERENCES raw_material_stores (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
