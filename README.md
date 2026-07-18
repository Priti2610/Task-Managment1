# Task Management System 

A full-stack Task Management System developed using Node.js, Express.js, EJS, MySQL, JWT Authentication and bcrypt.

This application allows users to securely register, login and manage their daily tasks with search and filtering functionality.

# 📌 Features

 🔐 Authentication
- User Registration
- User Login
- JWT Based Authentication
- Secure Password Hashing using bcrypt
- Cookie Based Authentication
- User Logout

---

# 📝 Task Management

Users can:

- Add New Task
- View All Tasks
- Edit Task
- Delete Task
- Mark Task as Completed


Task contains:

- Task Title
- Description
- Due Date
- Priority
- Status

 🔍 Task Search & Filter

- Search task by title
- Filter task by status:
  - Pending
  - Completed

- Filter task by priority:
  - High
  - Medium
  - Low

 🛠️ Technologies Used
 
# Frontend
- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS Template Engine

# Backend
- Node.js
- Express.js

# Database
- MySQL

# Authentication
- JWT (JSON Web Token)
- bcrypt Password Encryption

# Project Structure

Task-Management/
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│     └── script.js
│   
├── views/
│   ├── header.ejs
│   ├── footer.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── dashboard.ejs
│   ├── addTask.ejs
│   └── editTask.ejs
│
├── routes/
│   ├── auth.js
│   └── task.js
│
├── middleware/
│   └── auth.js
│
├── db.js
├── app.js
├── .env
├── package.json
└── package-lock.json


















## 📂 Project Structure
