Finora – Finance Management SaaS

A full-stack Finance Management SaaS platform that helps users track expenses, manage accounts, and visualize financial insights.

Built with a scalable architecture using modern web technologies.

🔗 Live Demo:https://finance-saas-rust.vercel.app/


---
## 📸 Screenshots

### Demo Video
![Dashboard](./screenshots/dashboard.mp4)



---

## 📌 Overview

FinTrack is a modern financial dashboard designed to simplify personal finance management.  
Users can securely log transactions, categorize expenses, and gain actionable insights through interactive data visualization.

The system is designed with a SaaS architecture mindset — supporting authentication, modular services, and scalable deployment.

---

## 🚀 Key Features

- 🔐 Secure User Authentication
- 💳 Add, Edit & Delete Transactions
- 📊 Real-Time Financial Analytics Dashboard
- 📅 Monthly & Category-Based Expense Tracking
- 📈 Interactive Charts & Visualizations
- 🧾 Income vs Expense Summary
- ☁️ Cloud Deployment Ready
- 🔄 Persistent Database Storage

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Zustand (State Management)
- TailwindCSS
- Chart Library (e.g., Recharts)
- Next.js

### Backend
- Hono.js
- Neon(PostgreSql)
- JWT Authentication
- Clerk

### DevOps & Tools
- Vercel (Frontend Deployment)
- Git & GitHub

---

## 🏗️ System Architecture

The application follows a client-server architecture:

- The React frontend communicates with REST APIs.
- The Hono backend handles authentication, business logic, and transaction aggregation.
- Neon stores user and financial data securely.
- Zustand manages global state efficiently on the frontend.

The backend is designed to be modular and easily scalable for future microservices expansion.

---



## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/fintrack.git
cd finora
