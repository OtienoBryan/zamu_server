ALTER TABLE supplier_ledger
  ADD COLUMN payment_account_id INT(11) NULL AFTER notes,
  ADD COLUMN created_by INT(11) NULL AFTER payment_account_id,
  ADD CONSTRAINT fk_supplier_ledger_payment_account FOREIGN KEY (payment_account_id) REFERENCES chart_of_accounts (id) ON DELETE SET NULL;
