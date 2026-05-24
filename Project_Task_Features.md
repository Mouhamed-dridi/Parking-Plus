# Project Task Features

> **Collaborative space** – This markdown file serves as the living document for all new ideas, feature proposals, and improvements to the Parking Plus SaaS project. Both you (the developer) and I (Antigravity) will edit it over time.

---

## 🎯 Project Vision
- Build a **premium, modern SaaS dashboard** for fleet and parking management.
- Provide **real‑time analytics**, interactive SVG charts, and a **responsive UI** using Angular 18 + NG‑Zorro.
- Ensure **extensibility**: new modules (e.g., request‑car, driver‑profile) can be added via lazy‑loaded routes.

---

## 📋 Core Features (Implemented)
1. **Dashboard** – Overview page with KPI cards, combo SVG chart, gauge, parking slot mini‑map, top vehicles, activity feed, and region stats.
2. **Routing** – Lazy‑loaded routes for `listing`, `drivers`, `driver‑profile`, `parking‑state`, `gps`, `request‑car`, and the new `dashboard`.
3. **Sidebar Navigation** – Dashboard link added, icons from NG‑Zorro, collapsible layout.
4. **Styling** – Premium look with Inter font, glass‑morphism waves, micro‑animations, and dark‑mode ready tokens.

---

## 🛠️ Upcoming Enhancements (Ideas to Discuss)
| Feature | Description | Priority | Owner | Status |
|---------|-------------|----------|-------|--------|
| **User Authentication** | Add OAuth2 / SSO, role‑based access control. | High | — | Not Started |
| **Print Request** | Ability to print a nicely formatted request‑car page. | Medium | — | Completed |
| **Driver License & VIP Card** | Toggle options for driver profile (license present, VIP card). | Medium | — | Partial |
| **Dynamic Pricing (future)** | If pricing ever needed, integrate a configurable Pricing Service. | Low | — | Not Started |
| **Dark Mode Toggle** | Switch UI theme based on system preference. | Medium | — | Not Started |
| **Export Data** | CSV / PDF export for KPI tables and activity logs. | Medium | — | Not Started |
| **Automated Tests** | Unit & e2e tests for dashboard components and services. | High | — | Not Started |

---

## 📂 Directory Structure (Quick Reference)
```
src/
  app/
    core/          # layout, services, shared UI components
    features/      # feature modules (listing, drivers, dashboard, …)
    app.routes.ts  # route definitions
    ...
```

---

## ✍️ How to Contribute
1. **Edit this file** – Add new rows to the tables, create new sections, or comment with `<!-- TODO: ... -->` markers.
2. **Commit changes** – Use `git add` / `git commit` as usual.
3. **Sync with code** – When a feature is implemented, update the status column above.

---

## 📅 Release Milestones
- **v0.1** – Basic dashboard and routing (completed).
- **v0.2** – Authentication & print request page.
- **v0.3** – Dark mode, export, and automated test coverage.

---

*Feel free to expand any section or propose new ideas. This document lives at the project root and is the single source of truth for our feature roadmap.*
