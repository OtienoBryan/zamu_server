CREATE TABLE IF NOT EXISTS quotations (
  id                 INT(11)       NOT NULL AUTO_INCREMENT,
  client_id          INT(11)       NULL,
  subtotal           DECIMAL(14,2) NOT NULL DEFAULT 0,
  tax_rate           DECIMAL(5,2)  NOT NULL DEFAULT 0,
  tax_amount         DECIMAL(14,2) NOT NULL DEFAULT 0,
  total_amount       DECIMAL(14,2) NOT NULL DEFAULT 0,
  valid_until        DATE          NULL,
  notes              TEXT          NULL,
  created_by         INT(11)       NULL,
  created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_quotations_client_id (client_id),
  CONSTRAINT fk_quotations_client FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quotation_items (
  id                 INT(11)       NOT NULL AUTO_INCREMENT,
  quotation_id       INT(11)       NOT NULL,
  product_id         INT(11)       NOT NULL,
  quantity           DECIMAL(12,2) NOT NULL,
  unit_price         DECIMAL(12,2) NOT NULL,
  total_price        DECIMAL(14,2) NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_quotation_items_quotation_id (quotation_id),
  INDEX idx_quotation_items_product_id (product_id),
  CONSTRAINT fk_quotation_items_quotation FOREIGN KEY (quotation_id) REFERENCES quotations (id) ON DELETE CASCADE,
  CONSTRAINT fk_quotation_items_product FOREIGN KEY (product_id) REFERENCES finished_products (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
