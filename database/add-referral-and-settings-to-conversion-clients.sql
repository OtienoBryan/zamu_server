-- Add "How did you find us?" and account settings fields to conversion_clients table
ALTER TABLE conversion_clients
ADD COLUMN referral_source VARCHAR(100) NULL AFTER tax_pin,
ADD COLUMN referral_notes TEXT NULL AFTER referral_source,
ADD COLUMN tax_exempt TINYINT(1) NOT NULL DEFAULT 0 AFTER referral_notes,
ADD COLUMN apply_discount TINYINT(1) NOT NULL DEFAULT 0 AFTER tax_exempt,
ADD COLUMN discount_rate DECIMAL(5,2) NULL AFTER apply_discount,
ADD COLUMN labour_rate_override TINYINT(1) NOT NULL DEFAULT 0 AFTER discount_rate,
ADD COLUMN labour_rate DECIMAL(10,2) NULL AFTER labour_rate_override,
ADD COLUMN parts_markup_override TINYINT(1) NOT NULL DEFAULT 0 AFTER labour_rate,
ADD COLUMN parts_markup DECIMAL(5,2) NULL AFTER parts_markup_override,
ADD COLUMN payment_terms_override TINYINT(1) NOT NULL DEFAULT 0 AFTER parts_markup,
ADD COLUMN payment_terms VARCHAR(100) NULL AFTER payment_terms_override;
