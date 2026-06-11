-- 003_cars.sql
-- Vehicle inventory with specifications

CREATE TABLE cars (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    image         TEXT DEFAULT '',
    type          VARCHAR(20) NOT NULL CHECK (type IN ('Car', 'Delivery', 'Used')),
    transmission  VARCHAR(20) NOT NULL DEFAULT 'Auto',
    fuel          VARCHAR(50) NOT NULL DEFAULT '',
    price         DECIMAL(10,2) NOT NULL DEFAULT 0,
    status        VARCHAR(20) NOT NULL DEFAULT 'Free'
                      CHECK (status IN ('Free', 'In Road', 'Maintenance')),
    driver_id     INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
    driver_name   VARCHAR(100) DEFAULT '',
    driver_avatar TEXT DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Car specifications (1:1 with cars)
CREATE TABLE car_specs (
    car_id            INTEGER PRIMARY KEY REFERENCES cars(id) ON DELETE CASCADE,
    caracteristiques  JSONB NOT NULL DEFAULT '[]',
    motorisation      JSONB NOT NULL DEFAULT '[]',
    transmission      JSONB NOT NULL DEFAULT '[]',
    dimensions        JSONB NOT NULL DEFAULT '[]',
    performances      JSONB NOT NULL DEFAULT '[]',
    consommation      JSONB NOT NULL DEFAULT '[]',
    securite          JSONB NOT NULL DEFAULT '[]',
    aides_conduite    JSONB NOT NULL DEFAULT '[]',
    exterieur         JSONB NOT NULL DEFAULT '[]',
    audio             JSONB NOT NULL DEFAULT '[]',
    interieur         JSONB NOT NULL DEFAULT '[]',
    fonctionnels      JSONB NOT NULL DEFAULT '[]'
);

-- Historical car assignments
CREATE TABLE driver_car_history (
    id            SERIAL PRIMARY KEY,
    driver_id     INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    car_id        INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    assigned_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_to   TIMESTAMPTZ,
    is_active     BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_cars_type       ON cars(type);
CREATE INDEX idx_cars_status     ON cars(status);
CREATE INDEX idx_cars_driver_id  ON cars(driver_id);
CREATE INDEX idx_dch_driver      ON driver_car_history(driver_id);
CREATE INDEX idx_dch_car         ON driver_car_history(car_id);
CREATE INDEX idx_dch_active      ON driver_car_history(is_active);
