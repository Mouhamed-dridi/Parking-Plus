# Driver Database Schema

> PostgreSQL — Parking Plus System

---

## Table: `drivers`

Core table storing all driver profiles.

```sql
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

-- Indexes
CREATE INDEX idx_drivers_email      ON drivers(email);
CREATE INDEX idx_drivers_region     ON drivers(region);
CREATE INDEX idx_drivers_car_state  ON drivers(car_state);
CREATE INDEX idx_drivers_status     ON drivers(status);
CREATE INDEX idx_drivers_license    ON drivers(license);
```

### Column Notes

| Column      | Type          | Notes                                       |
|-------------|---------------|---------------------------------------------|
| `id`        | SERIAL        | Auto-increment primary key                  |
| `name`      | VARCHAR(100)  | Full name of driver                         |
| `email`     | VARCHAR(150)  | Unique — used for contact & notifications   |
| `avatar`    | TEXT          | URL or file path to avatar image            |
| `role`      | VARCHAR(50)   | Job title (e.g. Super Admin, Driver, etc.)  |
| `region`    | VARCHAR(100)  | Geographic region of operation              |
| `sub_region`| VARCHAR(100)  | Sub-region within region                    |
| `status`    | ENUM-ish      | `Active` or `Inactive`                      |
| `car_state` | ENUM-ish      | `in road` / `free` / `apsnet` / `blocked`   |
| `phone`     | VARCHAR(30)   | Contact phone                               |
| `license`   | VARCHAR(50)   | Driver's license number                     |
| `vehicle`   | VARCHAR(100)  | Currently assigned vehicle name (denormalized) |
| `car_ref_id`| VARCHAR(50)   | Car reference ID (denormalized)             |
| `trips`     | INTEGER       | Total completed trips                       |
| `rating`    | DECIMAL(3,2)  | Rating score (0.00 – 9.99)                  |
| `created_at`| TIMESTAMPTZ   | Row creation timestamp                      |
| `updated_at`| TIMESTAMPTZ   | Row last-update timestamp                   |

---

## Table: `driver_groups`

Groups that drivers can belong to (many-to-many).

```sql
CREATE TABLE driver_groups (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);
```

---

## Table: `driver_group_members`

Join table linking drivers to groups.

```sql
CREATE TABLE driver_group_members (
    driver_id INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    group_id  INTEGER NOT NULL REFERENCES driver_groups(id) ON DELETE CASCADE,
    PRIMARY KEY (driver_id, group_id)
);

CREATE INDEX idx_dgm_driver ON driver_group_members(driver_id);
CREATE INDEX idx_dgm_group  ON driver_group_members(group_id);
```

---

## Entity Relationship Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          DATABASE SCHEMA — ParkPlus                         │
│                          Driver Relationships                               │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────────────┐              ┌──────────────────────────┐        │
│  │      users           │              │    driver_groups         │        │
│  │──────────────────────│              │──────────────────────────│        │
│  │ id (PK) SERIAL       │              │ id (PK) SERIAL           │        │
│  │ username VARCHAR UNIQ│              │ name VARCHAR UNIQUE      │        │
│  │ password VARCHAR     │              └──────────┬───────────────┘        │
│  │ role VARCHAR         │                         │                       │
│  │ name VARCHAR         │                         │ 1:N                   │
│  │ avatar TEXT          │                         │                       │
│  └──────────┬───────────┘              ┌──────────┴───────────────┐        │
│             │                         │  driver_group_members     │        │
│             │ 0:1                     │──────────────────────────│        │
│             │                         │ driver_id (FK → drivers)  │        │
│             ▼                         │ group_id  (FK → d_groups)│        │
│  ┌──────────────────────────────────┐ │ PRIMARY KEY (driver,group)│        │
│  │           drivers                │ └──────────────────────────┘        │
│  │──────────────────────────────────│                                     │
│  │ id (PK) SERIAL                  │──────────┐                          │
│  │ name VARCHAR                    │          │ 1:N                       │
│  │ email VARCHAR UNIQUE            │          │                          │
│  │ avatar TEXT                     │          ▼                          │
│  │ role VARCHAR                    │  ┌──────────────────────────┐        │
│  │ region VARCHAR                  │  │   driver_car_history     │        │
│  │ sub_region VARCHAR              │  │──────────────────────────│        │
│  │ status VARCHAR (Active/Inactive)│  │ id (PK) SERIAL           │        │
│  │ car_state VARCHAR (enum)        │  │ driver_id (FK → drivers) │        │
│  │ phone VARCHAR                   │  │ car_id (FK → cars)       │        │
│  │ license VARCHAR                 │  │ assigned_from TIMESTAMPTZ│        │
│  │ vehicle VARCHAR                 │  │ assigned_to  TIMESTAMPTZ │        │
│  │ car_ref_id VARCHAR              │  └──────────────────────────┘        │
│  │ trips INTEGER                   │                                     │
│  │ rating DECIMAL                  │──────────┐                          │
│  │ created_at TIMESTAMPTZ          │          │ 1:N                       │
│  │ updated_at TIMESTAMPTZ          │          │                          │
│  └──────────────┬──────────────────┘          ▼                          │
│                 │ 1:N              ┌──────────────────────────┐          │
│                 │                  │   bookings                │          │
│                 │                  │──────────────────────────│          │
│                 ├─────────────────>│ driver_id (FK → drivers)  │          │
│                 │                  │ ...                       │          │
│                 │ 1:N              └──────────────────────────┘          │
│                 │                                                         │
│                 ├──────────────────┐                                     │     
│                 │ 1:N              ▼                                     │
│                 │          ┌──────────────────────────┐                  │
│                 │          │   lavage_requests         │                  │
│                 │          │──────────────────────────│                  │
│                 └─────────>│ driver_id (FK → drivers)  │                  │
│                            │ ...                       │                  │
│                            └──────────────────────────┘                  │
│                                                                            │
│  ┌──────────────────────┐    ┌──────────────────────────┐                │
│  │       cars           │    │   gate_movements         │                │
│  │──────────────────────│    │──────────────────────────│                │
│  │ id (PK) SERIAL      │    │ id (PK) SERIAL           │                │
│  │ name VARCHAR         │    │ driver_cid VARCHAR       │                │
│  │ driver_id (FK)→drivers│    │ driver_name VARCHAR      │                │
│  │ ...                   │    │ ...                      │                │
│  └──────────────────────┘    └──────────────────────────┘                │
│                                                                            │
│  ┌──────────────────────┐    ┌──────────────────────────┐                │
│  │  car_documents       │    │  car_finance_records     │                │
│  │──────────────────────│    │──────────────────────────│                │
│  │ id (PK) SERIAL      │    │ car_id (PK,FK → cars)    │                │
│  │ car_id (FK → cars)  │    │ ...                      │                │
│  │ ...                   │    └──────────────────────────┘                │
│  └──────────────────────┘                                                 │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Relationship Summary

| Related Table      | Type | Foreign Key                     | Description                                     |
|--------------------|------|----------------------------------|-------------------------------------------------|
| `cars`             | 1:N  | `cars.driver_id → drivers.id`   | Current car assigned to driver                  |
| `driver_car_history`| 1:N | `driver_car_history.driver_id → drivers.id` | Historical record of car assignments  |
| `driver_groups`    | M:N  | via `driver_group_members`       | Groups a driver belongs to                      |
| `bookings`         | 1:N  | `bookings.driver_id → drivers.id` | Trip bookings made by the driver              |
| `lavage_requests`  | 1:N  | `lavage_requests.driver_id → drivers.id` | Car wash requests by the driver        |
| `gate_movements`   | 1:N  | `gate_movements.driver_cid` (string ref) | Gate entry/exit events (loosely linked)|
| `users` (auth)     | 0:1  | `users.driver_id → drivers.id`   | Login account linked to a driver profile       |

---

## Optional: Historical Car Assignment Tracking

If you need to track which drivers were assigned to which cars over time:

```sql
CREATE TABLE driver_car_history (
    id            SERIAL PRIMARY KEY,
    driver_id     INTEGER NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
    car_id        INTEGER NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    assigned_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    assigned_to   TIMESTAMPTZ,
    is_active     BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_dch_driver ON driver_car_history(driver_id);
CREATE INDEX idx_dch_car    ON driver_car_history(car_id);
```

---

## Data Flow Example

```
1. Admin creates a driver  ──→ INSERT INTO drivers (...)
2. Admin assigns driver     ──→ UPDATE cars SET driver_id = ? WHERE id = ?
   to a car                    INSERT INTO driver_car_history (driver_id, car_id)
3. Driver makes a booking   ──→ INSERT INTO bookings (driver_id, ...)
4. Driver requests lavage   ──→ INSERT INTO lavage_requests (driver_id, ...)
5. Driver passes through    ──→ INSERT INTO gate_movements (driver_cid, ...)
   a gate
6. Driver leaves / is       ──→ UPDATE driver_car_history SET assigned_to = NOW(),
   reassigned                         is_active = false WHERE driver_id = ? AND is_active = true
                                UPDATE cars SET driver_id = NULL WHERE id = ?
```

---

## Migration Strategy

Each file in this folder follows the pattern `NNN_entity_name.sql` and is meant to be run sequentially. This file corresponds to:

```
001_drivers.sql
```
