-- 004_car_documents.sql
-- Documents attached to vehicles (insurance, registration, invoices, etc.)

CREATE TABLE car_documents (
    id            SERIAL PRIMARY KEY,
    car_id        INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    file_name     VARCHAR(255) NOT NULL,
    document_type VARCHAR(50) NOT NULL
                      CHECK (document_type IN (
                          'Assurance', 'Carte Grise', 'Taxe / Vignette',
                          'Facture', 'BL', 'Contrat', 'Maintenance', 'Autre'
                      )),
    notes         TEXT DEFAULT '',
    upload_date   VARCHAR(20) NOT NULL DEFAULT '',
    file_url      TEXT DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_car_docs_car  ON car_documents(car_id);
CREATE INDEX idx_car_docs_type ON car_documents(document_type);
