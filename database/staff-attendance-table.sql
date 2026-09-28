CREATE TABLE IF NOT EXISTS staff_attendance (
  id                 INT(11)       NOT NULL AUTO_INCREMENT,
  staff_member_id    INT(11)       NOT NULL,
  check_in_at        DATETIME      NOT NULL,
  check_out_at       DATETIME      NULL,
  notes              VARCHAR(255)  NULL,
  created_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_staff_attendance_staff_member_id (staff_member_id),
  CONSTRAINT fk_staff_attendance_staff_member FOREIGN KEY (staff_member_id) REFERENCES staff_members (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
