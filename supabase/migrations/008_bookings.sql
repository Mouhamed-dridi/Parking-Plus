-- 008_bookings.sql
-- Trip booking / car request system

CREATE TABLE bookings (
    id             SERIAL PRIMARY KEY,
    ref_id         VARCHAR(20) UNIQUE NOT NULL,
    name           VARCHAR(150) NOT NULL,
    email          VARCHAR(150) NOT NULL,
    phone          VARCHAR(30) NOT NULL DEFAULT '',
    department     VARCHAR(100) NOT NULL DEFAULT '',
    purpose        TEXT NOT NULL DEFAULT '',
    vehicle_name   VARCHAR(200) NOT NULL DEFAULT '',
    vehicle_type   VARCHAR(20) NOT NULL DEFAULT '',
    has_license    BOOLEAN NOT NULL DEFAULT false,
    has_shell_card BOOLEAN NOT NULL DEFAULT false,
    driver_id      INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
    car_id         INTEGER REFERENCES cars(id) ON DELETE SET NULL,
    source         VARCHAR(200) NOT NULL DEFAULT '',
    destination    VARCHAR(200) NOT NULL DEFAULT '',
    departure_time VARCHAR(30) NOT NULL DEFAULT '',
    arrival_time   VARCHAR(30) NOT NULL DEFAULT '',
    status         VARCHAR(20) NOT NULL DEFAULT 'Pending'
                       CHECK (status IN ('Pending', 'Approved', 'In Progress', 'Completed', 'Cancelled')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_ref_id  ON bookings(ref_id);
CREATE INDEX idx_bookings_status  ON bookings(status);
CREATE INDEX idx_bookings_driver  ON bookings(driver_id);
CREATE INDEX idx_bookings_date    ON bookings(created_at);
