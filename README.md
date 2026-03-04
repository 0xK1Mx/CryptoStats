# Crypto Tracker

A simple full-stack cryptocurrency tracking application that allows users to view live crypto market data.

---

## 📌 Overview

This project is a full-stack application built to practice:

- API integration
- Backend development with Node.js & Express
- Database modeling with MongoDB
- Secure authentication with JWT
- React state management and data fetching

Currently, the app allows users to view live cryptocurrency market data.

More features will be added as development continues.

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- ***

# Crypto Stats App - Setup Guide

## Environment Setup

1. **Copy the example environment file:**

   ```bash
   cp .env.local.example .env.local
   ```

2. **Update `.env.local` with your local server URLs:**
   ```env
   VITE_API_URL=http://localhost:8000
   VITE_JSON_SERVER_URL=http://localhost:5000
   ```

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Start the backend (in a separate terminal):**

   ```bash
   npm start
   ```

4. **Start the JSON server (in another terminal):**
   ```bash
   npm run server
   ```

## Features

- ✅ **Authentication**: Secure login/signup with JWT
- ✅ **Input Validation**: Email format, password strength checks
- ✅ **Error Handling**: User-friendly error messages with toast notifications
- ✅ **Watchlist Management**: Save favorite cryptocurrencies
- ✅ **Portfolio Tracking**: View your crypto assets
- ✅ **Market Data**: Real-time cryptocurrency market information
- ✅ **Responsive Design**: Works on mobile and desktop
- ✅ **Error Boundaries**: Graceful error handling with page recovery

## Project Structure

```
src/
├── api/
│   └── client.js           # Centralized API calls
├── utils/
│   ├── format.js           # Number and price formatting
│   ├── validation.js       # Input validation
│   └── logger.js           # Logging utility
├── components/
│   ├── ErrorBoundary.jsx   # Error boundary component
│   ├── Toast.jsx           # Toast notifications
│   └── ...other components
├── contexts/
│   └── AuthContext.jsx     # Authentication state management
└── pages/
    ├── Homepage.jsx
    ├── Dashboard.jsx
    └── ...other pages
```

## Recent Improvements

1. **Centralized API Client** - All API calls in one place for better maintainability
2. **Input Validation** - Email format and password strength checking
3. **Error Handling** - Proper try-catch blocks with user-friendly messages
4. **Toast Notifications** - Visual feedback for errors and success
5. **Error Boundary** - Catches and displays component errors gracefully
6. **Utilities Extraction** - Reusable functions for formatting and validation
7. **Environment Variables** - Configuration via .env.local
8. **Logging** - Centralized logger for debugging
9. **Loading States** - Visual feedback during data fetching
10. **Code Cleanup** - Removed duplicated code and console.log statements

## 🚀 v2.0 (Latest Version)

### ✨ New Features

- ⭐ Interactive Watchlist toggle (add/remove coins)
- 💼 Portfolio dashboard with asset holdings
- 💾 Watchlist persistence using browser localStorage

🎬 **Demo Video:**  
[Watch v2.0 Demo](https://github.com/user-attachments/assets/4ba5cf10-00b6-4090-aec2-e7eefcb10cf3)

## 📦 v1.0 (Initial Version)

### Initials

[Watch Demo](https://github.com/user-attachments/assets/d73442c9-1334-43d6-b0d1-5fed41abbd36)
