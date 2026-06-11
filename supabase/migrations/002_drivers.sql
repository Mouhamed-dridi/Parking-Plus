-- 002_drivers.sql
-- Driver profiles, groups, and group membership

CREATE TABLE drivers (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    avatar      TEXT DEFAULT '',
    role        VARCHAR(50) NOT NULL DEFAULT 'Driver',
    region      VARCHAR(100) DEFAULT '',
    sub_region  VARCHAR(100) DEFAULT '',
    status      VARCHAR(10) NOT NULL DEFAULT 'Active'
                    CHECK (status IN ('Active', 'Inactive')),
    car_state   VARCHAR(10) NOT NULL DEFAULT 'free'
                    CHECK (car_state IN ('in road', 'free', 'apsnet', 'blocked')),
    phone       VARCHAR(30) DEFAULT '',
    license     VARCHAR(50) DEFAULT '',
    vehicle     VARCHAR(100) DEFAULT '',
    car_ref_id  VARCHAR(50) DEFAULT '',
    trips       INTEGER NOT NULL DEFAULT 0,
    rating      DECIMAL(3,2) NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE driver_groups (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE driver_group_members (
    driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    group_id  INTEGER NOT NULL REFERENCES driver_groups(id) ON DELETE CASCADE,
    PRIMARY KEY (driver_id, group_id)
);

CREATE INDEX idx_drivers_email      ON drivers(email);
CREATE INDEX idx_drivers_region     ON drivers(region);
CREATE INDEX idx_drivers_car_state  ON drivers(car_state);
CREATE INDEX idx_drivers_status     ON drivers(status);
CREATE INDEX idx_drivers_license    ON drivers(license);
CREATE INDEX idx_dgm_driver         ON driver_group_members(driver_id);
CREATE INDEX idx_dgm_group          ON driver_group_members(group_id);
