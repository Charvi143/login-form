# Login Form Project

A simple **login form application** built for learning purposes.
This project demonstrates a full-stack setup using **Vite (React)** for the frontend, **Express** for the backend, and **MongoDB** as the database. It also supports **Google OAuth login**.

---

## 🛠 Technologies Used

* **Frontend:** React with [Vite](https://vitejs.dev/)
* **Backend:** Node.js with [Express](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Authentication:** Basic login + Google OAuth login
* **Environment Variables:** Managed via `.env` files (not committed to GitHub)

---

## 📁 Project Structure

```
root
│
├── frontend/      # Vite + React frontend
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── backend/       # Express backend
    ├── routes/
    ├── models/
    ├── index.js
    └── package.json
```

---

## ⚡ Features

* User registration and login
* Login with **Google OAuth**
* Password hashing for security
* MongoDB database connection
* Environment variable management for sensitive info

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/login-form.git
cd login-form
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=8080
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173` (Vite default).

---

## 🔒 Environment Variables

* **Backend (`backend/.env`)**

  * `PORT` – Server port
  * `DB_URL` – MongoDB connection string
  * `JWT_SECRET` – Secret key for JWT tokens
  * `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` – For Google OAuth

* **Frontend (`frontend/.env`)**

  * `VITE_API_URL` – Backend API URL
  * `VITE_GOOGLE_CLIENT_ID` – Google OAuth client ID

> **Note:** `.env` files are **not committed** to GitHub for security.

---

## 💻 Deployment

* **Frontend:** Can be deployed on [Vercel](https://vercel.com/)
* **Backend:** Can be deployed on [Vercel](https://vercel.com/) or any Node.js hosting
* Make sure to configure environment variables in your hosting provider.

---

## 📚 Learnings

* Setting up a full-stack project with separate frontend and backend folders
* Connecting MongoDB with Node.js
* Handling environment variables safely
* Basic authentication flow + Google login integration

---

## 🔗 Links

* [Vite](https://vitejs.dev/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Google OAuth](https://developers.google.com/identity)
* [Vercel](https://vercel.com/)

---

## 📄 License

This project is **for learning purposes only**.
