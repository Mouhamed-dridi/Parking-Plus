-- 012_repairs.sql
-- Repair work orders linked to vehicles

CREATE TABLE repairs (
    id             SERIAL PRIMARY KEY,
    car_id         INTEGER REFERENCES cars(id) ON DELETE SET NULL,
    vehicle_name   VARCHAR(200) NOT NULL DEFAULT '',
    vehicle_plate  VARCHAR(50) NOT NULL DEFAULT '',
    driver_name    VARCHAR(150) NOT NULL DEFAULT '',
    description    TEXT NOT NULL DEFAULT '',
    garage         VARCHAR(150) NOT NULL DEFAULT '',
    garage_id      INTEGER REFERENCES garage_crm(id) ON DELETE SET NULL,
    cost           DECIMAL(10,2) NOT NULL DEFAULT 0,
    status         VARCHAR(20) NOT NULL DEFAULT 'Pending'
                       CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
    scheduled_date VARCHAR(20) DEFAULT '',
    completed_date VARCHAR(20) DEFAULT '',
    notes          TEXT DEFAULT '',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_repairs_car    ON repairs(car_id);
CREATE INDEX idx_repairs_status ON repairs(status);
CREATE INDEX idx_repairs_garage ON repairs(garage_id);
