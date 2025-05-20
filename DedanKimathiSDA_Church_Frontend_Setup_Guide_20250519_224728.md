
# 📘 Dedan Kimathi SDA Church – Frontend Setup Guide (React + Tailwind CSS)

This document provides a **professional, production-ready, and beginner-friendly setup** of the **frontend** for the church management platform using **React**, **Vite**, and **Tailwind CSS**. It aligns with the backend Django REST API that handles sermons, events, ministries, and resources.

---

## ✅ Overview

- **Framework**: React with Vite (for modern tooling)
- **Styling**: Tailwind CSS (utility-first)
- **State Management**: React Context (basic) or Redux (optional)
- **HTTP Requests**: Axios
- **Routing**: React Router
- **Deployment**: Ready for Netlify, Vercel, or NGINX static serving

---

## 📁 Project Folder Structure

```
frontend/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components (Home, Sermons, Events...)
│   ├── services/            # Axios services for API communication
│   ├── App.jsx              # Root component with router
│   ├── main.jsx             # Main entry point
│   └── index.css            # TailwindCSS entry styles
├── .gitignore
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js
```

---

## 🛠 Step-by-Step Setup Instructions

### 1. Initialize the React Project with Vite

```bash
npm create vite@latest frontend
cd frontend
```

Choose `React` and `JavaScript` when prompted.

### 2. Install All Dependencies

```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install axios react-router-dom
npx tailwindcss init -p
```

### 3. TailwindCSS Configuration

Update `tailwind.config.js`:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [],
```

### 4. Tailwind Base Styles

Create `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Main Entry (`main.jsx`)

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Setup React Router in `App.jsx`

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sermons from './pages/Sermons';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 7. Example Page: `Home.jsx`

```js
function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-10 text-center">
      <h1 className="text-4xl font-bold text-indigo-800">Welcome to Dedan Kimathi SDA Church</h1>
    </div>
  );
}

export default Home;
```

### 8. API Communication Setup with Axios

Create `src/services/api.js`:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8000/api/", // Change on deploy
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

### 9. Example Service: `sermons.js`

```js
import api from './api';

export const getSermons = () => api.get('sermons/');
export const getSermon = (id) => api.get(`sermons/${id}/`);
```

### 10. Connect to Backend in a Page

```js
import { useEffect, useState } from 'react';
import { getSermons } from '../services/sermons';

function Sermons() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    getSermons().then(res => setSermons(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sermons</h2>
      <ul>
        {sermons.map(s => (
          <li key={s.id} className="border p-4 mb-2 rounded shadow">{s.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sermons;
```

---

## ✅ Deployment Notes

### For Vercel or Netlify:

- Push to GitHub.
- Import the repo to Vercel/Netlify.
- Set build command: `npm run build`
- Set output directory: `dist`

### For NGINX with Django:

- Build the frontend:

```bash
npm run build
```

- Copy `dist/` to Django's `static/` or serve via WhiteNoise.

---

## ✅ Recap

This setup delivers:

- Modern React dev stack (Vite + Tailwind)
- Modular folder structure
- Ready-to-use REST connection (Axios)
- Fully expandable for authentication, dashboards, and admin tools
