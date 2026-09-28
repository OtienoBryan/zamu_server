-- Adds a proper station reference to staff, replacing the ad-hoc practice of
-- encoding a station id as JSON inside the `designation` free-text job-title column
-- (which the /staff page uses for actual job titles, causing the two to collide).
ALTER TABLE staff
  ADD COLUMN station_id INT NULL AFTER designation,
  ADD INDEX idx_staff_station_id (station_id),
  ADD CONSTRAINT fk_staff_station FOREIGN KEY (station_id) REFERENCES Stations(id) ON DELETE SET NULL;

-- Backfill: some rows may already have a JSON-encoded station id array (e.g. "[3]")
-- stuffed into `designation` by the previous workaround — recover it into the new
-- column, then clear `designation` since it never held a real job title in those rows.
UPDATE staff
SET station_id = CAST(JSON_UNQUOTE(JSON_EXTRACT(designation, '$[0]')) AS UNSIGNED),
    designation = NULL
WHERE designation REGEXP '^\\[[0-9]+\\]$';
