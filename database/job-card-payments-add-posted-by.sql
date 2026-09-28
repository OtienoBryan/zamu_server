-- Adds the staff member who recorded each payment.
-- Only needed if job_card_payments was created before posted_by existed;
-- job-card-payments-table.sql already includes the column for fresh installs.
ALTER TABLE job_card_payments
  ADD COLUMN posted_by INT(11) NULL AFTER notes,
  ADD INDEX idx_posted_by (posted_by),
  ADD FOREIGN KEY (posted_by) REFERENCES staff(id) ON DELETE SET NULL;
