# PRD.md

# Product Requirements Document (PRD)

## Project Title
**Tulshi Garment Shop Management System**

## Version
1.0

## Product Overview

Tulshi Garment Shop Management System is a web-based application designed to digitize the daily operations of a men's clothing store. The system will help the shop owner manage inventory, daily income & expenses, customer records, billing, outstanding payments, and business analytics from a single dashboard.

The primary goal is to replace manual bookkeeping and billing with an easy-to-use digital solution.

---

# Objectives

- Digitize daily business operations.
- Track daily income and expenses.
- Manage inventory and stock.
- Generate customer bills.
- Track customer payment history and pending balances.
- Send invoices directly through WhatsApp.
- Provide business insights through dashboards.

---

# User Roles

## Admin (Shop Owner)

The system will initially support a single Admin user.

Admin can:

- Login securely
- Manage products
- Manage inventory
- Record income & expenses
- Create customer bills
- View customer history
- Track pending payments
- View dashboard reports
- Send bills through WhatsApp

---

# Authentication

## Login

Fields

- Username / Email
- Password

Features

- Secure authentication
- Remember Login (optional)
- Logout

---

# Dashboard

The dashboard should provide a quick overview of the business.

## Dashboard Cards

### Sales

- Today's Sales
- This Month Sales
- Total Sales

### Income

- Today's Income
- Monthly Income
- Total Income

### Expense

- Today's Expense
- Monthly Expense
- Total Expense

### Profit

Profit = Income - Expense

Display

- Today Profit
- Monthly Profit
- Total Profit

### Pending Payments

Display

- Total Pending Amount
- Number of Customers with Pending Payments

### Inventory

Display

- Total Products
- Total Stock
- Low Stock Products

---

# Module 1
## Income & Expense Management

The owner currently maintains a physical daily book.

The website should replace this manual process.

---

## Features

Admin can add daily entries.

Each entry contains:

| Field | Type |
|---------|------|
| Date | Date |
| Type | Income / Expense |
| Category | Dropdown |
| Payment Mode | Cash / Online |
| Amount | Number |
| Description | Text |
| Notes | Optional |

---

## Income Categories

Examples

- Garment Sales
- Other Income

---

## Expense Categories

Examples

- Shop Rent
- Electricity
- Salary
- Transport
- Purchase
- Miscellaneous

---

## Filters

- Today
- Yesterday
- Weekly
- Monthly
- Custom Date

---

## Reports

Show

- Total Cash Income
- Total Online Income

Show

- Total Cash Expense
- Total Online Expense

Net Profit

Export PDF (Future)

Export Excel (Future)

---

# Module 2
## Product Management

Admin should be able to manage products.

---

## Add Product

Required Fields

| Field | Required |
|---------|----------|
| Serial Number | Yes (Unique) |
| Product Name | Yes |
| Category | Yes |
| Brand | Optional |
| Size | Optional |
| Color | Optional |
| Purchase Price | Yes |
| Selling Price | Yes |
| Stock Quantity | Yes |
| Image | Optional |

---

## Business Rule

Serial Number must be unique.

No duplicate serial numbers are allowed.

---

## Product List

Display

- Image
- Serial Number
- Product Name
- Category
- Selling Price
- Stock
- Status

Actions

- View
- Edit
- Delete

---

## Stock Management

Admin can

- Increase Stock
- Reduce Stock
- Adjust Stock

Maintain stock history.

---

## Low Stock Alert

If stock reaches below predefined quantity.

Example

Stock < 5

Display warning on Dashboard.

---

# Module 3
## Customer Management

Store customer information.

---

## Customer Fields

- Customer Name
- Mobile Number
- Address (Optional)

---

## Customer Dashboard

Display

- Total Purchases
- Total Paid
- Total Pending
- Number of Bills

---

## Customer History

Show

- Every Bill
- Date
- Amount
- Paid Amount
- Pending Amount

---

# Module 4
## Billing System

Admin should be able to generate invoices.

---

## Bill Information

Invoice Number

Auto Generated

Date

Customer

Products

Quantity

Price

Discount

Subtotal

Grand Total

Paid Amount

Pending Amount

Payment Mode

Cash

Online

Split Payment (Future)

---

## Business Rules

Pending Amount

Grand Total - Paid Amount

If pending amount exists

Status = Partial Paid

If paid completely

Status = Paid

---

# Invoice Design

Invoice should contain

Shop Logo

Shop Name

Shop Address

Customer Details

Product List

Quantity

Price

Total

Paid Amount

Pending Amount

Thank You Message

QR Code (Future)

---

# Module 5
## WhatsApp Invoice Sharing

After bill generation

Admin should be able to send invoice directly to customer.

Supported

- PDF Invoice
- Invoice Image (optional)

Button

Send via WhatsApp

Flow

Generate Invoice

↓

Create PDF

↓

Open WhatsApp

↓

Attach Invoice

↓

Send

---

# Module 6
## Payment Tracking

Every customer may pay partially.

System should maintain payment history.

---

Example

Bill Total

₹5,000

Paid

₹2,000

Pending

₹3,000

Later customer pays ₹1,500

Pending becomes

₹1,500

All payment history should be stored.

---

# Module 7
## Reports

Reports include

Daily Sales

Monthly Sales

Income Report

Expense Report

Profit Report

Customer Outstanding Report

Stock Report

Top Selling Products

---

# Search & Filters

Products

Search by

- Serial Number
- Product Name

Customer

Search by

- Name
- Mobile Number

Bills

Search by

- Invoice Number
- Customer
- Date

---

# Notifications

Dashboard should notify

- Low Stock
- Pending Customer Payments
- Today's Sales Summary

---

# Future Features

- Barcode Scanner
- Barcode Printing
- GST Billing
- Supplier Management
- Purchase Management
- Multi User Support
- SMS Integration
- WhatsApp API Integration
- Expense Attachments
- Sales Analytics Charts
- Backup & Restore
- Mobile App
- Customer Loyalty Program
- Discount Coupons

---

# Suggested Technology Stack

Frontend

- React.js
- TypeScript
- Tailwind CSS
- ShadCN UI

Backend

- Node.js
- NestJS

Database

- PostgreSQL

ORM

- Prisma ORM

Authentication

- JWT Authentication

File Storage

- Local Storage / AWS S3

PDF

- PDFKit / Puppeteer

WhatsApp

- WhatsApp Click-to-Chat (Phase 1)
- WhatsApp Business API (Phase 2)

Deployment

- Docker
- Nginx
- VPS / AWS

---

# Success Criteria

- Reduce manual bookkeeping.
- Manage inventory digitally.
- Generate invoices within one minute.
- Track customer outstanding payments accurately.
- Maintain complete product stock records.
- Display real-time business dashboard.
- Enable quick invoice sharing through WhatsApp.