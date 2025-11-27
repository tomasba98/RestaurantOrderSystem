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
- **Full CRUD** for Orders, Products, Tables, and Sessions.
- **Order workflow with states**: Confirmed → InKitchen → Ready → Served → Paid.
- **Real-time kitchen dashboard** for order monitoring.
- **Stock management** integrated with each order.
- **Role-based authentication** and authorization using JWT.

---

## 🎨 Frontend Highlights
- **React + TypeScript** with clean architecture and decoupled components.
- **useCallback / useMemo** to avoid unnecessary re-renders and improve performance.
- **Custom Hooks** to separate UI from business logic.
- **Clean Architecture + Dependency Injection** separating UI, domain, and data layers.
- **Use Cases** implementing business logic independently from UI.
- **Context API** for authentication with **role validation**.
- **Drag & Drop components** (e.g., DraggableTable) for enhanced UX.

---

## ⚙️ Backend Highlights
- **ASP.NET Core 8.0 (C# 12)** for RESTful API development.
- **Entity Framework Core + PostgreSQL** for ORM and database access.
- **Repository Pattern** using generic interfaces: IGenericDao<TEntity>, IGenericService<TEntity>.
- **Layered architecture**: Controllers → Services → DataAccess.
- **LINQ clean queries** for more readable data access.
- **Eager loading** with Include() and ThenInclude().
- **AsNoTracking()** for optimized read-only queries.
- **IMemoryCache** for in-memory caching and reduced DB load.
- **Cascade / Restrict deletion rules** depending on relationships.
- **Custom Exceptions** (OrderNotFoundException, OrderNotPaidException, etc.).
- **Serilog** for structured logging.
- **Unit of Work** with DbContext.SaveChangesAsync().

---

## 🧠 In-Memory Caching
- **Performance optimization** by caching frequently accessed results, reducing DB load by up to **50%**.
"""

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
