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
- **Complete CRUD** for Orders (with OrderDetails), Products, Tables, Sessions, and User Management.
- **Order workflow with states**: Confirmed → InKitchen → Ready → Served → Paid (or Canceled).
- **Real-time kitchen dashboard** for live order monitoring.
- **Role-based authentication** with JWT authorization.
- **User profile management** and token validation.

---

## 🎨 Frontend Architecture
- **React + TypeScript** with Clean Architecture and strict separation of UI, domain, and data layers.
- **Custom Dependency Injection container (ContainerDI)** for binding repositories and use cases.
- **Domain-driven Use Cases** encapsulating business logic independently from UI.
- **Custom Hooks** for domain logic isolation (e.g., `useAuth`, `useRoleCheck`, `useOrders`).
- **Authentication Context** with role validation.
- **Theme Context** supporting light/dark mode with localStorage persistence.
- **ProtectedRoute** for route-level authorization control.
- **Global Error Boundary** for graceful error fallback.
- **Axios interceptors** for automatic token handling and global error interception.
- **Drag & Drop interactions** using @dnd-kit for enhanced UX.

---

## ⚙️ Backend Architecture
- **ASP.NET Core 8.0 (C# 12)** for RESTful API development.
- **Entity Framework Core + PostgreSQL** with Repository Pattern and generic interfaces.
- **Layered architecture**: Controllers → Services → DataAccess.
- **BaseController** pattern for shared controller functionality.
- **Optimized LINQ queries** with `Include`, `ThenInclude`, and `AsNoTracking`.
- **IMemoryCache** for reducing DB load on frequent queries.
- **Custom domain exceptions** (e.g., `OrderNotFoundException`, `OrderNotPaidException`).
- **Serilog** for structured logging with request tracking and performance metrics.
- **Unit of Work** using `DbContext.SaveChangesAsync()`.
- **AutoMapper** for clean entity-to-DTO mapping.
- **Audit logging** for all entity changes with user tracking.
- **EntityBase** with automatic fields (`CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`).
- **CurrentUserService** exposing authenticated user context.
- **Global error handler** with centralized exception logging.
- **CORS configuration** for frontend integration.
- **Automatic database migrations** on startup.

---

## 🐳 Infrastructure
- **Docker & Docker Compose** for full containerization.
- **Separate Dockerfiles** for backend and frontend.
- **PostgreSQL container** with health checks.
- **Multi-service orchestration** with dependency management.

---

## 🧠 In-Memory Caching
- **Performance optimization** by caching frequently accessed results, reducing DB load by up to **50%**.

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

## LICENSE
- This project is for evaluation purposes only. See LICENSE for details.
