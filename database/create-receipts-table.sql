CREATE TABLE IF NOT EXISTS receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  receipt_number VARCHAR(50) NOT NULL UNIQUE,
  pos_sale_payment_id INT NOT NULL,
  pos_sale_id INT NOT NULL,
  client_id INT NULL,
  amount DECIMAL(14,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(150) NOT NULL,
  notes TEXT NULL,
  created_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_receipts_pos_sale_payment_id (pos_sale_payment_id),
  INDEX idx_receipts_pos_sale_id (pos_sale_id),
  INDEX idx_receipts_client_id (client_id)
);
