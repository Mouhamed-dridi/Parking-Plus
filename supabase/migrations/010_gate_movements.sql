-- 010_gate_movements.sql
-- Gate entry/exit records

CREATE TABLE gate_movements (
    id           SERIAL PRIMARY KEY,
    vehicle_type VARCHAR(20) NOT NULL CHECK (vehicle_type IN ('Car', 'Delivery', 'Used')),
    series_id    VARCHAR(30) NOT NULL DEFAULT '',
    driver_cid   VARCHAR(50) NOT NULL DEFAULT '',
    driver_name  VARCHAR(150) NOT NULL DEFAULT '',
    date         DATE NOT NULL DEFAULT CURRENT_DATE,
    time         VARCHAR(10) NOT NULL DEFAULT '',
    driver_type  VARCHAR(10) NOT NULL CHECK (driver_type IN ('Internal', 'External')),
    movement     VARCHAR(10) NOT NULL CHECK (movement IN ('Entry', 'Exit')),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gate_date      ON gate_movements(date);
CREATE INDEX idx_gate_movement  ON gate_movements(movement);
CREATE INDEX idx_gate_driver    ON gate_movements(driver_cid);
CREATE INDEX idx_gate_vehicle   ON gate_movements(vehicle_type);
