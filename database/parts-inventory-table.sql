-- Reference for the existing parts_inventory table (per-store part stock)
CREATE TABLE IF NOT EXISTS parts_inventory (
  id INT(11) NOT NULL AUTO_INCREMENT,
  store_id INT(11) NOT NULL,
  part_id INT(11) NOT NULL,
  quantity INT(11) NOT NULL DEFAULT 0,
  min_stock_level INT(11) NULL DEFAULT 0,
  location VARCHAR(255) NULL,
  last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_store_id (store_id),
  INDEX idx_part_id (part_id),
  INDEX idx_quantity (quantity),
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
  FOREIGN KEY (part_id) REFERENCES Parts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
