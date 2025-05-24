# Expense Tracker

A full-stack web application to track your income and expenses, visualize trends, and manage your finances.

## Features

- User authentication (sign up, login, logout)
- Add, view, and delete income and expense entries
- Upload profile images
- Dashboard with financial overview and charts
- Download income and expense data as Excel files
- Responsive UI built with React and Tailwind CSS
- Chatbot assistant powered by Gemini API

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, Axios, Recharts, Moment.js
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, JWT, XLSX

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database

### Installation

#### Backend

```sh
cd backend
npm install
cp .env.example .env   # Edit .env with your MongoDB URI and JWT secret
npm run dev
```

#### Frontend

```sh
cd frontend/expense-tracker
npm install
cp .env.example .env   # Edit .env with your Gemini API key
npm run dev
```

### Usage

- Visit `http://localhost:5173` to access the frontend.
- Backend runs on `http://localhost:8000` by default.

## Folder Structure

```
backend/
  controllers/
  models/
  routes/
  middleware/
  uploads/
frontend/expense-tracker/
  src/
    components/
    pages/
    utils/
    context/
    hooks/
```

## Environment Variables

### Backend (`backend/.env`)

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT authentication
- `PORT` - Backend server port

### Frontend (`frontend/expense-tracker/.env`)

- `VITE_REACT_APP_GEMINI_API_KEY` - Gemini API key for chatbot

## License

This project is licensed under the MIT License.