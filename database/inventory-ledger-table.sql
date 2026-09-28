-- Create parts_inventory_ledger table
-- This table tracks all inventory transactions (movements, adjustments, etc.)
CREATE TABLE IF NOT EXISTS parts_inventory_ledger (
  id INT(11) NOT NULL AUTO_INCREMENT,
  inventory_id INT(11) NOT NULL,
  store_id INT(11) NOT NULL,
  part_id INT(11) NOT NULL,
  transaction_type ENUM('IN', 'OUT', 'ADJUSTMENT', 'TRANSFER_IN', 'TRANSFER_OUT') NOT NULL,
  quantity INT(11) NOT NULL,
  previous_quantity INT(11) NOT NULL,
  new_quantity INT(11) NOT NULL,
  reference_number VARCHAR(100) NULL,
  notes TEXT NULL,
  created_by INT(11) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_inventory_id (inventory_id),
  INDEX idx_store_id (store_id),
  INDEX idx_part_id (part_id),
  INDEX idx_transaction_type (transaction_type),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (inventory_id) REFERENCES parts_inventory(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
  FOREIGN KEY (part_id) REFERENCES Parts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
