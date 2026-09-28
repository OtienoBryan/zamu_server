-- Adds the effective-date window to price changes.
-- endDate NULL means the price is still in force.
ALTER TABLE FuelPrices
  ADD COLUMN startDate DATE NULL AFTER fuelType,
  ADD COLUMN endDate DATE NULL AFTER startDate;

-- Backfill existing rows so history isn't left without a start date:
-- treat the row's creation date as the day the price took effect.
UPDATE FuelPrices SET startDate = DATE(created_at) WHERE startDate IS NULL;
