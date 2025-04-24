##backend
create a virtual envoronment
#venv 
#pip innstall djangorestframework
#pip install django-rest-knox
#pip install django-cors-headers

# 🧾 Payroll Management System

A complete employee payroll and leave management system built with **React**, **Django REST Framework**, and **PostgreSQL**.

## 🚀 Features

- Employee login and registration with unique employee ID
- Apply for leave (Casual, Sick, Earned)
- Admin panel to view and update leave requests
- Salary slip generation and PDF download
- JWT token-based authentication (via Knox)
- Role-based dashboards for employees and admins

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, Axios
- **Backend:** Django, Django REST Framework, Django Knox
- **Database:** PostgreSQL
- **PDF Generation:** ReportLab / xhtml2pdf
- **Deployment (optional):** Render / Docker

---

## 📦 Project Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/payroll-management.git
cd payroll-management
