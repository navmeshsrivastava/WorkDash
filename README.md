# WorkDash – Team Task Submission and Management Platform

---

## 🔗 Live Demo

🔗 **Live Demo**: [WorkDash on Render](https://workdash-project.onrender.com/)

---

## 📝 Overview

**WorkDash** is a full-stack web application built for small teams or startup groups to manage and complete tasks efficiently. It features a dual-role system where **Team Leads (e.g., Managers, Project Leads)** can assign and manage tasks, while **Employees** can complete and submit them.

This project is a real-world implementation of concepts like:
- **JWT-based authentication**
- **Role-based access control**
- **Secure file handling**
- **Built-in multi-language code editor with live preview**
- **Modular MVC architecture**
- **User-friendly error feedback on both frontend and backend**

---

## 👨‍💼 User Roles & Features

### 🔹 Team Leads (Managers / Project Managers / Team Leads)

- Post new tasks with **title**, **description**, **deadline**, and **optional attachments** (PDF, JPG, PNG).
- Access the **“My Created Tasks”** section to:
  - Track all submissions made by employees.
  - View submitted code and attached files for each task.
  - Delete tasks if needed.

---

### 🔸 Employees

- View all posted tasks.
- Submit their solutions using a built-in **code editor** or upload relevant files.
- View their completed submissions via the **“See Tasks”** section.
- Optionally:
  - **Edit or undo** their submission at any time before the deadline.

---

## 💡 Highlights

### 🎨 Clean & Consistent UI
- Intuitive layout with a consistent interface across all pages for better usability and clarity.

### 🔐 Authentication & Authorization

- **JWT-based authentication** for secure login and session control.
- Role-based authorization to ensure restricted access to specific pages and APIs.
- **Cookies** used for maintaining and validating sessions.
- Route protection implemented throughout the app.

> ✅ I have handled both authentication and authorization flows cleanly and securely.

---

### ⚠️ Error Handling (Frontend + Backend)

> 🔧 Every part of the system is designed to fail gracefully and inform the user appropriately.

- Frontend errors (e.g., empty form submissions, invalid inputs) are shown through user-friendly messages.
- Backend validations are in place for all API endpoints (e.g., missing fields, wrong file types, invalid JWTs).
- Unified error messages give users clear feedback while preventing sensitive information leaks.

> ✅ I focused on **graceful error handling** on both the **frontend and backend** to enhance user trust and experience.

---

### 💻 Built-in Code Editor

- Integrated **Monaco Editor** with support for:
  - HTML, CSS, JavaScript
  - C, C++, Python
- Live preview for **HTML/CSS/JS** code submissions built right into the app.
- Employees can write and test their code before submitting it.

> ✅ I integrated the **Monaco Editor** to offer an in-browser coding experience, improving submission speed and interactivity.

---

### ☁️ Attachment Handling

- Team Leads can upload attachments (like reference files or instructions) while creating tasks.
- File types supported: **JPG, PNG, PDF**
- Uploaded securely to **Cloudinary** with cloud links stored in the database.

---

## 🧱 Project Structure

- Follows **MVC (Model-View-Controller)** architecture
- Clean codebase with separated logic for:
  - Models
  - Controllers
  - Routes
  - Middleware

> ✅ Modular and scalable structure to ensure clean maintainability.

---

## 🔐 Security & Packages

- **JWT** for secure authentication and session verification
- **bcrypt** for password hashing and secure credential storage
- **Input validation and sanitization** applied on all user input fields
- Environment variables managed securely using `.env`

---

## 🚀 Future Enhancements

- Notification system for task updates
- Role-specific dashboards with analytics
- Markdown support in task descriptions
- Admin panel for managing teams and tasks

---

## 🧑‍💻 About the Developer

I'm a self-taught full-stack developer and a current BCA student. I designed **WorkDash** to apply advanced backend techniques such as JWT-based session control, modular coding with MVC, and full error lifecycle management. I also challenged myself to integrate a code editor with live preview, something not often seen in task-based web apps.

I’m open to internship opportunities, freelance work, or open-source collaboration.

---

## Connect with Me

LinkedIn: [https://www.linkedin.com/in/navmeshsrivastava]  
GitHub: [https://github.com/navmeshsrivastava]  
Email: [navmeshsrivastav815@gmail.com]
