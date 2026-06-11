-- 001_users.sql
-- Login accounts for the Parking Plus system

CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(100) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'driver', 'operator')),
    name       VARCHAR(150) NOT NULL,
    avatar     TEXT DEFAULT '',
    driver_id  INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role     ON users(role);
