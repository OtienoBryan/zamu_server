ALTER TABLE spare_part_requests
  ADD COLUMN fulfilled_at TIMESTAMP NULL AFTER notes,
  ADD COLUMN fulfillment_notes TEXT NULL AFTER fulfilled_at;
