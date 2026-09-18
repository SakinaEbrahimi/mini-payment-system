# Mini Payment 💳

A simple full-stack payment simulation project built for practicing backend concepts such as **MongoDB Transactions, Idempotency, Order Management, and Payment Processing**.

## 🚀 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* MongoDB Transactions
* REST API

### Frontend

* React
* Bootstrap
* React Router
* React Hot Toast

---

## 📌 Features

### Authentication

* User registration
* User login
* JWT-based authentication
* User profile
* User balance

### Products

* View all products
* View product details
* Buy products
* Stock management

### Orders

* Create orders
* View user's orders
* View order details
* Cancel pending orders

### Payments

* Pay for an order
* Random payment success/failure simulation
* Payment history
* Payment by order
* Idempotency key to prevent duplicate payments
* MongoDB transaction for payment processing

---

## 🔄 Application Flow

```text
Register / Login
       ↓
    Products
       ↓
      Buy
       ↓
     Order
       ↓
   Pay Order
       ↓
    Payment
```

A payment operation checks the user's balance, processes the payment, and updates the related order and payment information inside a MongoDB transaction.

---

## 🔐 Idempotent Payment

The payment API uses an **idempotency key** to prevent the same payment request from being processed multiple times.

Example:

```text
Client
  │
  │ Payment Request + Idempotency Key
  ▼
Backend
  │
  ├── Check existing payment
  │
  ├── If already processed → return existing result
  │
  └── Otherwise → process payment
```

This helps protect the payment flow from duplicate requests caused by retries or accidental multiple clicks.

---

## 💾 MongoDB Transaction

Payment processing uses a MongoDB transaction to keep related database operations consistent.

For example:

```text
Start Transaction
      │
      ├── Check user balance
      ├── Check order
      ├── Process payment
      ├── Update user balance
      ├── Update order status
      │
      ▼
   Commit
```

If an operation fails, the transaction is aborted and the database changes are rolled back.

---

## 📁 Project Structure

```text
mini-payment/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── product/
│   │   │   ├── order/
│   │   │   └── payment/
│   │   │
│   │   ├── middleware/
│   │   ├── shared/
│   │   └── app.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd mini-payment
```

---

# Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/mini-payment

JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create your environment file if required:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

| Variable     | Description               |
| ------------ | ------------------------- |
| `PORT`       | Backend server port       |
| `MONGO_URI`  | MongoDB connection string |
| `JWT_SECRET` | Secret key used for JWT   |

### Frontend

| Variable           | Description          |
| ------------------ | -------------------- |
| `VITE_BACKEND_URL` | Backend API base URL |

> Do not commit `.env` files or sensitive credentials to GitHub.

---

## 🧪 Main API Resources

The project provides REST APIs for:

```text
/auth
/users
/products
/orders
/payments
```

Example API flow:

```text
POST   /auth/register
POST   /auth/login

GET    /products
GET    /products/:id
POST   /products/:id/buy

GET    /orders
GET    /orders/:id
PATCH  /orders/:id/cancel

GET    /payments
GET    /payments/:id
POST   /payments/:id/pay
```

> Exact routes may vary depending on the backend implementation.

---

## 🖥️ Main Frontend Pages

The frontend contains pages for:

* Register
* Login
* Products
* Product Details
* Orders
* Order Details
* Payments
* Payment Details
* User Profile

---

## 🛡️ Important Backend Concepts

This project was mainly created to practice real-world backend concepts:

* REST API design
* Authentication and authorization
* MongoDB/Mongoose
* Database relationships
* Transactions
* Idempotency
* Error handling
* Async operations
* Stock management
* Payment processing
* Concurrent requests
* Frontend ↔ Backend integration

---

## 🌐 Deployment

The application can be deployed as two separate services while keeping both applications in the same repository:

```text
GitHub Repository
       │
       ├── backend  → Render
       │
       └── frontend → Vercel
```

MongoDB can be hosted using **MongoDB Atlas**.

Production environment variables should be configured separately on the deployment platforms.

---

## 🎯 Project Purpose

This project is a practical learning project focused on understanding how a basic payment system works from both the frontend and backend sides.

The main goal is to practice **transactional database operations, idempotent payments, order management, authentication, and full-stack application deployment**.

---

## 👩‍💻 Author

**Sakina Ebrahimi**

LinkedIn: https://www.linkedin.com/in/sakina-ebrahimi/
