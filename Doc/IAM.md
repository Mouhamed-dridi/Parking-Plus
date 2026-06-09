# Identity & Access Management (IAM)

## Roles

| Role       | Username | Password | Login Redirect |
|------------|----------|----------|----------------|
| Admin      | `admin`  | `admin`  | `/dashboard`   |
| Driver     | `drv123` | `drv123` | `/listing`     |
| Operator   | `opt123` | `opt123` | `/dashboard`   |

---

## 1. Admin — Full Access

### Route Access
| Route              | Guard               |
|--------------------|----------------------|
| /dashboard         | admin, operator      |
| /listing           | all roles            |
| /listing/:id       | all roles            |
| /delivery-cars     | all roles            |
| /used-car          | all roles            |
| /drivers           | all roles            |
| /drivers/:id       | all roles            |
| /request-car       | admin, driver        |
| /booking-list      | admin, driver        |
| /repairs           | admin, driver        |
| /garage-crm        | admin, driver        |
| /lavage            | admin, driver        |
| /settings          | admin, operator      |
| /gates             | admin, operator      |
| /user-management   | admin only           |
| /reports           | admin only           |

### Sidebar
- All items visible except `/driver-dashboard`.
- System section (User Management, Reports) visible.

### Permissions
- Full CRUD on Cars, Drivers, Lavage, Repairs, Garage CRM, Bookings, Gates.
- Create/Edit/Delete buttons visible everywhere.
- All tabs in Car Details (Fiche, Maintenance, Trips, Finance, Documents, Driver).
- Hard-delete on all entities (no soft-delete / Trash).

---

## 2. Driver — Minimal Operational Access

### Route Access
| Route              | Guard               |
|--------------------|----------------------|
| /driver-dashboard  | driver only          |
| /listing           | all roles            |
| /listing/:id       | all roles            |
| /delivery-cars     | all roles            |
| /used-car          | all roles            |
| /drivers           | all roles            |
| /drivers/:id       | all roles            |
| /request-car       | admin, driver        |
| /booking-list      | admin, driver        |
| /repairs           | admin, driver        |
| /garage-crm        | admin, driver        |
| /lavage            | admin, driver        |
| **Blocked routes:** dashboard, settings, user-management, reports, gates |

### Sidebar
- Items without `adminOnly` flag: Dashboard (driver-dashboard), Vehicles (Cars, Delivery, Used Cars), Drivers, Booking, Booking List, Lavage, Maintenance (Repairs, Garage CRM), Settings.
- System section hidden.

### Permissions
- **Cars:** Fiche Technique + Driver tabs (no Maintenance/Trips/Finance/Documents).
- **Drivers:** View-only (no Add/Edit/Delete buttons).
- **Driver Profile:** View-only (no Edit/Delete buttons).
- **Lavage, Repairs, Garage CRM, Booking:** Full functional access within the page.
- No access to Dashboard, Settings, User Management, Reports, or Gates.

---

## 3. Operator (Gate Operator) — Gate-Focused Access

### Route Access
| Route              | Guard               |
|--------------------|----------------------|
| /dashboard         | admin, operator      |
| /listing           | all roles            |
| /listing/:id       | all roles            |
| /delivery-cars     | all roles            |
| /used-car          | all roles            |
| /drivers           | all roles            |
| /drivers/:id       | all roles            |
| /settings          | admin, operator      |
| /gates             | admin, operator      |
| **Blocked routes:** request-car, booking-list, lavage, repairs, garage-crm, user-management, reports, driver-dashboard |

### Sidebar
- Dashboard, Vehicles (Cars, Delivery, Used Cars), Drivers, Gates, Settings.
- Maintenance section hidden completely.
- System section hidden.

### Permissions
- **Cars:** Fiche Technique tab only (no Driver/Maintenance/Trips/Finance/Documents).
- **Drivers:** View-only (no Add/Edit/Delete buttons).
- **Driver Profile:** View-only.
- **Gates:** Full CRUD — create movements, view table, download CSV export.
- **Dashboard:** Action-card dashboard (Gate, Driver, Cars, Settings cards).
- **Settings:** Full access.
- No access to Lavage, Booking, Repairs, Garage CRM, User Management, or Reports.

---

## Auth Guard Behaviour

- `auth.guard.ts` checks `route.data.roles` array.
- If user's role is not in the allowed array → redirect to `/driver-dashboard`.
- If not logged in → redirect to `/login`.

## Hard-Delete Policy

- All deletes are permanent. No Trash / soft-delete functionality.
- Affects: Lavage, Drivers, Garage CRM, Car Documents.

## Login Flow

```
/login
  ├─ admin/admin    → /dashboard
  ├─ drv123/drv123  → /listing
  └─ opt123/opt123  → /dashboard
```
