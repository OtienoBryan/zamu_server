ALTER TABLE quotations
  ADD COLUMN converted_sale_id INT(11) NULL AFTER notes,
  ADD INDEX idx_quotations_converted_sale_id (converted_sale_id),
  ADD CONSTRAINT fk_quotations_converted_sale FOREIGN KEY (converted_sale_id) REFERENCES pos_sales (id) ON DELETE SET NULL;
