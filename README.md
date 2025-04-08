# 🍽️ Restaurant Order System

Este es un sistema de gestión de comandas para restaurantes desarrollado con **ASP.NET Core**. Permite que mozos y cajeros carguen pedidos desde distintas terminales, y que cocina reciba las órdenes en tiempo real en una pantalla.

---

## 🚀 Características principales

- 🧾 Creación y gestión de pedidos por mesa
- 🍳 Visualización de órdenes en tiempo real desde cocina
- 💵 Generación de tickets para el cobro
- 📦 Administración de productos
- 📡 Accesible desde múltiples PCs en red local (LAN)
- 💻 Funcionamiento 100% local (sin necesidad de internet)

---

## 🛠️ Tecnologías utilizadas

- **ASP.NET Core** (WebApp)
- **Entity Framework Core**
- **PostgreSQL**
- **Kestrel o IIS como servidor local**

---

## 🧱 Arquitectura del sistema

1️⃣ **Aplicación Web Local (On-Premise)**  
- Se ejecuta en una PC con el servidor web y base de datos.  
- Accesible desde otras PCs del restaurante conectadas por red LAN.  
- Pensado para operar sin conexión a Internet.


---

📁 Restaurant-Backend```
├── Controllers/         → Controladores de la API\
├── Entities/            → Modelos de dominio\
├── Services/            → Lógica de negocio - inyeccion de dependecia\
├── appsettings.json     → Configuración\
└── Program.cs / Startup.cs\

---

## 📍 Estado actual del proyecto
- ✅ Funcionalidad básica de pedidos y cocina

- ✅ Módulo de productos

- 🔜 Login de usuarios y control de acceso

- 🔜 Reportes de ventas

- 🔜 Interfaz para celulares o tablets
