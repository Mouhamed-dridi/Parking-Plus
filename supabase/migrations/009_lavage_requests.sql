-- 009_lavage_requests.sql
-- Car wash service requests

CREATE TABLE lavage_requests (
    id             SERIAL PRIMARY KEY,
    ref_id         VARCHAR(20) UNIQUE NOT NULL,
    name           VARCHAR(150) NOT NULL,
    email          VARCHAR(150) NOT NULL,
    phone          VARCHAR(30) NOT NULL DEFAULT '',
    department     VARCHAR(100) NOT NULL DEFAULT '',
    vehicle_name   VARCHAR(200) NOT NULL DEFAULT '',
    vehicle_plate  VARCHAR(50) NOT NULL DEFAULT '',
    vehicle_type   VARCHAR(20) NOT NULL DEFAULT 'Car'
                       CHECK (vehicle_type IN ('Car', 'Delivery', 'Used')),
    service_type   VARCHAR(30) DEFAULT ''
                       CHECK (service_type IN ('Extérieur', 'Intérieur', 'Complet', 'Standard')),
    scheduled_date VARCHAR(30) NOT NULL DEFAULT '',
    location       VARCHAR(200) NOT NULL DEFAULT '',
    notes          TEXT DEFAULT '',
    has_license    BOOLEAN DEFAULT false,
    driver_id      INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
    car_id         INTEGER REFERENCES cars(id) ON DELETE SET NULL,
    status         VARCHAR(20) NOT NULL DEFAULT 'Pending'
                       CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Cancelled')),
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lavage_ref_id  ON lavage_requests(ref_id);
CREATE INDEX idx_lavage_status  ON lavage_requests(status);
CREATE INDEX idx_lavage_driver  ON lavage_requests(driver_id);
CREATE INDEX idx_lavage_date    ON lavage_requests(scheduled_date);
