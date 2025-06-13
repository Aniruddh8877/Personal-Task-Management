# 📝 Personal Task Management System

A simple and elegant Node.js + Express-based Task Management web application that allows users to create, read, update, and delete personal tasks stored as individual `.txt` files.

## 🔗 Live Demo (Optional)
*(Add a deployed link here if hosted)*

## Author
# Aniruddh Sharma
GitHub:@Aniruddh8877

## 📌 Features

- ✅ Create new tasks with title and description  
- 📝 Read full task details  
- ✏️ Edit tasks (both title & description)  
- 🗑️ Delete tasks  
- 📂 Tasks saved as `.txt` files under `/files` directory  
- 🌙 Beautiful dark-themed responsive UI built with TailwindCSS  
- 💾 File-based storage (no database required)

---

## 📁 Project Structure
Personal-Task-Management/
├── files/ # Stores task files
├── public/
│ ├── css/
│ └── js/
├── views/ # EJS templates (index, show, edit)
├── index.js # Main server file (Express)
└── README.md

## ⚙️ Tech Stack
Backend: Node.js, Express.js

Templating Engine: EJS

Frontend: HTML, TailwindCSS

Storage: Local File System (fs module)


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aniruddh8877/Personal-Task-Management.git
cd Personal-Task-Management

npm install

nodemon index.js
# or
node index.js


