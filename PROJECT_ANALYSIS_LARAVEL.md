# DeKUSDA Church Website - Laravel/MySQL Technical Analysis

## 🚀 Technology Stack Migration Overview

**Frontend**: React 18 + Vite + TailwindCSS (unchanged)
**Backend**: Laravel 10 + PHP 8.2
**Database**: MySQL 8.0
**Authentication**: Laravel Sanctum
**Real-time**: Laravel WebSockets + Pusher
**File Storage**: Laravel Storage + AWS S3
**Caching**: Redis
**Queue**: Laravel Queues + Redis

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Frontend Structure (React/Vite)](#frontend-structure)
3. [Backend Architecture (Laravel)](#backend-architecture)
4. [Database Schema (MySQL)](#database-schema)
5. [API Endpoints (Laravel)](#api-endpoints)
6. [Admin Management System](#admin-management)
7. [Authentication & Authorization](#authentication)
8. [File Management & Storage](#file-management)
9. [Real-time Features](#realtime-features)
10. [Hosting & Deployment](#hosting-deployment)

---

## Project Overview

### Migration Benefits
- **Shared Hosting Compatibility**: Laravel runs on most shared hosting providers
- **MySQL Support**: Universal database support across hosting platforms
- **PHP Ecosystem**: Extensive package availability and community support
- **Laravel Features**: Built-in authentication, queues, caching, and admin tools
- **Performance**: Optimized for web hosting environments

### Core Functionality
- **Church Website**: Information, ministries, events, resources
- **Prayer Requests**: Community prayer system with moderation
- **Digital Giving**: Secure online tithes and offerings
- **Event Management**: Calendar of Events (COE) system
- **Content Management**: Books, sermons, announcements
- **Admin Dashboard**: Complete content moderation and management

---

## Frontend Structure (React/Vite)

### Actual Project Structure
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # React app entry point
│   ├── index.css              # Global styles
│   ├── Prophecy.jsx           # Standalone prophecy component
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx     # Main navigation header
│   │   │   ├── Footer.jsx     # Site footer with links
│   │   │   └── Sidebar.jsx    # Sidebar navigation
│   │   ├── Forms/
│   │   │   ├── ContactForm.jsx
│   │   │   └── LoginForm.jsx
│   │   ├── Navigation/
│   │   │   ├── Breadcrumb.jsx
│   │   │   └── Pagination.jsx
│   │   ├── UI/
│   │   │   ├── Button.jsx     # Reusable button component
│   │   │   ├── Card.jsx       # Card component
│   │   │   └── Modal.jsx      # Modal component
│   │   └── Loader.jsx         # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx           # Homepage with prayer requests
│   │   ├── About/
│   │   │   ├── AboutDekusda.jsx (.css)
│   │   │   ├── AboutSDA.jsx (.css)
│   │   │   ├── PastorMessage.jsx
│   │   │   ├── ElderMessage.jsx
│   │   │   └── Leadership/
│   │   │       ├── Leaders2022.jsx
│   │   │       ├── Leaders2023.jsx
│   │   │       └── Leaders2024.jsx
│   │   ├── Ministries/
│   │   │   ├── PersonalMinistries.jsx
│   │   │   ├── PrayerDepartment.jsx
│   │   │   ├── AMO_ALO.jsx
│   │   │   ├── Health.jsx
│   │   │   ├── SabbathSchool.jsx
│   │   │   └── Prophecy.jsx
│   │   ├── Music/
│   │   │   ├── ChurchChoir.jsx
│   │   │   ├── DCM.jsx
│   │   │   └── Blissful.jsx
│   │   ├── Evangelism/
│   │   │   ├── PCM.jsx
│   │   │   └── Evangelism.jsx
│   │   ├── Resources/
│   │   │   ├── COE.jsx        # Calendar of Events
│   │   │   ├── Books.jsx      # Digital library
│   │   │   └── TithesOfferings.jsx
│   │   ├── More/
│   │   │   └── Announcements.jsx
│   │   └── Legal/
│   │       ├── Privacy.jsx
│   │       ├── Terms.jsx
│   │       └── Accessibility.jsx
│   └── assets/               # Images and media files
│       ├── church.jpeg
│       ├── dekusdachurchlogo.png
│       ├── pastor-frank.png
│       ├── PCMgroup.png
│       ├── Dekusdamain.jpg
│       └── [50+ church images]
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

### Frontend Analysis & Recommendations

#### **Current Structure Assessment**
✅ **Well Organized**: Pages grouped by functionality
✅ **Component Structure**: Layout, Forms, UI, Navigation separated
✅ **Asset Management**: Centralized image storage
✅ **Configuration**: Proper Vite, Tailwind, ESLint setup

#### **Missing Components for Laravel Integration**
❌ **Services Layer**: No API integration utilities
❌ **Context Management**: No state management
❌ **Authentication**: No auth components
❌ **Admin Components**: No admin dashboard components
❌ **Utils/Helpers**: No utility functions

### Required Additions for Laravel Integration

#### **1. Services Layer** (New folder: `src/services/`)
```javascript
// src/services/api.js - Laravel API integration
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VITE_LARAVEL_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// CSRF protection for Laravel Sanctum
API.interceptors.request.use(async (config) => {
  await axios.get('/sanctum/csrf-cookie');
  return config;
});

export default API;

// src/services/auth.js - Authentication service
export const authService = {
  login: (credentials) => API.post('/login', credentials),
  register: (userData) => API.post('/register', userData),
  logout: () => API.post('/logout'),
  getUser: () => API.get('/user'),
};

// src/services/prayers.js - Prayer requests service
export const prayerService = {
  submitPrayer: (prayerData) => API.post('/prayers', prayerData),
  getPrayerWall: () => API.get('/prayers/wall'),
  prayForRequest: (id) => API.post(`/prayers/${id}/pray`),
};
```

#### **2. Context Management** (New folder: `src/context/`)
```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getUser();
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### **3. Admin Components** (New folder: `src/components/Admin/`)
```javascript
// src/components/Admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import API from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [pendingContent, setPendingContent] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, contentRes] = await Promise.all([
        API.get('/admin/dashboard'),
        API.get('/admin/content/pending')
      ]);
      setStats(statsRes.data.data);
      setPendingContent(contentRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={stats.total_users} />
        <StatCard title="Pending Prayers" value={stats.pending_prayers} />
        <StatCard title="Total Events" value={stats.total_events} />
        <StatCard title="This Month Donations" value={`KES ${stats.monthly_donations}`} />
      </div>

      {/* Pending Content */}
      <PendingContentTable content={pendingContent} onRefresh={fetchDashboardData} />
    </div>
  );
};

// src/components/Admin/PrayerModeration.jsx
const PrayerModeration = () => {
  const [pendingPrayers, setPendingPrayers] = useState([]);

  const approvePrayer = async (id) => {
    try {
      await API.put(`/admin/content/${id}/approve`);
      setPendingPrayers(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error approving prayer:', error);
    }
  };

  return (
    <div className="prayer-moderation">
      <h2 className="text-2xl font-bold mb-6">Prayer Requests Moderation</h2>
      {/* Prayer approval interface */}
    </div>
  );
};
```

#### **4. Prayer Components** (New folder: `src/components/Prayer/`)
```javascript
// src/components/Prayer/PrayerForm.jsx
import { useState } from 'react';
import { prayerService } from '../../services/prayers';

const PrayerForm = () => {
  const [formData, setFormData] = useState({
    requester_name: '',
    prayer_text: '',
    is_anonymous: false,
    is_public: false,
    category: 'general'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await prayerService.submitPrayer(formData);
      alert('Prayer request submitted successfully!');
      setFormData({ requester_name: '', prayer_text: '', is_anonymous: false, is_public: false, category: 'general' });
    } catch (error) {
      console.error('Error submitting prayer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Prayer form fields */}
    </form>
  );
};

// src/components/Prayer/PrayerWall.jsx
const PrayerWall = () => {
  const [prayers, setPrayers] = useState([]);

  useEffect(() => {
    fetchPrayers();
  }, []);

  const fetchPrayers = async () => {
    try {
      const response = await prayerService.getPrayerWall();
      setPrayers(response.data.data);
    } catch (error) {
      console.error('Error fetching prayers:', error);
    }
  };

  return (
    <div className="prayer-wall">
      <h3 className="text-2xl font-bold mb-6">Prayer Wall</h3>
      <div className="space-y-4">
        {prayers.map(prayer => (
          <PrayerCard key={prayer.id} prayer={prayer} />
        ))}
      </div>
    </div>
  );
};
```

#### **5. Utils & Helpers** (New folder: `src/utils/`)
```javascript
// src/utils/constants.js
export const API_ENDPOINTS = {
  PRAYERS: '/prayers',
  EVENTS: '/events',
  BOOKS: '/books',
  DONATIONS: '/donations',
  ADMIN: '/admin'
};

export const USER_ROLES = {
  MEMBER: 'member',
  LEADER: 'leader',
  ADMIN: 'admin'
};

export const PRAYER_CATEGORIES = [
  'health', 'family', 'spiritual', 'financial', 'ministry', 'general'
];

// src/utils/helpers.js
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

export const truncateText = (text, maxLength = 150) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatCurrency = (amount, currency = 'KES') => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: currency
  }).format(amount);
};
```

### Updated Package.json Dependencies

```json
{
  "name": "dekusda-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "axios": "^1.5.0",
    "react-icons": "^4.11.0",
    "swiper": "^10.3.1",
    "date-fns": "^2.30.0",
    "react-query": "^3.39.3",
    "react-hook-form": "^7.46.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^4.4.5",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "tailwindcss": "^3.3.3",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.29"
  }
}
```

### Frontend Integration with Laravel Backend

#### **Environment Configuration**
```javascript
// .env (frontend)
VITE_LARAVEL_API_URL=http://localhost:8000/api
VITE_LARAVEL_BASE_URL=http://localhost:8000
VITE_APP_NAME="DeKUSDA Church"
VITE_PUSHER_APP_KEY=your_pusher_key
VITE_PUSHER_APP_CLUSTER=mt1
```

#### **Vite Configuration Update**
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: '../backend/public/frontend',
    emptyOutDir: true,
  }
});
```

### Current vs Recommended Structure Comparison

| Current Structure | Status | Recommendation |
|------------------|--------|----------------|
| ✅ `pages/` organization | **Excellent** | Keep as is |
| ✅ `components/Layout/` | **Good** | Keep current structure |
| ✅ `components/UI/` | **Good** | Expand with more reusable components |
| ✅ `components/Forms/` | **Good** | Add prayer form and admin forms |
| ❌ `services/` folder | **Missing** | **Critical** - Add API integration |
| ❌ `context/` folder | **Missing** | **Important** - Add state management |
| ❌ `utils/` folder | **Missing** | **Important** - Add helper functions |
| ❌ `components/Prayer/` | **Missing** | **Critical** - Prayer system components |
| ❌ `components/Admin/` | **Missing** | **Critical** - Admin dashboard |
| ✅ Asset organization | **Good** | Consider organizing by category |

### Migration Action Plan

#### **Phase 1: Core Integration** (Priority: High)
1. **Create services layer** for Laravel API integration
2. **Add authentication context** for user management
3. **Update existing components** to use Laravel APIs
4. **Integrate prayer system** in Home.jsx

#### **Phase 2: Admin System** (Priority: High)  
1. **Create admin components** for content management
2. **Add admin routing** and protected routes
3. **Implement content moderation** interfaces
4. **Add admin dashboard** with analytics

#### **Phase 3: Enhancement** (Priority: Medium)
1. **Add utility functions** for common operations
2. **Implement real-time features** with WebSockets
3. **Add error handling** and loading states
4. **Optimize performance** with React Query

The current frontend structure is **well-organized** but needs **critical additions** for Laravel integration, particularly the services layer and authentication context! 🚀

### API Integration with Laravel

### API Integration with Laravel
```javascript
// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
});

// Sanctum CSRF protection
API.interceptors.request.use(async (config) => {
  await axios.get('/sanctum/csrf-cookie');
  return config;
});

// Authentication interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
```

### React Components Integration
```javascript
// components/Prayer/PrayerForm.jsx
import { useState } from 'react';
import API from '../../services/api';

const PrayerForm = () => {
  const [formData, setFormData] = useState({
    requester_name: '',
    prayer_text: '',
    is_anonymous: false,
    is_public: false,
    category: 'general'
  });

  const submitPrayer = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/prayers', formData);
      if (response.data.success) {
        alert('Prayer request submitted successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting prayer:', error);
    }
  };

  return (
    <form onSubmit={submitPrayer} className="space-y-4">
      {/* Form fields */}
    </form>
  );
};
```

---

## Backend Architecture (Laravel)

### Laravel Project Structure
```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── API/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PrayerController.php
│   │   │   │   ├── EventController.php
│   │   │   │   ├── BookController.php
│   │   │   │   ├── DonationController.php
│   │   │   │   └── AdminController.php
│   │   │   └── Web/
│   │   │       └── HomeController.php
│   │   ├── Middleware/
│   │   │   ├── AdminOnly.php
│   │   │   └── ContentModeration.php
│   │   └── Requests/
│   │       ├── PrayerRequest.php
│   │       └── EventRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── PrayerRequest.php
│   │   ├── Event.php
│   │   ├── Ministry.php
│   │   ├── Book.php
│   │   ├── Donation.php
│   │   └── Announcement.php
│   ├── Services/
│   │   ├── PaymentService.php
│   │   ├── NotificationService.php
│   │   └── ContentModerationService.php
│   ├── Jobs/
│   │   ├── SendPrayerNotification.php
│   │   └── ProcessPayment.php
│   └── Events/
│       ├── PrayerSubmitted.php
│       └── EventCreated.php
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
│   ├── api.php
│   ├── web.php
│   └── channels.php
├── config/
├── storage/
│   ├── app/
│   │   ├── public/
│   │   │   ├── books/
│   │   │   ├── sermons/
│   │   │   └── gallery/
│   │   └── private/
└── .env
```

### Key Laravel Controllers

#### Prayer Controller
```php
<?php
// app/Http/Controllers/API/PrayerController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use App\Http\Requests\PrayerRequest as PrayerFormRequest;
use App\Events\PrayerSubmitted;
use Illuminate\Http\Request;

class PrayerController extends Controller
{
    public function index(Request $request)
    {
        $prayers = PrayerRequest::where('is_public', true)
            ->where('is_approved', true)
            ->when($request->category, function ($query, $category) {
                return $query->where('category', $category);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $prayers
        ]);
    }

    public function store(PrayerFormRequest $request)
    {
        $prayer = PrayerRequest::create([
            'requester_name' => $request->is_anonymous ? null : $request->requester_name,
            'requester_email' => $request->requester_email,
            'prayer_text' => $request->prayer_text,
            'is_anonymous' => $request->is_anonymous,
            'is_public' => $request->is_public,
            'category' => $request->category ?? 'general',
            'is_approved' => false, // Requires admin approval
        ]);

        // Trigger event for admin notification
        event(new PrayerSubmitted($prayer));

        return response()->json([
            'success' => true,
            'message' => 'Prayer request submitted successfully',
            'data' => $prayer
        ], 201);
    }

    public function prayForRequest($id)
    {
        $prayer = PrayerRequest::findOrFail($id);
        $prayer->increment('prayer_count');

        return response()->json([
            'success' => true,
            'message' => 'Thank you for praying!',
            'prayer_count' => $prayer->prayer_count
        ]);
    }
}
```

#### Admin Controller
```php
<?php
// app/Http/Controllers/API/AdminController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use App\Models\User;
use App\Models\ContentApproval;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'pending_prayers' => PrayerRequest::where('is_approved', false)->count(),
            'total_prayers' => PrayerRequest::count(),
            'recent_registrations' => User::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function pendingContent()
    {
        $content = ContentApproval::with(['content'])
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $content
        ]);
    }

    public function approveContent($id)
    {
        $approval = ContentApproval::findOrFail($id);
        $approval->update([
            'status' => 'approved',
            'reviewer_id' => auth()->id(),
            'reviewed_at' => now()
        ]);

        // Approve the actual content
        if ($approval->content_type === 'prayer_request') {
            PrayerRequest::find($approval->content_id)
                ->update(['is_approved' => true]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Content approved successfully'
        ]);
    }
}
```

---

## Database Schema (MySQL)

### Core Tables

#### Users Table
```sql
-- database/migrations/create_users_table.php
CREATE TABLE users (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    role ENUM('member', 'leader', 'admin') DEFAULT 'member',
    is_active BOOLEAN DEFAULT true,
    profile_photo VARCHAR(255) NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

#### Prayer Requests Table
```sql
-- database/migrations/create_prayer_requests_table.php
CREATE TABLE prayer_requests (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    requester_name VARCHAR(100) NULL,
    requester_email VARCHAR(255) NULL,
    prayer_text TEXT NOT NULL,
    is_anonymous BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT false,
    category ENUM('health', 'family', 'spiritual', 'financial', 'ministry', 'general') DEFAULT 'general',
    urgency_level ENUM('normal', 'urgent') DEFAULT 'normal',
    is_approved BOOLEAN DEFAULT false,
    is_answered BOOLEAN DEFAULT false,
    answered_date TIMESTAMP NULL,
    answer_testimony TEXT NULL,
    prayer_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_public_approved (is_public, is_approved),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
);
```

#### Events Table
```sql
-- database/migrations/create_events_table.php
CREATE TABLE events (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    event_type ENUM('service', 'bible_study', 'fellowship', 'outreach', 'youth', 'prayer', 'special') NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NULL,
    location VARCHAR(200) NULL,
    organizer_id BIGINT UNSIGNED NULL,
    max_attendees INT NULL,
    registration_required BOOLEAN DEFAULT false,
    is_recurring BOOLEAN DEFAULT false,
    recurrence_pattern VARCHAR(50) NULL,
    is_active BOOLEAN DEFAULT true,
    featured_image VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_start_date (start_date),
    INDEX idx_event_type (event_type),
    INDEX idx_active (is_active)
);
```

#### Ministries Table
```sql
-- database/migrations/create_ministries_table.php
CREATE TABLE ministries (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    leader_id BIGINT UNSIGNED NULL,
    meeting_day ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NULL,
    meeting_time TIME NULL,
    location VARCHAR(200) NULL,
    contact_email VARCHAR(255) NULL,
    contact_phone VARCHAR(20) NULL,
    is_active BOOLEAN DEFAULT true,
    featured_image VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_name (name),
    INDEX idx_active (is_active)
);
```

#### Books Table
```sql
-- database/migrations/create_books_table.php
CREATE TABLE books (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT NULL,
    category ENUM('theology', 'devotional', 'prophecy', 'health', 'family', 'youth', 'general') DEFAULT 'general',
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT NULL,
    cover_image VARCHAR(255) NULL,
    publication_year YEAR NULL,
    download_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    uploaded_by BIGINT UNSIGNED NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_category (category),
    INDEX idx_featured (is_featured),
    INDEX idx_title (title)
);
```

#### Donations Table
```sql
-- database/migrations/create_donations_table.php
CREATE TABLE donations (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    donor_id BIGINT UNSIGNED NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'KES',
    donation_type ENUM('tithe', 'offering', 'missions', 'building', 'special') NOT NULL,
    payment_method ENUM('card', 'mpesa', 'bank_transfer') NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    is_recurring BOOLEAN DEFAULT false,
    recurring_frequency ENUM('weekly', 'monthly', 'quarterly') NULL,
    notes TEXT NULL,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_transaction_id (transaction_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_donation_type (donation_type),
    INDEX idx_created_at (created_at)
);
```

#### Content Approvals Table
```sql
-- database/migrations/create_content_approvals_table.php
CREATE TABLE content_approvals (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content_type ENUM('prayer_request', 'announcement', 'book', 'sermon', 'comment') NOT NULL,
    content_id BIGINT UNSIGNED NOT NULL,
    submitted_by BIGINT UNSIGNED NULL,
    reviewer_id BIGINT UNSIGNED NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    review_notes TEXT NULL,
    rejection_reason TEXT NULL,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (submitted_by) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_content_type_id (content_type, content_id),
    INDEX idx_status (status)
);
```

### Laravel Models

#### Prayer Request Model
```php
<?php
// app/Models/PrayerRequest.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PrayerRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'requester_name',
        'requester_email',
        'prayer_text',
        'is_anonymous',
        'is_public',
        'category',
        'urgency_level',
        'is_approved',
        'is_answered',
        'answered_date',
        'answer_testimony',
        'prayer_count'
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'is_public' => 'boolean',
        'is_approved' => 'boolean',
        'is_answered' => 'boolean',
        'answered_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Scopes
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Relationships
    public function responses()
    {
        return $this->hasMany(PrayerResponse::class);
    }

    public function approval()
    {
        return $this->morphOne(ContentApproval::class, 'content');
    }
}
```

---

## API Endpoints (Laravel)

### Authentication Routes
```php
// routes/api.php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PrayerController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\AdminController;

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
```

### Prayer Management Routes
```php
// Prayer requests
Route::prefix('prayers')->group(function () {
    Route::get('/', [PrayerController::class, 'index']);
    Route::post('/', [PrayerController::class, 'store']);
    Route::get('/wall', [PrayerController::class, 'prayerWall']);
    Route::get('/recent', [PrayerController::class, 'recent']);
    Route::post('/{id}/pray', [PrayerController::class, 'prayForRequest']);
    Route::get('/categories', [PrayerController::class, 'categories']);
    Route::get('/statistics', [PrayerController::class, 'statistics']);
    
    // Authenticated routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/{id}/answer', [PrayerController::class, 'markAnswered']);
        Route::delete('/{id}', [PrayerController::class, 'destroy']);
    });
});

// Prayer chain
Route::prefix('prayer-chain')->middleware('auth:sanctum')->group(function () {
    Route::post('/join', [PrayerController::class, 'joinPrayerChain']);
    Route::delete('/leave', [PrayerController::class, 'leavePrayerChain']);
    Route::get('/members', [PrayerController::class, 'prayerChainStats']);
    Route::put('/preferences', [PrayerController::class, 'updatePreferences']);
});
```

### Content Management Routes
```php
// Books and resources
Route::prefix('books')->group(function () {
    Route::get('/', [BookController::class, 'index']);
    Route::get('/{id}', [BookController::class, 'show']);
    Route::get('/{id}/download', [BookController::class, 'download']);
    Route::post('/{id}/rate', [BookController::class, 'rate'])->middleware('auth:sanctum');
    
    // Admin only
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/', [BookController::class, 'store']);
        Route::put('/{id}', [BookController::class, 'update']);
        Route::delete('/{id}', [BookController::class, 'destroy']);
    });
});

// Events and calendar
Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/calendar', [EventController::class, 'calendar']);
    Route::get('/{id}', [EventController::class, 'show']);
    Route::post('/{id}/rsvp', [EventController::class, 'rsvp'])->middleware('auth:sanctum');
    
    // Admin only
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::post('/', [EventController::class, 'store']);
        Route::put('/{id}', [EventController::class, 'update']);
        Route::delete('/{id}', [EventController::class, 'destroy']);
        Route::get('/{id}/attendees', [EventController::class, 'attendees']);
    });
});
```

### Admin Routes
```php
// Admin routes
Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    
    // Content moderation
    Route::prefix('content')->group(function () {
        Route::get('/pending', [AdminController::class, 'pendingContent']);
        Route::put('/{id}/approve', [AdminController::class, 'approveContent']);
        Route::delete('/{id}/reject', [AdminController::class, 'rejectContent']);
    });
    
    // Prayer moderation
    Route::prefix('prayers')->group(function () {
        Route::get('/moderate', [AdminController::class, 'prayersToModerate']);
        Route::put('/{id}/feature', [AdminController::class, 'featurePrayer']);
        Route::delete('/{id}', [AdminController::class, 'removePrayer']);
    });
    
    // User management
    Route::prefix('users')->group(function () {
        Route::get('/', [AdminController::class, 'users']);
        Route::put('/{id}/role', [AdminController::class, 'updateRole']);
        Route::put('/{id}/status', [AdminController::class, 'updateStatus']);
    });
    
    // Analytics and reports
    Route::prefix('reports')->group(function () {
        Route::get('/donations', [AdminController::class, 'donationReports']);
        Route::get('/engagement', [AdminController::class, 'engagementMetrics']);
        Route::get('/content', [AdminController::class, 'contentPerformance']);
    });
});
```

---

## Admin Management System

### Laravel Admin Middleware
```php
<?php
// app/Http/Middleware/AdminOnly.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminOnly
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth()->check() || auth()->user()->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Admin privileges required.'
            ], 403);
        }

        return $next($request);
    }
}
```

### Admin Dashboard Service
```php
<?php
// app/Services/AdminDashboardService.php

namespace App\Services;

use App\Models\User;
use App\Models\PrayerRequest;
use App\Models\Event;
use App\Models\Donation;
use Carbon\Carbon;

class AdminDashboardService
{
    public function getDashboardStats()
    {
        return [
            'users' => [
                'total' => User::count(),
                'new_this_week' => User::where('created_at', '>=', Carbon::now()->subWeek())->count(),
                'active' => User::where('is_active', true)->count(),
            ],
            'prayers' => [
                'total' => PrayerRequest::count(),
                'pending' => PrayerRequest::where('is_approved', false)->count(),
                'answered' => PrayerRequest::where('is_answered', true)->count(),
                'this_month' => PrayerRequest::whereMonth('created_at', Carbon::now()->month)->count(),
            ],
            'events' => [
                'upcoming' => Event::where('start_date', '>', Carbon::now())->count(),
                'this_month' => Event::whereMonth('start_date', Carbon::now()->month)->count(),
            ],
            'donations' => [
                'total_amount' => Donation::where('payment_status', 'completed')->sum('amount'),
                'this_month' => Donation::where('payment_status', 'completed')
                    ->whereMonth('created_at', Carbon::now()->month)
                    ->sum('amount'),
                'total_donors' => Donation::distinct('donor_id')->count(),
            ]
        ];
    }

    public function getRecentActivity()
    {
        return [
            'recent_prayers' => PrayerRequest::latest()->take(5)->get(),
            'recent_users' => User::latest()->take(5)->get(),
            'recent_events' => Event::latest()->take(5)->get(),
        ];
    }
}
```

---

## Authentication & Authorization

### Laravel Sanctum Setup
```php
// config/sanctum.php
return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : ''
    ))),

    'guard' => ['web'],
    'expiration' => null,
    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],
];
```

### Authentication Controller
```php
<?php
// app/Http/Controllers/API/AuthController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }
}
```

---

## File Management & Storage

### Laravel Storage Configuration
```php
// config/filesystems.php
'disks' => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'),
    ],

    'public' => [
        'driver' => 'local',
        'root' => storage_path('app/public'),
        'url' => env('APP_URL').'/storage',
        'visibility' => 'public',
    ],

    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION'),
        'bucket' => env('AWS_BUCKET'),
        'url' => env('AWS_URL'),
        'endpoint' => env('AWS_ENDPOINT'),
    ],
],
```

### File Upload Service
```php
<?php
// app/Services/FileUploadService.php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    public function uploadBook(UploadedFile $file): array
    {
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs('books', $filename, 'public');
        
        return [
            'path' => $path,
            'url' => Storage::url($path),
            'size' => $file->getSize(),
            'original_name' => $file->getClientOriginalName(),
        ];
    }

    public function uploadImage(UploadedFile $file, string $folder = 'images'): array
    {
        $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs($folder, $filename, 'public');
        
        return [
            'path' => $path,
            'url' => Storage::url($path),
            'size' => $file->getSize(),
        ];
    }

    public function deleteFile(string $path): bool
    {
        return Storage::disk('public')->delete($path);
    }
}
```

---

## Real-time Features

### Laravel WebSockets Setup
```php
// config/broadcasting.php
'connections' => [
    'pusher' => [
        'driver' => 'pusher',
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'app_id' => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'encrypted' => true,
            'host' => '127.0.0.1',
            'port' => 6001,
            'scheme' => 'http'
        ],
    ],
],
```

### Real-time Events
```php
<?php
// app/Events/PrayerSubmitted.php

namespace App\Events;

use App\Models\PrayerRequest;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PrayerSubmitted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $prayer;

    public function __construct(PrayerRequest $prayer)
    {
        $this->prayer = $prayer;
    }

    public function broadcastOn()
    {
        return new Channel('admin-notifications');
    }

    public function broadcastWith()
    {
        return [
            'id' => $this->prayer->id,
            'message' => 'New prayer request submitted',
            'prayer_text' => Str::limit($this->prayer->prayer_text, 50),
            'timestamp' => now()->toISOString(),
        ];
    }
}
```

---

## Hosting & Deployment

### Shared Hosting Compatibility

#### .htaccess Configuration
```apache
# public/.htaccess
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

#### Environment Configuration
```bash
# .env for shared hosting
APP_NAME="DeKUSDA Church"
APP_ENV=production
APP_KEY=base64:generated-key-here
APP_DEBUG=false
APP_URL=https://your-domain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

FILESYSTEM_DISK=public
SESSION_DRIVER=database
CACHE_DRIVER=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls

# Payment Gateway (e.g., Stripe)
STRIPE_KEY=pk_live_your_stripe_key
STRIPE_SECRET=sk_live_your_stripe_secret

# M-Pesa Integration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_shortcode
```

### Deployment Script
```bash
#!/bin/bash
# deploy.sh

echo "Starting Laravel deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader

# Clear and cache configs
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Storage link
php artisan storage:link

# Set permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# Build React frontend
cd frontend
npm install
npm run build
cd ..

echo "Deployment completed successfully!"
```

### Database Optimization
```sql
-- Database indexes for performance
CREATE INDEX idx_prayers_public_approved ON prayer_requests(is_public, is_approved, created_at);
CREATE INDEX idx_events_date_active ON events(start_date, is_active);
CREATE INDEX idx_donations_status_date ON donations(payment_status, created_at);
CREATE INDEX idx_users_role_active ON users(role, is_active);

-- Full-text search indexes
ALTER TABLE prayer_requests ADD FULLTEXT(prayer_text);
ALTER TABLE books ADD FULLTEXT(title, author, description);
ALTER TABLE events ADD FULLTEXT(title, description);
```

---

## Migration Benefits Summary

### Technical Advantages
- ✅ **Shared Hosting Support**: Laravel runs on most web hosts
- ✅ **MySQL Compatibility**: Universal database support
- ✅ **Built-in Admin Tools**: Laravel Nova or custom admin panels
- ✅ **Payment Integration**: Easy Stripe, PayPal, M-Pesa integration
- ✅ **File Management**: Robust storage system with cloud support
- ✅ **Security**: Built-in CSRF protection, authentication, authorization
- ✅ **Performance**: Eloquent ORM optimization, query caching
- ✅ **Maintenance**: Easier deployment and updates

### Development Benefits
- 🚀 **Rapid Development**: Laravel's conventions and tools
- 🔧 **Package Ecosystem**: Extensive library of packages
- 📚 **Documentation**: Comprehensive Laravel documentation
- 🧪 **Testing**: Built-in testing framework
- 🔄 **Version Control**: Laravel's migration system
- 📊 **Analytics**: Easy integration with tracking tools

### Business Benefits
- 💰 **Cost Effective**: Lower hosting costs on shared hosting
- 🔒 **Secure**: Laravel's security features
- 📈 **Scalable**: Easy to scale as church grows
- 🛠️ **Maintainable**: Clean, organized codebase
- 🌐 **Community**: Large PHP/Laravel developer community

---

This comprehensive documentation provides a complete roadmap for migrating the DeKUSDA Church website from Python/Django to PHP/Laravel while maintaining all existing functionality and adding robust content management capabilities. The Laravel version offers better shared hosting compatibility while preserving the modern React frontend experience.
