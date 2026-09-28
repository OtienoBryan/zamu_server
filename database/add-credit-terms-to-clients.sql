ALTER TABLE clients
  ADD COLUMN credit_terms_days INT NULL DEFAULT NULL AFTER address;
