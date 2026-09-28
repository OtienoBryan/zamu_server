ALTER TABLE staff_member_leaves
  ADD COLUMN status ENUM('pending','approved','declined') NOT NULL DEFAULT 'pending' AFTER reason,
  ADD COLUMN decision_notes VARCHAR(255) NULL AFTER status;
