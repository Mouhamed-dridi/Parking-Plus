-- 005_car_finance.sql
-- Financial records for each vehicle

CREATE TABLE car_finance (
    car_id           INTEGER PRIMARY KEY REFERENCES cars(id) ON DELETE CASCADE,
    car_name         VARCHAR(200) NOT NULL DEFAULT '',
    price            DECIMAL(12,2) NOT NULL DEFAULT 0,
    achat_date       VARCHAR(20) NOT NULL DEFAULT '',
    delivery_date    VARCHAR(20) NOT NULL DEFAULT '',
    insurance        VARCHAR(100) DEFAULT '',
    insurance_margin VARCHAR(20) DEFAULT '',
    vignette_tax     VARCHAR(50) DEFAULT '',
    provider         VARCHAR(100) DEFAULT '',
    immo_id          VARCHAR(50) DEFAULT '',
    carte_grise_id   VARCHAR(50) DEFAULT '',
    notes            TEXT DEFAULT '',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
