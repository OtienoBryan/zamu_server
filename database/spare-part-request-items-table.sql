CREATE TABLE IF NOT EXISTS spare_part_request_items (
  id             INT(11)       NOT NULL AUTO_INCREMENT,
  request_id     INT(11)       NOT NULL,
  spare_part_id  INT(11)       NOT NULL,
  quantity       DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_request_id (request_id),
  INDEX idx_spare_part_id (spare_part_id),
  CONSTRAINT fk_spri_request FOREIGN KEY (request_id) REFERENCES spare_part_requests (id) ON DELETE CASCADE,
  CONSTRAINT fk_spri_spare_part FOREIGN KEY (spare_part_id) REFERENCES spare_parts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
