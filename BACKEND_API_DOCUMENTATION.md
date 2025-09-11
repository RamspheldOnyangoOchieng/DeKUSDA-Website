# DeKUSDA Church Laravel Backend API Documentation

## Overview
Complete REST API for the DeKUSDA Church management system built with Laravel 12, featuring authentication, file uploads, downloads, and comprehensive church management functionality.

## Base URL
```
http://127.0.0.1:8000/api/v1
```

## Authentication
- **Type**: Laravel Sanctum (SPA Authentication)
- **Protected Routes**: Most admin/management endpoints require authentication
- **Public Routes**: Events, sermons, prayer submissions, donations

## 🚀 API Endpoints

### 📅 Events
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | List published events | No |
| GET | `/events/{id}` | Get specific event | No |
| POST | `/events` | Create new event | Yes |
| PUT | `/events/{id}` | Update event | Yes |
| DELETE | `/events/{id}` | Delete event | Yes |
| POST | `/events/{id}/upload-image` | Upload event image | Yes |

### 🎤 Sermons
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/sermons` | List published sermons | No |
| GET | `/sermons/{id}` | Get specific sermon | No |
| GET | `/sermons/{id}/download/{type}` | Download audio/video/pdf | No |
| POST | `/sermons` | Create new sermon (with file uploads) | Yes |
| PUT | `/sermons/{id}` | Update sermon | Yes |
| DELETE | `/sermons/{id}` | Delete sermon | Yes |
| GET | `/sermons/admin/all` | Get all sermons (admin view) | Yes |

**Download Types**: `audio`, `video`, `pdf`

### 🙏 Prayer Requests
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/prayer-requests/public` | Get public prayer requests | No |
| POST | `/prayer-requests` | Submit new prayer request | No |
| POST | `/prayer-requests/{id}/pray` | Increment prayer count | No |
| GET | `/prayer-requests` | List all requests (admin) | Yes |
| GET | `/prayer-requests/{id}` | Get specific request | Yes |
| PUT | `/prayer-requests/{id}` | Update request status | Yes |
| DELETE | `/prayer-requests/{id}` | Delete request | Yes |
| POST | `/prayer-requests/{id}/approve` | Approve request | Yes |

### 🏛️ Ministries
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/ministries` | List all ministries | No |
| GET | `/ministries/{id}` | Get specific ministry | No |
| POST | `/ministries` | Create new ministry | Yes |
| PUT | `/ministries/{id}` | Update ministry | Yes |
| DELETE | `/ministries/{id}` | Delete ministry | Yes |

### 📢 Announcements
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/announcements` | List published announcements | No |
| GET | `/announcements/{id}` | Get specific announcement | No |
| POST | `/announcements` | Create new announcement | Yes |
| PUT | `/announcements/{id}` | Update announcement | Yes |
| DELETE | `/announcements/{id}` | Delete announcement | Yes |

### 💰 Donations
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/donations` | Submit donation | No |
| GET | `/donations` | List all donations | Yes |
| GET | `/donations/{id}` | Get specific donation | Yes |
| PUT | `/donations/{id}` | Update donation | Yes |
| DELETE | `/donations/{id}` | Delete donation | Yes |
| GET | `/donations/reports/summary` | Get donation summary | Yes |

### 🖼️ Gallery
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/gallery` | List gallery items | No |
| GET | `/gallery/{id}` | Get specific gallery item | No |
| POST | `/gallery` | Create gallery item | Yes |
| PUT | `/gallery/{id}` | Update gallery item | Yes |
| DELETE | `/gallery/{id}` | Delete gallery item | Yes |
| POST | `/gallery/upload` | Upload gallery files | Yes |

### 👥 Church Members
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/church-members` | List all members | Yes |
| POST | `/church-members` | Create new member | Yes |
| GET | `/church-members/{id}` | Get specific member | Yes |
| PUT | `/church-members/{id}` | Update member | Yes |
| DELETE | `/church-members/{id}` | Delete member | Yes |
| POST | `/church-members/{id}/upload-photo` | Upload member photo | Yes |

### 🎯 Admin Dashboard
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/dashboard` | Get dashboard data | Yes |
| GET | `/admin/statistics` | Get church statistics | Yes |
| GET | `/admin/recent-activities` | Get recent activities | Yes |

## 📁 File Upload Support

### Supported File Types:
- **Images**: jpg, jpeg, png, gif (max 5MB)
- **Audio**: mp3, wav, ogg (max 50MB)
- **Video**: mp4, avi, mov (max 200MB)
- **Documents**: pdf, doc, docx (max 10MB)
- **Books/Resources**: pdf, epub (max 25MB)

### File Storage:
- **Location**: `storage/app/public/`
- **Organization**: 
  - `sermons/audio/`
  - `sermons/video/`
  - `sermons/pdf/`
  - `sermons/thumbnails/`
  - `gallery/photos/`
  - `gallery/videos/`
  - `members/photos/`
  - `events/images/`

## 📊 Sample Data
The database comes with sample data including:
- ✅ Admin user: `admin@dekusda.org` (password: `admin123`)
- ✅ 2 Sample events (Sabbath Service, Youth Fellowship)
- ✅ 2 Sample prayer requests with different categories
- ✅ 1 Sample sermon with speaker details
- ✅ 2 Sample ministries (Choir, Youth Ministry)
- ✅ 1 Sample announcement (Communication Sabbath)
- ✅ 1 Sample church member

## 🔒 Security Features
- ✅ Laravel Sanctum authentication
- ✅ Spatie Permission package for role-based access
- ✅ File validation and size limits
- ✅ SQL injection protection
- ✅ CSRF protection
- ✅ Rate limiting
- ✅ Input validation and sanitization

## 🗄️ Database Structure
- **Users**: Laravel default + admin roles
- **Church Members**: Member management with profiles
- **Events**: Complete event management
- **Prayer Requests**: With approval workflow
- **Sermons**: Media file management
- **Ministries**: Church department management
- **Announcements**: Communication system
- **Donations**: Financial tracking
- **Gallery**: Photo/video management
- **Permissions**: Role-based access control

## 🚀 Frontend Integration Ready
- ✅ JSON API responses
- ✅ CORS enabled for frontend
- ✅ File download URLs
- ✅ Error handling with proper HTTP codes
- ✅ Pagination support
- ✅ Search and filtering capabilities

## 📱 Usage Examples

### Submit Prayer Request:
```javascript
fetch('/api/v1/prayer-requests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    requester_name: 'John Doe',
    prayer_request: 'Please pray for my family',
    category: 'family',
    is_public: true
  })
})
```

### Get Public Events:
```javascript
fetch('/api/v1/events')
  .then(response => response.json())
  .then(data => console.log(data))
```

### Download Sermon:
```javascript
fetch('/api/v1/sermons/1/download/audio')
  .then(response => response.json())
  .then(data => window.open(data.data.download_url))
```

This comprehensive backend provides all the functionality needed for the DeKUSDA Church website with modern API endpoints, file handling, and admin controls.
