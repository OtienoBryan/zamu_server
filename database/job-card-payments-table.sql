-- Job card payment postings. Each row logs a single payment made against a
-- job card's invoice; job_cards.amount_paid is kept in sync as a running total.
CREATE TABLE IF NOT EXISTS job_card_payments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  job_card_id INT(11) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  payment_method ENUM('cash', 'mobile_money', 'card', 'bank_transfer', 'cheque', 'other') NOT NULL,
  reference VARCHAR(100) NULL,
  payment_date DATE NOT NULL,
  notes TEXT NULL,
  posted_by INT(11) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_job_card_id (job_card_id),
  INDEX idx_posted_by (posted_by),
  FOREIGN KEY (job_card_id) REFERENCES job_cards(id) ON DELETE CASCADE,
  FOREIGN KEY (posted_by) REFERENCES staff(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
