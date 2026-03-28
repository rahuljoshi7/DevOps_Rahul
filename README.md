# BF-Fabric — Full Stack E-Commerce Application

A production-ready full-stack e-commerce web application built with **React** (frontend) and **Node.js/Express** (backend), using **MongoDB** as the database. Includes an admin panel, user dashboard, cart, wishlist, checkout with Braintree payments, and a complete CI/CD pipeline.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Seed Data](#seed-data)
- [Docker Setup](#docker-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Endpoints](#api-endpoints)
- [Login Credentials](#login-credentials)
- [Version History](#version-history)

---

## ✨ Features

### Shop (Customer)
- Browse products by category or price filter
- Product detail page with image slider, reviews & ratings
- Add to cart / wishlist
- Checkout with Braintree payment gateway (Sandbox)
- Order history in user dashboard
- User profile & password management
- Login / Signup with JWT authentication

### Admin Panel
- Dashboard with sales overview
- Manage categories (add, edit, delete with image upload)
- Manage products (add, edit, delete with 2 image upload)
- Manage orders (update status, delete)
- Customize homepage slider images

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 16, React Router v5, Bootstrap 4, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Payments | Braintree (Sandbox) |
| File Upload | Multer |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions, Jenkins |

---

## 📁 Project Structure

```
BF-Fabric/
├── src/                          # React frontend
│   ├── components/
│   │   ├── admin/                # Admin panel components
│   │   │   ├── categories/       # Category management
│   │   │   ├── dashboardAdmin/   # Admin dashboard & customize
│   │   │   ├── orders/           # Order management
│   │   │   └── products/         # Product management
│   │   └── shop/                 # Customer-facing components
│   │       ├── auth/             # Login, Signup, Protected routes
│   │       ├── dashboardUser/    # User profile, orders, settings
│   │       ├── home/             # Homepage, product grid, slider
│   │       ├── order/            # Checkout page
│   │       ├── partials/         # Navbar, Footer, Cart modal
│   │       ├── productDetails/   # Product detail page & reviews
│   │       └── wishlist/         # Wishlist page
│   ├── App.js
│   └── index.js
├── server/                       # Express backend
│   ├── config/
│   │   ├── db.js                 # MongoDB connection (legacy)
│   │   ├── function.js           # Helper functions
│   │   ├── keys.js               # JWT secret config
│   │   └── uploadFolderCreateScript.js
│   ├── controller/               # Route handler logic
│   │   ├── auth.js               # Signup, Signin
│   │   ├── braintree.js          # Payment token & processing
│   │   ├── categories.js         # Category CRUD
│   │   ├── customize.js          # Slider image management
│   │   ├── orders.js             # Order CRUD
│   │   ├── products.js           # Product CRUD, reviews
│   │   └── users.js              # User profile, password
│   ├── middleware/
│   │   └── auth.js               # JWT auth, isAdmin middleware
│   ├── models/                   # Mongoose schemas
│   │   ├── categories.js
│   │   ├── customize.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── routes/                   # Express routers
│   │   ├── auth.js
│   │   ├── braintree.js
│   │   ├── categories.js
│   │   ├── customize.js
│   │   ├── orders.js
│   │   ├── products.js
│   │   └── users.js
│   ├── public/uploads/           # Uploaded images (auto-created)
│   │   ├── products/
│   │   ├── categories/
│   │   └── customize/
│   ├── app.js                    # Express app entry point
│   ├── seed.js                   # Database seed script
│   └── package.json
├── .github/workflows/
│   └── ci.yml                    # GitHub Actions CI/CD
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # App + MongoDB services
├── Jenkinsfile                   # Jenkins pipeline
├── .env.example                  # Environment variable template
└── package.json                  # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local install or Docker)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/chan907/DevOps.git
cd DevOps
```

### 2. Set up environment variables

```bash
cp .env.example server/.env
```

Edit `server/.env` and fill in your values (see [Environment Variables](#environment-variables)).

### 3. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 4. Seed the database

```bash
cd server
npm run seed
```

---

## 🔐 Environment Variables

Create `server/.env` based on `.env.example`:

```env
PORT=8000
DATABASE=mongodb://localhost:27017/bffabric

JWT_SECRET=your_random_secret_key

BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key

REACT_APP_API_URL=http://localhost:8000
```

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 8000) |
| `DATABASE` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `BRAINTREE_MERCHANT_ID` | Braintree sandbox merchant ID |
| `BRAINTREE_PUBLIC_KEY` | Braintree sandbox public key |
| `BRAINTREE_PRIVATE_KEY` | Braintree sandbox private key |
| `REACT_APP_API_URL` | Backend URL used by React frontend |

> Get Braintree sandbox credentials free at https://sandbox.braintreegateway.com

---

## ▶️ Running the App

### Without Docker

**Terminal 1 — Backend:**
```bash
cd server
npm run start:dev
```

**Terminal 2 — Frontend:**
```bash
npm start
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### With Docker

```bash
docker-compose up --build
```

App available at http://localhost:8000

---

## 🌱 Seed Data

The seed script populates the database with sample data:

```bash
cd server
npm run seed
```

This creates:
- **2 users** (1 admin, 1 customer)
- **4 categories** — Men, Women, Kids, Fabric
- **10 products** across all categories

### Login Credentials (after seeding)

| Role | Email | Password |
|---|---|---|
| Admin | admin@bffabric.com | admin123 |
| Customer | customer@bffabric.com | customer123 |

> To create your own admin: set `userRole: 1` in `server/seed.js` or directly in the database.

---

## 🐳 Docker Setup

### Start MongoDB only

```bash
docker run -d --name mongodb -p 27017:27017 mongo:6
```

### Start full stack

```bash
docker-compose up --build
```

### Stop containers

```bash
docker-compose down
```

> After restarting your PC, run `docker start mongodb` to bring MongoDB back up.

---

## ⚙️ CI/CD Pipeline

### GitHub Actions (`.github/workflows/ci.yml`)

Runs automatically on every push and pull request to `main`:

| Job | Steps |
|---|---|
| Frontend | Install → Test → Build → Upload artifact |
| Backend | Install → Validate |
| Docker | Build image (on `main` branch only) |

### Jenkins (`Jenkinsfile`)

Self-hosted pipeline with stages:
1. Install Frontend Dependencies
2. Install Backend Dependencies
3. Build Frontend (`npm run build`)
4. Test Frontend
5. Docker Build
6. Deploy (`docker-compose up`)

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/signup` | Register new user |
| POST | `/api/signin` | Login |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/product/all-product` | Get all products |
| POST | `/api/product/single-product` | Get single product |
| POST | `/api/product/add-product` | Add product (admin) |
| POST | `/api/product/edit-product` | Edit product (admin) |
| POST | `/api/product/delete-product` | Delete product (admin) |
| POST | `/api/product/product-by-category` | Filter by category |
| POST | `/api/product/product-by-price` | Filter by price |
| POST | `/api/product/cart-product` | Get cart products |
| POST | `/api/product/wish-product` | Get wishlist products |
| POST | `/api/product/add-review` | Add review |
| POST | `/api/product/delete-review` | Delete review |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/category/all-category` | Get all categories |
| POST | `/api/category/add-category` | Add category (admin) |
| POST | `/api/category/edit-category` | Edit category (admin) |
| POST | `/api/category/delete-category` | Delete category (admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/order/get-all-orders` | Get all orders (admin) |
| POST | `/api/order/order-by-user` | Get orders by user |
| POST | `/api/order/create-order` | Create order |
| POST | `/api/order/update-order` | Update order status (admin) |
| POST | `/api/order/delete-order` | Delete order (admin) |

### Users
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/signle-user` | Get user by ID |
| POST | `/api/user/edit-user` | Update profile |
| POST | `/api/user/change-password` | Change password |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/braintree/get-token` | Get Braintree client token |
| POST | `/api/braintree/payment` | Process payment |

---

## 📝 Version History

| Version | Changes |
|---|---|
| v1.0 | Initial release |
| v1.1 | SEO meta tags added |
| v1.2 | Title & favicon updated |
| v1.3 | Google Fonts integrated |
| v1.4 | Loading placeholder added |
| v1.5 | Structured data implemented |
| v2.0 | Full DevOps overhaul — Docker, CI/CD, bug fixes, ₹ currency, UX improvements, seed data, security fixes |
