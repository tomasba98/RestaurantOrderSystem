# 🍽️ Restaurant Order System

A restaurant order management system developed with **ASP.NET Core** and **PostgreSQL**, following **Clean Architecture** principles and design patterns for scalability and maintainability.

The system allows **waiters** to place orders from different terminals, while the **kitchen** receives and manages them in real-time.  
It also tracks **product stock**, manages tables, and enforces business rules to ensure data consistency.

---

## 🐳 Run the Project with Docker

### Prerequisites
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

### Start the stack
```bash
docker-compose up --build
```

**Services:**
- 🧩 API: `http://localhost:4332/swagger`  
- 💻 React Client: `http://localhost:5173`  
- 🗄️ PostgreSQL: port `5433`

---

## 🧠 Business Logic Rules
- Orders from **closed sessions** cannot be modified or deleted.  
- **Paid orders** cannot be deleted.  
- All operations are validated through business-layer services.

---

## 🚀 Features

### 🧩 Core Functionality
- Full CRUD for Orders, Products, Tables, and Sessions.  
- Order workflow with states: *Confirmed → InKitchen → Ready → Served → Paid*.  
- Real-time kitchen dashboard for order monitoring.  
- Stock management integrated with each order.  
- Role-based authentication and authorization using JWT.  
- Accessible from multiple devices over local network (LAN) — fully offline capable.

---

### ⚙️ Backend Highlights
- **ASP.NET Core 8.0 (C# 12)** – RESTful API development.  
- **Entity Framework Core + PostgreSQL** – ORM and database management.  
- **AutoMapper** – Clean mapping between entities and DTOs.  
- **Custom exceptions** for robust error handling (`OrderNotFoundException`, `OrderNotPaidException`, etc.).  
- **Serilog** – Structured logging for better observability.  
- **Dependency Injection** – Built-in DI container for all layers.  
- **Unit of Work** pattern using `DbContext.SaveChangesAsync()` for atomic operations.

---

### 🧠 In-Memory Caching
Improved performance by implementing caching for frequently accessed data, reducing database queries by up to **50%**.
(Implementation details intentionally omitted from README.)

---

## 🏗️ Architecture

**Pattern:** N-Layer + Generic Repository + Service Layer  

### 📁 Backend Structure
```
Restaurant-Backend/
├── Controllers/          → Presentation layer (API endpoints)
├── Services/             → Business logic layer
│   ├── GenericService.cs → Reusable CRUD logic
│   ├── OrderService.cs   → Domain-specific rules
│   └── ProductService.cs
├── DataAccess/           → Generic repository (GenericDAO)
├── Entities/             → Domain models (Order, Product, Table)
├── Context/              → EF Core DbContext
├── Models/               → DTOs (Request/Response)
└── Utils/                → Logging, encryption, exceptions
```

**Advantages:**
- Separation of concerns  
- Highly testable and maintainable  
- Minimal code duplication with GenericDAO/Service  
- Consistent error and transaction handling  

---

### 📦 Client Architecture
```
restaurant-client/
│
├── public/
│
├── src/
│   ├── assets/              # Images, logos, and fonts
│   ├── components/          # Reusable UI components (Buttons, NavBar, etc.)
│   ├── pages/               # Main views (Home, Orders, Menu, etc.)
│   ├── layout/              # Global layouts such as MainLayout and AdminLayout
│   ├── services/            # API logic and communication (axios, fetch, etc.)
│   ├── types/               # Global TypeScript typings (interfaces, DTOs, entities)
│   ├── hooks/               # Custom hooks (useAuth, useOrders, etc.)
│   ├── theme/               # MUI theme configuration (`theme.ts`)
│   ├── context/             # React contexts (AuthContext, CartContext, etc.)
│   ├── utils/               # Helper and utility functions
│   ├── App.tsx              # Routing and layout entry point
│   └── main.tsx             # Root render entry (renders React into #root)
│
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 🔐 Authentication & Authorization (JWT)
- Login generates JWT with `UserId`, `UserName`, and `Role` claims.  
- Passwords hashed securely with **BCrypt**.  
- Role-based protection using `[Authorize(Roles = "Admin,Manager,Waiter,Kitchen")]`.  

---

## 🧰 Technologies Used
- **ASP.NET Core 8.0 / C# 12**  
- **Entity Framework Core**  
- **PostgreSQL**  
- **AutoMapper**  
- **Serilog**  
- **BCrypt / JWT**  
- **Docker & Docker Compose**

---

## 🧩 System Design

**Local Web Application (On-Premise)**
- Runs on a PC with both API and database.  
- Accessible from other restaurant PCs via LAN.  
- Operates fully offline (no Internet dependency).

---

## 📈 Performance Results
- ✅ 50% reduction in DB load with caching (IMemoryCache).  
- ✅ Optimized EF Core queries with `Include()` and `AsNoTracking()`.  
- ✅ Clean API architecture with minimal coupling.
