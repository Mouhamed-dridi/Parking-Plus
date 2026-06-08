# ParkingPlus — Design System & Visual Identity

> **Version:** 1.0  
> **Intent:** Premium, ultra-modern SaaS aesthetic inspired by Linear, shadcn/ui, and Arc.  
> **Constraint:** Visual overhaul only — no logic, no backend, no workflow changes.

---

## 1. Modern Tech Stack (UI/UX Layer Only)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Angular 18.2+ | Signals, new `@if`/`@for` control flow, standalone components |
| **Utility CSS** | Tailwind CSS v3+ | Composable spacing, flex/grid, hover states, dark mode via `class` strategy |
| **Core UI Library** | PrimeNG v18+ with **Aura Dark Theme** | Pre-built interactive components (tables, selects, dialogs, badges) that support the dark aesthetic natively — no Bootstrap/Material legacy |
| **Icons** | Phosphor Icons (via `@phosphor-icons/web`) or PrimeIcons | Sharp, duotone-friendly, consistent weight |
| **Charts** | ngx-charts v21+ | Native Angular, SVG-based, fully themeable for dark backgrounds |
| **Fonts** | Inter (variable) — `font-display` | Clean, tight metrics, exceptional readability at every weight |

### Angular Config Notes
- Enable `schematics` defaults for standalone components.
- Use `:host` and `@layer` CSS for component-scoped overrides.
- Keep PrimeNG imports tree-shakeable (lazy-loaded modules).

---

## 2. Color Palette (Dark/Light Mode Matrix)

### Semantic Token Table

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--bg-base` | `#09090b` (zinc-950) | `#fafafa` (zinc-50) | Page background |
| `--bg-surface` | `#18181b` (zinc-900) | `#ffffff` | Card / panel surface |
| `--bg-elevated` | `#27272a` (zinc-800) | `#f4f4f5` | Dropdowns, modals, hover |
| `--border-muted` | `#27272a` | `#e4e4e7` | Dividers, input borders |
| `--border-strong` | `#3f3f46` | `#d4d4d8` | Focus rings, active borders |
| `--text-primary` | `#fafafa` | `#18181b` | Headings, body |
| `--text-secondary` | `#a1a1aa` | `#71717a` | Labels, meta text |
| `--text-muted` | `#52525b` | `#a1a1aa` | Placeholders, disabled |
| `--accent` | `#10b981` (emerald-500) | `#059669` (emerald-600) | Available/Active, success, CTAs |
| `--accent-hover` | `#34d399` | `#10b981` | Hover state for accent |
| `--danger` | `#ef4444` (red-500) | `#dc2626` (red-600) | Occupied/Blocked, errors |
| `--warning` | `#f59e0b` (amber-500) | `#d97706` (amber-600) | Reserved/Pending |
| `--info` | `#3b82f6` (blue-500) | `#2563eb` (blue-600) | Information, links |

### Dark Mode (Default)
```
background : #09090b
surface    : #18181b
elevated   : #27272a
border     : #27272a
accent     : #10b981  (emerald glow)
danger     : #ef4444  (sharp coral-red)
```

### Light Mode
```
background : #fafafa
surface    : #ffffff
elevated   : #f4f4f5
border     : #e4e4e7
accent     : #059669
danger     : #dc2626
```

---

## 3. Visual Component Specifications (Skin-Only)

### 3.1 Auth Pages
- **Layout:** Full-viewport centered card with subtle glassmorphism (`backdrop-filter: blur(24px)` + `bg-surface/80`).
- **Background:** Animated gradient mesh or subtle particle canvas (pure CSS, no library).
- **Form fields:** PrimeNG `p-inputText` with Aura dark skin — no borders, only bottom-line focus state.
- **Button:** Pill-shaped (`border-radius: 9999px`), filled accent with hover lift (`translateY(-1px)`).
- **Logo:** Top-center, monogram wordmark, 32px height.

### 3.2 Main Dashboard Layout
| Region | Component | Visual Spec |
|--------|-----------|-------------|
| **Sidebar** | Collapsible nav (`w-64` → `w-16`) | Dark surface (`--bg-elevated`), no dividers, icons + tooltips on collapse |
| **Top bar** | Global search + user menu | Full-width, `h-14`, border-bottom `--border-muted`, search with CMD+K trigger |
| **Content** | Scrollable main area | Padding `24px`, max-width `1440px`, centered |
| **User menu** | Avatar + dropdown | `w-8 h-8` rounded-full, dropdown with subtle scale animation |

- **Sidebar items:** Active state uses a 2px left accent bar + `--accent` text color.  
- **Collapse animation:** `width 200ms ease-in-out` via Angular signal.

### 3.3 Live Parking Grid Layout
- **Container:** Responsive CSS Grid (`grid-cols-4` to `grid-cols-8` depending on screen).
- **Spot Card (per parking spot):**  
  - `w-full aspect-[4/3]` rounded-xl surface.
  - Status-driven border glow via CSS `box-shadow`:
    - `Free` → emerald glow (`0 0 12px rgba(16,185,129,0.3)`)
    - `Occupied` → red glow (`0 0 12px rgba(239,68,68,0.3)`)
    - `Reserved` → amber glow (`0 0 12px rgba(245,158,11,0.3)`)
  - Hover: `scale(1.03)` + `translateY(-2px)` with `transition-all duration-200 ease-out`.
  - Status badge: Pill in top-right corner matching status color.
  - Spot number: Clean sans-serif, `font-bold text-lg`.
- **State transitions:** Angular `@for` + `@if` with CSS `transition` on background-color and border-color (no JS animation libraries).

### 3.4 Analytics Panel
- **Container:** Full-width card grid, each chart in a `--bg-surface` panel with `rounded-xl p-6`.
- **Chart styling (ngx-charts):**
  - Background: transparent.
  - Text: `--text-secondary`.
  - Grid lines: `--border-muted` at 0.5 opacity.
  - Series colors: accent emerald ramp (single-hue) + coral for negatives.
- **Legend:** Horizontal, `gap-4`, `text-xs`, font-mono numbers.
- **Interactions:** Hover tooltips with dark surface backdrop, no chart re-renders on data tick (use `animations: false` for performant updates).

### 3.5 Tables (Drivers, Repairs, Users)
- **PrimeNG `p-table`** with Aura dark preset:
  - Header row: `bg-elevated`, `text-xs uppercase tracking-wider text-secondary`.
  - Body rows: `bg-surface`, `border-b border-muted`.
  - Hover row: `bg-elevated/50`.
  - Striped: Alternating `bg-elevated/30`.
- **Sort icons:** Phosphor `caret-up` / `caret-down`, accent color on active.
- **Pagination:** Minimal — previous/next chevrons only, no page number list.

### 3.6 Buttons
| Variant | Style |
|---------|-------|
| **Primary** | `bg-accent text-white rounded-xl px-5 h-10 font-semibold` |
| **Secondary** | `bg-elevated text-primary border border-muted rounded-xl px-5 h-10` |
| **Ghost** | `text-secondary hover:text-primary hover:bg-elevated rounded-xl px-3 h-10` |
| **Danger** | `bg-danger/10 text-danger border border-danger/20 rounded-xl px-5 h-10` |
- All buttons: `transition-all duration-150`, hover `scale-[1.02]`, active `scale-[0.98]`.
- Disabled: `opacity-40 cursor-not-allowed`.

### 3.7 Modal / Dialog
- **Backdrop:** `bg-black/60 backdrop-blur-sm`.
- **Panel:** `bg-surface rounded-2xl border border-muted shadow-2xl`.
- **Padding:** `p-6` header, `px-6 py-4` body, `px-6 pb-6` footer.
- **Animation:** `scale(0.96) → scale(1)` with `opacity 0→1`, `duration-200`.

### 3.8 Form Fields
- **Input:** `bg-elevated border border-muted rounded-xl px-4 h-10 text-primary placeholder:text-muted`.
- **Focus:** `ring-1 ring-accent/50 border-accent`.
- **Select/Dropdown:** Same as input, chevron icon swapped with Phosphor `caret-down`.
- **Textarea:** Same as input, `min-h-[100px] py-3`.
- **Label:** `text-sm font-medium text-secondary mb-1.5 block`.

---

## 4. Design Principles

### 4.1 Micro-Interactions
- **Default transition:** `transition-all duration-200 ease-out`.
- **Hover scale:** `scale-[1.02]` for interactive cards/buttons.
- **Modal entry:** Scale + fade (200ms).
- **Sidebar collapse:** Width 200ms ease.
- **Status change (parking spot):** Background/border-color 300ms ease + subtle pulse on first render.
- **No motion preference:** Respect `prefers-reduced-motion` — disable all animations.

### 4.2 Typography
- **Font family:** `Inter Variable`, `system-ui`, `-apple-system`, sans-serif.
- **Scale:**
  | Element | Size | Weight |
  |---------|------|--------|
  | Hero title | `text-3xl` (30px) | 700 |
  | Section heading | `text-xl` (20px) | 600 |
  | Card title | `text-base` (16px) | 600 |
  | Body | `text-sm` (14px) | 400 |
  | Label / Meta | `text-xs` (12px) | 500 |
  | Badge / Tag | `text-[11px]` | 600 |
- **Line height:** `leading-snug` (1.3) for headings, `leading-relaxed` (1.6) for body.

### 4.3 Spacing & Layout
- **Grid:** 8px base unit (Tailwind defaults).
- **Card padding:** `p-6` (24px).
- **Section gap:** `gap-6` (24px).
- **Page margin:** `max-w-7xl mx-auto px-6`.
- **Border radius:** `rounded-xl` (12px) for cards, `rounded-lg` (8px) for small elements, `rounded-full` (9999px) for pills/avatars.

### 4.4 Shadows
| Level | Dark Mode | Light Mode |
|-------|-----------|------------|
| Card | `0 1px 3px rgba(0,0,0,0.4)` | `0 1px 3px rgba(0,0,0,0.06)` |
| Elevated | `0 4px 12px rgba(0,0,0,0.5)` | `0 4px 12px rgba(0,0,0,0.08)` |
| Modal | `0 20px 60px rgba(0,0,0,0.6)` | `0 20px 60px rgba(0,0,0,0.12)` |

### 4.5 Dark/Light Toggle
- Implement via Tailwind `dark:` variant + `class` strategy on `<html>`.
- Persist choice in `localStorage` with a service signal.
- Transition: `transition-colors duration-300` on `<body>`.

---

## 5. Migration Strategy (Skin-Only)

1. **Install Tailwind CSS** via `ng add @taleem/ngx-tailwind` or manual PostCSS config.
2. **Set PrimeNG theme** to Aura Dark preset in `angular.json` styles array.
3. **Create `_tokens.css`** with CSS custom properties for the full palette (both modes).
4. **Apply globals** in `styles.scss`: body background, font, scrollbar styling.
5. **Component-by-component:** Replace inline `style[]` arrays with Tailwind classes or CSS tokens — one component at a time, verifying visual output after each.

---

*This document is the single source of truth for all visual decisions. All UI work must conform to these tokens, principles, and specifications.*
