# 90-Day Full-Stack Roadmap Todo App

A full-stack todo application for tracking your 90-day journey from Full-Stack to DevOps & AI Engineering. Built with React, Redux, Node.js, Express, and MongoDB.

## Features

- ✅ **Task Management** - Create, edit, delete, and organize tasks hierarchically
- ✅ **Progress Tracking** - Visual progress bar showing completion percentage
- ✅ **Task Filtering** - Filter by all, active, or completed tasks
- ✅ **Admin Authentication** - Secure admin panel with JWT authentication
- ✅ **Public Task Completion** - Anyone can mark tasks as complete
- ✅ **Responsive Design** - Beautiful UI with Tailwind CSS
- ✅ **MongoDB Backend** - Persistent data storage with MongoDB

## Tech Stack

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Router (Routing)
- Axios (HTTP Client)
- Tailwind CSS (Styling)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd roadmap-todo-app
```

### 2. Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/roadmap-todo-app
JWT_SECRET=your-super-secret-jwt-key-here
ADMIN_PASSWORD=your-secure-admin-password
NODE_ENV=development
```

> [!IMPORTANT]
> **Security Best Practices:**
> - Generate a strong JWT_SECRET using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
> - Use a strong ADMIN_PASSWORD (minimum 12 characters, mix of letters, numbers, symbols)
> - Never commit your `.env` file to version control
> - Change default credentials before deploying to production

### 3. Setup Frontend (Client)

```bash
cd ../todo-app
npm install
```

Create a `.env` file in the `todo-app` directory:

```bash
cp .env.example .env
```

Edit `.env` and configure your API URL:

```env
VITE_API_URL=http://localhost:5000
```

For production, update this to your deployed backend URL.

## Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd todo-app
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Environment Variables

### Server (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `MONGODB_URI` | MongoDB connection string | Yes | mongodb://localhost:27017/roadmap-todo-app |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `ADMIN_PASSWORD` | Admin login password | Yes | - |
| `NODE_ENV` | Environment (development/production) | No | development |

### Client (.env)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API URL | No | http://localhost:5000 |

## Admin Features

### Logging In

1. Click the "Admin Login" button in the top-right corner
2. Enter your admin password (set in server `.env`)
3. Click "Login"

### Admin Capabilities

When logged in as admin, you can:
- ✏️ Edit task names
- 🗑️ Delete tasks and subtasks
- ➕ Create new tasks
- 🧹 Clear all completed tasks

### Public Features

Anyone can:
- ✅ Mark tasks as complete/incomplete
- 📂 Expand/collapse task hierarchies
- 👀 View all tasks and progress

## Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables in your hosting platform
2. Ensure `NODE_ENV=production`
3. Set strong `JWT_SECRET` and `ADMIN_PASSWORD`
4. Configure `MONGODB_URI` to your MongoDB Atlas cluster

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set `VITE_API_URL` to your deployed backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## Security Considerations

> [!CAUTION]
> **Before deploying to production:**
> 
> 1. ✅ Change default `ADMIN_PASSWORD` to a strong password
> 2. ✅ Generate a secure `JWT_SECRET` (32+ characters)
> 3. ✅ Use MongoDB Atlas with authentication enabled
> 4. ✅ Enable HTTPS for both frontend and backend
> 5. ✅ Never commit `.env` files to version control
> 6. ✅ Review and update CORS settings in production

## Project Structure

```
roadmap-todo-app/
├── server/                 # Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── .env.example       # Environment variables template
│   └── server.js          # Entry point
│
├── todo-app/              # Frontend
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   └── todoSlice.js  # Redux slice
│   ├── .env.example      # Environment variables template
│   └── vite.config.js    # Vite configuration
│
└── .gitignore            # Git ignore rules
```

## API Endpoints

### Public Endpoints
- `GET /api/tasks` - Get all tasks
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `PATCH /api/tasks/:id/expand` - Toggle task expansion

### Admin Endpoints (Require Authentication)
- `POST /api/admin/login` - Admin login
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `DELETE /api/tasks/action/clear-completed` - Clear completed tasks

## Troubleshooting

### MongoDB Connection Issues

If you see connection errors:
1. Ensure MongoDB is running locally: `mongod`
2. Check your `MONGODB_URI` in `.env`
3. For MongoDB Atlas, ensure your IP is whitelisted

### CORS Errors

If you see CORS errors:
1. Ensure backend is running on the correct port
2. Check `VITE_API_URL` matches your backend URL
3. Verify CORS is enabled in `server.js`

### Admin Login Not Working

1. Check `ADMIN_PASSWORD` in server `.env`
2. Ensure `JWT_SECRET` is set
3. Check browser console for errors
4. Verify backend is running

## License

MIT

## Author

Made by { DevDoc }

---

> [!NOTE]
> This is a learning project for tracking your 90-day roadmap. Feel free to customize and extend it for your needs!
