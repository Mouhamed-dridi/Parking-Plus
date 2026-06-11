-- 011_garage_crm.sql
-- Garage CRM / vendor management

CREATE TABLE garage_crm (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    contact_person  VARCHAR(100) DEFAULT '',
    phone           VARCHAR(30) DEFAULT '',
    email           VARCHAR(150) DEFAULT '',
    address         TEXT DEFAULT '',
    speciality      VARCHAR(100) DEFAULT '',
    status          VARCHAR(20) NOT NULL DEFAULT 'Active'
                        CHECK (status IN ('Active', 'Inactive')),
    notes           TEXT DEFAULT '',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_garage_name   ON garage_crm(name);
CREATE INDEX idx_garage_status ON garage_crm(status);
