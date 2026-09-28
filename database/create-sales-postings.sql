-- Accountant sales postings: the physically-collected amount per payment method for a
-- station over a period, snapshotted against the system-calculated total at posting time
-- so the audit record stays meaningful even if the underlying sales data changes later.
CREATE TABLE IF NOT EXISTS sales_postings (
  id INT NOT NULL AUTO_INCREMENT,
  station_id INT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  cash_posted DECIMAL(15,2) NOT NULL DEFAULT 0,
  card_posted DECIMAL(15,2) NOT NULL DEFAULT 0,
  mpesa_posted DECIMAL(15,2) NOT NULL DEFAULT 0,
  credit_posted DECIMAL(15,2) NOT NULL DEFAULT 0,
  other_posted DECIMAL(15,2) NOT NULL DEFAULT 0,
  cash_system DECIMAL(15,2) NOT NULL DEFAULT 0,
  card_system DECIMAL(15,2) NOT NULL DEFAULT 0,
  mpesa_system DECIMAL(15,2) NOT NULL DEFAULT 0,
  credit_system DECIMAL(15,2) NOT NULL DEFAULT 0,
  other_system DECIMAL(15,2) NOT NULL DEFAULT 0,
  notes VARCHAR(500) NULL,
  posted_by INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sales_postings_station (station_id),
  KEY idx_sales_postings_period (period_start, period_end)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
