# Restaurant Order System (In Progress...)

This is a restaurant order management system developed with **ASP.NET Core**. It allows waiters and cashiers to place orders from different terminals, and the kitchen to receive orders in real-time on a display. The system manages the registration of orders placed for each table and maintains a stock of product/plates, tracking their availability.

# Business Logic
- Orders from a session that has already ended cannot be modified or deleted.
- Paid orders cannot be deleted.

---

## Key Features
- Use of AutoMapper for object mapping.
- Implementation of custom exceptions for effective error handling.
- Ability to create and manage orders per table.
- Real-time order display in the kitchen
- Product management  
- Accessible from multiple PCs over a local network (LAN)  
- Fully local operation (no internet required)  

---

## Technologies Used

- **ASP.NET Core** (WebApp)  
- **Entity Framework Core**  
- **PostgreSQL**  
- **Kestrel or IIS as local server**  

---

## System Architecture

**Local Web Application (On-Premise)**  
- Runs on a PC with the web server and database.  
- Accessible from other restaurant PCs connected via LAN.  
- Designed to operate without an Internet connection.  

---

📁 Restaurant-Backend  
├── Controllers/         → API controllers  
├── Entities/            → Domain models  
├── Services/            → Business logic (dependency injection)  
├── appsettings.json     → Configuration  
└── Program.cs / Startup.cs  

---

<!-- ## 📍 Current Project Status  
- ✅ Basic ordering and kitchen functionality  
- ✅ Product module  
- 🔜 User login and access control  
- 🔜 Sales reports  
- 🔜 Mobile or tablet interface --!>
"""
