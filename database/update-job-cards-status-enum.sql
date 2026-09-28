-- Expand job_cards.status to the new estimate/invoice status vocabulary
-- Old values: open, in_progress, completed, closed
-- New values: open, sent, approved, not_paid, paid, warranty, special_order, written_off, voided
-- Remap existing rows to the closest new status before changing the enum definition
-- (best-effort mapping — review and correct individual records manually if needed)
UPDATE job_cards SET status = 'approved' WHERE status = 'in_progress';
UPDATE job_cards SET status = 'paid' WHERE status = 'completed';
UPDATE job_cards SET status = 'voided' WHERE status = 'closed';

ALTER TABLE job_cards
MODIFY COLUMN status ENUM('open','sent','approved','not_paid','paid','warranty','special_order','written_off','voided') NOT NULL DEFAULT 'open';
