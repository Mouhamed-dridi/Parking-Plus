-- 007_trips.sql
-- Trip history records

CREATE TABLE trips (
    id        SERIAL PRIMARY KEY,
    car_id    INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    driver_id INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
    date      VARCHAR(20) NOT NULL DEFAULT '',
    driver    VARCHAR(100) NOT NULL DEFAULT '',
    from_loc  VARCHAR(200) NOT NULL DEFAULT '',
    to_loc    VARCHAR(200) NOT NULL DEFAULT '',
    distance  VARCHAR(30) NOT NULL DEFAULT '',
    duration  VARCHAR(30) NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trips_car     ON trips(car_id);
CREATE INDEX idx_trips_driver  ON trips(driver_id);
CREATE INDEX idx_trips_date    ON trips(date);
