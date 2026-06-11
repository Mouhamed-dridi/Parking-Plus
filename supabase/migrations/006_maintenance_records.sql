-- 006_maintenance_records.sql
-- Vehicle maintenance history

CREATE TABLE maintenance_records (
    id          SERIAL PRIMARY KEY,
    car_id      INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    date        VARCHAR(20) NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    garage      VARCHAR(150) NOT NULL DEFAULT '',
    cost        DECIMAL(10,2) NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_maint_car   ON maintenance_records(car_id);
CREATE INDEX idx_maint_date  ON maintenance_records(date);
