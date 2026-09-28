ALTER TABLE staff_member_leaves
  ADD COLUMN leave_type ENUM('annual','sick','unpaid','compassionate','maternity_paternity','other') NOT NULL DEFAULT 'annual' AFTER staff_member_id;
