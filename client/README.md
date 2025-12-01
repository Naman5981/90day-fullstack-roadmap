# 90-Day Roadmap Todo App (MERN Stack)

A full-stack todo app to track your 90-day full-stack development journey. Built with the MERN stack (MongoDB, Express, React, Node.js) for cross-device synchronization.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## ✨ Features

- ☁️ **Cloud Sync** - Tasks persist across all your devices via MongoDB
- 📋 **137 Pre-loaded Tasks** - Complete 90-day roadmap covering Full-Stack, Python, AI, and DevOps
- 🎯 **Hierarchical Structure** - 12 weeks with expandable subtasks
- 📊 **Progress Tracking** - Visual progress bar and per-week completion counters
- 🎨 **Beautiful UI** - Modern design with gradients and smooth animations
- ✏️ **Fully Editable** - Add, edit, delete, and customize tasks

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB installed locally OR a MongoDB Atlas connection string

### 1. Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```
MONGODB_URI=mongodb://localhost:27017/roadmap-todo
PORT=5000
```

Start the server:
```bash
npm run start
```

### 2. Seed Database (Optional)
To load the 90-day roadmap tasks into your database:
```bash
cd server
node seed/seedTasks.js
```

### 3. Setup Frontend (Client)

Open a new terminal:
```bash
cd todo-app
npm install
npm start
```

Visit `http://localhost:5173` to see your app!

## 🗂️ Project Structure

```
roadmap-todo-app/
├── server/               # Backend API
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── seed/             # Database seed scripts
│   └── server.js         # Express app entry
└── todo-app/             # Frontend Client
    ├── src/
    │   ├── api/          # API client
    │   ├── todoSlice.js  # Redux state
    │   └── App.jsx       # Main UI
    └── ...
```

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose

## 🤝 Contributing

Feel free to customize the roadmap tasks in `server/seed/seedTasks.js` to match your own learning goals!

## 📄 License

MIT License
