# Frontend Development Prompt (Angular)

## Project Context

I already have approximately **80% of the backend completed** using **NestJS** with REST APIs.

Your task is **ONLY** to build the frontend in **Angular (Latest Version)**.

Do **not** modify the backend architecture unless an API is missing. Reuse the existing APIs as much as possible.

The goal is to build a **production-ready**, **minimal**, **modern**, and **high-performance** admin dashboard for my garment shop.

---

# Objective

Create a premium web application that feels similar to:

* Linear
* Stripe Dashboard
* Vercel
* Notion
* Shadcn UI

The application should focus on:

* Excellent User Experience (UX)
* Clean User Interface (UI)
* Fast Performance
* Responsive Design
* Reusable Components
* Scalable Architecture
* Easy Maintenance

This application will be used daily by a shop owner, so every workflow should be simple and require the fewest possible clicks.

---

# Technology Stack

Use only:

* Angular (Latest)
* TypeScript
* Angular Standalone Components
* Angular Signals
* Angular Router
* RxJS (only where appropriate)
* Tailwind CSS
* Angular CDK
* Heroicons or Lucide Icons
* Three.js (npm package) for premium background and interactive animations
* Chart.js or ApexCharts for analytics

Do **not** use Bootstrap.

---

# UI / UX Guidelines

The UI should be:

* Minimal
* Elegant
* Premium
* Modern
* Responsive
* Clean
* Lightweight

Use:

* Rounded corners
* Soft shadows
* Consistent spacing
* Proper typography
* Large click areas
* Smooth transitions

Avoid flashy animations.

---

# Animation Guidelines

Use **Three.js (npm package)** only where it improves the experience.

Examples:

* Animated background on Login page
* Floating particles
* Gradient wave animation
* Interactive mouse movement
* Smooth dashboard hero animation

Rules:

* Animations should never reduce readability.
* They must not affect page performance.
* Disable or reduce animations on low-performance devices.
* Respect "prefers-reduced-motion".
* Do not animate every page.

---

# Common Design System

Create a reusable design system.

## Common Colors

Primary

Blue

Secondary

Slate

Background

White

Card

Light Gray

Border

Gray

Success

Green

Warning

Amber

Danger

Red

Text

Dark Gray

---

# Common CSS System

Create reusable utility classes.

Examples:

* Card
* Page Container
* Section Title
* Form Layout
* Grid Layout
* Status Badge
* Buttons
* Input Styles
* Tables
* Empty States
* Loading States
* Dialog Styles
* Drawer Styles

Avoid duplicated CSS.

---

# Common Components

Create reusable shared components before developing feature modules.

Examples:

* Button
* Input
* Select
* Search Box
* Textarea
* Checkbox
* Radio Button
* Toggle
* Date Picker
* Data Table
* Pagination
* Breadcrumb
* Card
* Modal
* Drawer
* Confirmation Dialog
* Toast Notification
* Loading Spinner
* Skeleton Loader
* Empty State
* Error State
* Status Badge
* Avatar
* Page Header
* Statistic Card
* Filter Panel
* File Upload
* Image Upload
* QR Component (future ready)

These components should be reusable across the application.

---

# Layout Components

Create reusable layouts.

* Authentication Layout
* Dashboard Layout
* Sidebar
* Top Navbar
* Footer
* Page Wrapper
* Mobile Navigation

---

# API Layer

Create a proper API layer.

* Authentication Service
* Product Service
* Customer Service
* Billing Service
* Report Service
* Dashboard Service
* Inventory Service
* Income Expense Service

Use:

* HTTP Interceptors
* JWT Token Handling
* Global Error Handling
* Loading Interceptor
* Refresh Token Support (if backend provides it)

---

# State Management

Prefer:

* Angular Signals

Use RxJS only where necessary.

Avoid unnecessary complexity.

---

# Folder Structure

```
src/

app/

core/
    api/
    auth/
    interceptors/
    guards/
    models/
    services/

shared/
    components/
    directives/
    pipes/
    layouts/
    constants/
    utils/

features/
    auth/
    dashboard/
    products/
    customers/
    billing/
    inventory/
    reports/
    income-expense/

assets/

styles/
```

---

# Forms

Use Reactive Forms.

Include:

* Validation
* Helpful error messages
* Loading buttons
* Duplicate submission prevention
* Proper error handling

---

# Performance

* Lazy Loading
* OnPush Change Detection
* TrackBy
* Image Lazy Loading
* Virtual Scroll
* Code Splitting
* Tree Shaking
* Minimize API Calls
* Reuse Components

---

# Accessibility

* Keyboard Navigation
* Focus States
* ARIA Labels
* Screen Reader Friendly
* Responsive Typography

---

# Development Rules

Before implementing any feature:

1. Analyze existing backend APIs.
2. Reuse existing endpoints.
3. Do not assume APIs.
4. If an API is missing, document it separately before implementation.

Keep the code:

* Clean
* Reusable
* Scalable
* Well structured
* Strict TypeScript
* ESLint compliant
* Prettier formatted

---

# Development Roadmap (Phase-wise)

## Phase 1 – Project Setup

* Initialize Angular project
* Configure Tailwind CSS
* Configure routing
* Configure layouts
* Configure themes
* Configure shared styles
* Configure API layer
* Configure authentication flow
* Configure Three.js animation utilities
* Setup folder structure

Deliverable:
A clean project foundation.

---

## Phase 2 – Shared Components & Design System

Build all reusable components.

* Buttons
* Forms
* Tables
* Dialogs
* Toasts
* Cards
* Skeletons
* Badges
* Loaders
* Common CSS utilities

Deliverable:
Complete reusable UI library.

---

## Phase 3 – Authentication

Pages:

* Login
* Forgot Password (UI)

Features:

* JWT Login
* Route Guards
* Session Persistence
* Login Animation using Three.js

Deliverable:
Complete authentication module.

---

## Phase 4 – Dashboard

Build dashboard.

Include:

* Summary Cards
* Today's Income
* Today's Expense
* Profit
* Pending Payments
* Low Stock
* Charts
* Recent Transactions

Deliverable:
Interactive business dashboard.

---

## Phase 5 – Product & Inventory

Pages:

* Product List
* Add Product
* Edit Product
* View Product
* Stock Management
* Stock History

Deliverable:
Complete inventory management.

---

## Phase 6 – Customer Module

Pages:

* Customer List
* Customer Details
* Purchase History
* Outstanding Balance
* Payment History

Deliverable:
Customer management system.

---

## Phase 7 – Billing Module

Pages:

* Create Invoice
* Invoice List
* Invoice Preview
* Invoice Details

Features:

* Live Calculation
* Pending Amount
* Paid Amount
* Print
* PDF
* WhatsApp Share

Deliverable:
Complete billing workflow.

---

## Phase 8 – Income & Expense

Pages:

* Daily Book
* Income
* Expense

Features:

* Cash
* Online
* Daily Summary
* Filters
* Charts

Deliverable:
Digital accounting module.

---

## Phase 9 – Reports & Analytics

Reports:

* Daily
* Weekly
* Monthly
* Customer Outstanding
* Product Stock
* Sales

Charts

Export support (future-ready)

Deliverable:
Reporting dashboard.

---

## Phase 10 – Final Polish

* Performance optimization
* Responsive testing
* Accessibility improvements
* UI consistency review
* Bug fixes
* Code cleanup
* Final documentation

Deliverable:
Production-ready application.

---

# Final Goal

The completed application should feel like a premium SaaS product rather than a traditional admin panel. Every screen should be polished, responsive, fast, and built using reusable architecture and common components to simplify future development and maintenance.
