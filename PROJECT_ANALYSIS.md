# DeKUSDA Website - Complete Frontend & Backend Analysis

## Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Deep Dive](#frontend-deep-dive)
3. [Backend Architecture](#backend-architecture)
4. [User Interactions & Workflows](#user-interactions--workflows)
5. [Technical Requirements](#technical-requirements)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Real-time Features](#real-time-features)
9. [Security & Authentication](#security--authentication)
10. [Hosting Considerations](#hosting-considerations)
11. [Migration Paths](#migration-paths)
12. [Final Recommendations](#final-recommendations)

---

## Project Overview

**DeKUSDA Website** is a comprehensive church management system built with:
- **Frontend**: React 18 + Vite + TailwindCSS
- **Backend**: Django 4.2 + Django REST Framework + Channels
- **Database**: MongoDB with MongoEngine ODM
- **Real-time**: WebSockets via Django Channels + Redis
- **Styling**: Modern responsive design with TailwindCSS

### Core Purpose
Digital platform for **Dedan Kimathi University SDA (DeKUSDA)** church to:
- Engage members digitally
- Distribute resources and sermons
- Facilitate online giving
- Manage announcements and events
- Provide educational content
- Enable real-time communication

---

## Frontend Deep Dive

### 1. Application Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout/        # Header, Footer, Navigation
│   │   ├── UI/            # Buttons, Cards, Forms
│   │   └── Shared/        # Common components
│   ├── pages/             # Route-based page components
│   │   ├── Home/          # Landing page
│   │   ├── About/         # Church information
│   │   ├── Ministries/    # Ministry programs
│   │   ├── Resources/     # Books, Calendar of Events content
│   │   ├── Music/         # Sermons, audio content
│   │   ├── Giving/        # Donations, tithes
│   │   ├── Legal/         # Privacy, Terms, Accessibility
│   │   └── Admin/         # Management dashboard
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API calls, utilities
│   ├── context/           # State management
│   └── utils/             # Helper functions
```

### 2. Page-by-Page User Experience

#### **Home Page (`/`)**
**Purpose**: First impression and navigation hub

**User Activities**:
- **Hero Section**: Church branding, mission statement, call-to-action
- **Featured Content**: Latest sermon, upcoming events, important announcements
- **Quick Navigation**: Direct access to key sections (Give, Resources, About)
- **Statistics**: Member count, years of service, impact metrics
- **Testimonials**: Member stories and experiences
- **Service Times**: Worship schedule and location
- **Prayer Requests**: Interactive prayer submission form with anonymous/named options
- **Prayer Wall**: Public display of recent prayer requests for community prayer
- **Prayer Chain**: Join prayer chain for regular prayer commitment
- **Social Proof**: Instagram feed, recent activities

**Technical Implementation**:
```javascript
// Home page data fetching
useEffect(() => {
  // Fetch latest announcements
  fetch('/api/announcements?limit=3')
  // Fetch featured sermon
  fetch('/api/sermons?featured=true')
  // Fetch upcoming events
  fetch('/api/events?upcoming=true')
  // Fetch recent prayer requests for prayer wall
  fetch('/api/prayers/recent?limit=3&public=true')
  // Real-time connection for live updates
  connectWebSocket('notifications')
}, [])

// Prayer request submission
const submitPrayerRequest = async (formData) => {
  const response = await fetch('/api/prayers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requester_name: formData.name || null,
      prayer_text: formData.request,
      is_anonymous: !formData.name,
      is_public: formData.sharePublicly,
      prayer_category: formData.category || 'general'
    })
  });
  if (response.ok) {
    showSuccessMessage('Prayer request submitted successfully');
    resetForm();
  }
}
```

**Admin Content Management**:
- **Prayer Moderation Dashboard**: Review and approve/reject prayer requests before public display
- **Anonymous Prayer Handling**: Special review process for anonymous requests
- **Prayer Wall Management**: Feature/unfeature prayers, organize by categories
- **Prayer Chain Administration**: Manage prayer chain members, send bulk notifications
- **Prayer Analytics**: Track prayer request trends, answered prayers, community engagement

#### **About DeKUSDA (`/Aboutdekusda`)**
**Purpose**: Church information and transparency

**User Activities**:
- **History Timeline**: Church founding, milestones, growth
- **Mission & Vision**: Core values and beliefs
- **Leadership Team**: Pastors, elders, ministry heads with photos/bios
- **Beliefs & Doctrine**: Theological positions
- **Location & Contact**: Address, phone, email, map integration
- **Photo Gallery**: Church activities, events, facilities

**Admin Content Management**:
- **Leadership Management**: Add/remove/update leadership profiles and photos
- **Timeline Editor**: Update church history, add milestones and achievements
- **Mission Statement Updates**: Edit church mission, vision, and values
- **Photo Gallery Admin**: Upload, organize, and caption church photos
- **Contact Information**: Update addresses, phone numbers, service times
- **Content Approval**: Review and approve user-submitted testimonials or content

**Content Management Needs**:
- Admin ability to update leadership information
- Photo upload and gallery management
- Event history and milestone tracking

#### **Personal Ministries (`/Personalministries`)**
**Purpose**: Ministry engagement and participation

**User Activities**:
- **Ministry Catalog**: Youth, Women, Men, Children, Worship, Outreach
- **Ministry Details**: Description, meeting times, leadership contact
- **Join Requests**: Sign-up forms for ministry participation
- **Ministry Resources**: Specific documents, guidelines, schedules
- **Leadership Directory**: Contact information for ministry leaders
- **Ministry Calendar**: Specific events and activities

**Advanced Features**:
```javascript
// Ministry interaction system
const ministryFeatures = {
  signUp: "POST /api/ministries/{id}/join",
  getSchedule: "GET /api/ministries/{id}/calendar",
  getResources: "GET /api/ministries/{id}/resources",
  contactLeader: "POST /api/ministries/{id}/contact"
}
```

**Admin Content Management**:
- **Ministry Management**: Create, edit, delete ministry departments
- **Leadership Assignment**: Assign/remove ministry leaders and contacts
- **Resource Upload**: Add ministry-specific documents, guidelines, videos
- **Member Management**: Approve/manage ministry membership requests
- **Calendar Integration**: Schedule and manage ministry-specific events
- **Communication Tools**: Send announcements to ministry members

#### **Books (`/Books`)**
**Purpose**: Digital library and resource distribution

**User Activities**:
- **Book Catalog**: Searchable library with categories
- **Book Details**: Author, description, publication date, download count
- **PDF Download**: Direct download with progress tracking
- **Search & Filter**: By author, category, publication date, popularity
- **Reading Lists**: Personal collections and recommendations
- **Book Reviews**: Member ratings and comments
- **Recently Added**: New publications highlighting

**Technical Requirements**:
```javascript
// Book management system
const bookFeatures = {
  browse: "GET /api/books?category=&search=&page=",
  download: "GET /api/books/{id}/download",
  rate: "POST /api/books/{id}/rating",
  addToList: "POST /api/users/reading-list",
  trackDownload: "POST /api/books/{id}/analytics"
}
```

**Admin Content Management**:
- **Library Management**: Upload, categorize, and organize digital books/resources
- **Book Metadata**: Edit titles, descriptions, authors, categories, tags
- **Content Moderation**: Review and approve user-submitted book reviews
- **Download Analytics**: Track book popularity, download statistics
- **Featured Content**: Highlight recommended or featured books
- **Access Control**: Manage which books require membership vs public access
- **Bulk Operations**: Mass upload, categorization, and metadata editing

#### **Calendar of Events (`/COE`)**
**Purpose**: Event calendar and scheduling system

**User Activities**:
- **Event Calendar**: Interactive calendar view of church events
- **Event Details**: Description, date/time, location, registration info
- **Event Registration**: RSVP system for events requiring registration
- **Calendar Views**: Monthly, weekly, daily calendar displays
- **Event Categories**: Worship services, conferences, social events, ministry meetings
- **Event Reminders**: Notification system for upcoming events
- **Recurring Events**: Weekly services, monthly meetings, annual conferences

**Calendar Management System**:
```javascript
// Calendar and event features
const coeFeatures = {
  getCalendar: "GET /api/calendar?month=&year=",
  getEventDetails: "GET /api/events/{id}",
  rsvpEvent: "POST /api/events/{id}/rsvp",
  addToPersonalCalendar: "POST /api/users/calendar/add-event"
}
```

**Admin Content Management**:
- **Event Creation**: Create, edit, and delete church events
- **Event Scheduling**: Set recurring events, manage event series
- **Registration Management**: Set capacity limits, manage attendee lists
- **Event Promotion**: Feature important events, send event notifications
- **Attendance Tracking**: Mark attendance, generate attendance reports
- **Calendar Integration**: Export to external calendars, sync with church systems
- **Event Analytics**: Track popular events, attendance trends, registration data

#### **Music & Sermons (`/Music`)**
**Purpose**: Spiritual content consumption

**User Activities**:
- **Sermon Library**: Audio/video sermons with search
- **Music Collection**: Worship songs and church choir recordings
- **Podcast Integration**: Regular teaching series
- **Live Streaming**: Real-time service broadcasting
- **Playlist Creation**: Personal collections of favorite content
- **Download Options**: Offline listening capability
- **Transcription Services**: Text versions of sermons

**Media Player Features**:
```javascript
// Advanced media system
const mediaFeatures = {
  streamAudio: "GET /api/media/{id}/stream",
  downloadMedia: "GET /api/media/{id}/download",
  createPlaylist: "POST /api/playlists",
  liveStream: "WebSocket /ws/live-stream",
  searchTranscripts: "GET /api/sermons/search?q="
}
```

**Admin Content Management**:
- **Media Upload**: Upload sermons, music, and audio/video content
- **Content Organization**: Categorize by series, date, speaker, topic
- **Transcription Management**: Upload/edit sermon transcripts
- **Live Stream Control**: Start/stop live streams, manage streaming quality
- **Playlist Curation**: Create featured playlists, organize content collections
- **Media Analytics**: Track views, downloads, popular content
- **Content Moderation**: Review user-generated playlists and comments

#### **Announcements (`/Announcements`)**
**Purpose**: Church communication and event management

**User Activities**:
- **Latest News**: Chronological announcement feed
- **Event Calendar**: Interactive calendar with event details
- **RSVP System**: Event registration and attendance tracking
- **Notification Preferences**: Email/SMS/push notification settings
- **Announcement Categories**: Church news, events, urgent notices
- **Social Sharing**: Share announcements on social media
- **Archive Search**: Historical announcement lookup

**Communication System**:
```javascript
// Announcement management
const announcementFeatures = {
  getLatest: "GET /api/announcements?latest=true",
  rsvpEvent: "POST /api/events/{id}/rsvp",
  subscribeNotifications: "POST /api/notifications/subscribe",
  shareAnnouncement: "POST /api/announcements/{id}/share"
}
```

**Admin Content Management**:
- **Announcement Creation**: Create, edit, and schedule announcements
- **Priority Management**: Set urgent notices, featured announcements
- **Notification Control**: Send push notifications, emails, SMS alerts
- **Audience Targeting**: Send announcements to specific groups/ministries
- **Content Scheduling**: Schedule future announcements, recurring notices
- **Approval Workflow**: Multi-level approval for important announcements
- **Analytics Dashboard**: Track announcement engagement, read rates

#### **Tithes & Offerings (`/tithes-offerings`)**
**Purpose**: Digital giving and financial stewardship

**User Activities**:
- **Donation Forms**: Multiple giving options (tithe, offering, missions)
- **Payment Methods**: Credit/debit cards, mobile money (M-Pesa), bank transfer
- **Recurring Giving**: Automated monthly/weekly donations
- **Giving History**: Personal donation records and receipts
- **Giving Statements**: Annual tax-deductible summaries
- **Special Appeals**: Fundraising campaigns and projects
- **Impact Reporting**: How donations are used in ministry

**Financial Integration**:
```javascript
// Payment processing system
const givingFeatures = {
  processPayment: "POST /api/payments/process",
  setupRecurring: "POST /api/payments/recurring",
  getHistory: "GET /api/users/giving-history",
  generateReceipt: "GET /api/payments/{id}/receipt",
  cancelRecurring: "DELETE /api/payments/recurring/{id}"
}
```

**Admin Content Management**:
- **Donation Campaign Management**: Create special giving campaigns and appeals
- **Payment Gateway Configuration**: Manage payment methods, processing fees
- **Financial Reporting**: Generate giving reports, financial summaries
- **Donor Management**: Track donor information, giving patterns
- **Receipt Generation**: Automated receipt creation, annual statements
- **Recurring Payment Oversight**: Monitor and manage recurring donations
- **Transparency Reports**: Create impact reports showing fund usage

### 3. Admin Dashboard & Content Management

#### **Admin Dashboard Overview**
**Purpose**: Centralized control panel for church administrators

**Admin User Activities**:
- **Content Moderation**: Review and approve/reject user-submitted content
- **User Management**: Manage member accounts, roles, and permissions
- **Analytics Dashboard**: Track website usage, engagement metrics
- **Ministry Oversight**: Manage ministry departments and leadership
- **Financial Reporting**: Monitor donations, generate financial reports
- **System Configuration**: Update site settings, payment gateways

**Admin Dashboard Structure**:
```javascript
// Admin dashboard layout
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  
  return (
    <div className="admin-dashboard">
      <AdminSidebar activeSection={activeSection} />
      <AdminContent section={activeSection} />
    </div>
  );
};

// Admin sections
const adminSections = {
  overview: <OverviewDashboard />,
  content: <ContentModerationPanel />,
  users: <UserManagementPanel />,
  ministries: <MinistryManagementPanel />,
  events: <EventManagementPanel />,
  prayers: <PrayerModerationPanel />,
  analytics: <AnalyticsDashboard />,
  settings: <SystemSettingsPanel />
};
```

### 4. Component Architecture

#### **Layout Components**
```javascript
// Header Navigation
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useContext(AuthContext);
  
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      {/* Logo, navigation links, user menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
      <UserDropdown user={user} />
      {user?.role === 'admin' && <AdminQuickAccess />}
    </nav>
  );
};

// Footer with comprehensive links
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <QuickLinks />
      <ContactInfo />
      <SocialMedia />
      <LegalLinks />
    </div>
  </footer>
);
```

#### **Interactive Components**
```javascript
// Real-time notification system
const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/notifications/');
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
    };
  }, []);
  
  return (
    <div className="notification-center">
      {notifications.map(notification => (
        <NotificationCard key={notification.id} {...notification} />
      ))}
    </div>
  );
};
```

---

## Backend Architecture

### 1. Django Project Structure

```
backend/
├── church_api/           # Main Django project
│   ├── settings.py      # Configuration (MongoDB, Channels, CORS)
│   ├── urls.py          # URL routing
│   ├── asgi.py          # ASGI application for WebSockets
│   └── wsgi.py          # WSGI application for HTTP
├── api/                 # Main application
│   ├── models.py        # MongoEngine document models
│   ├── views.py         # API endpoints
│   ├── serializers.py   # Data serialization
│   ├── consumers.py     # WebSocket consumers
│   ├── urls.py          # API routing
│   └── utils.py         # Helper functions
└── requirements.txt     # Python dependencies
```

### 2. Current Settings Analysis

Based on your `backend/church_api/settings.py`, the backend is configured for:

#### **Database Configuration**
- **MongoDB via MongoEngine**: Non-relational document database
- **Connection**: Environment-based (`DB_NAME`, `DB_URI`)
- **Alias**: Default MongoDB connection

#### **WebSocket Support**
- **Django Channels**: WebSocket and async HTTP handling
- **Redis Channel Layer**: Production-ready real-time communication
- **Fallback**: In-memory channel layer for development

#### **Security & CORS**
- **Development Mode**: Allow all origins for frontend development
- **Production Mode**: Restricted CORS origins from environment variables
- **CSRF Protection**: Trusted origins for form submissions

#### **File Handling**
- **Static Files**: Served at `/static/` (CSS, JS, images)
- **Media Files**: User uploads at `/media/` (PDFs, audio, video)
- **File Storage**: Local filesystem (can be upgraded to cloud storage)

---

## Database Schema

### Required Models (MongoEngine Documents)

```python
from mongoengine import Document, StringField, DateTimeField, EmailField, ListField, BooleanField, IntField, FileField, ReferenceField
from datetime import datetime

class User(Document):
    """User profiles for members and administrators"""
    username = StringField(max_length=50, unique=True, required=True)
    email = EmailField(required=True, unique=True)
    full_name = StringField(max_length=100, required=True)
    phone_number = StringField(max_length=15)
    ministry_affiliations = ListField(StringField())
    role = StringField(choices=['member', 'leader', 'admin'], default='member')
    date_joined = DateTimeField(default=datetime.utcnow)
    is_active = BooleanField(default=True)
    notification_preferences = ListField(StringField())
    
    meta = {'collection': 'users'}

class Book(Document):
    """Digital library books and resources"""
    title = StringField(max_length=200, required=True)
    author = StringField(max_length=100, required=True)
    description = StringField()
    category = StringField(choices=['theology', 'devotional', 'bible_study', 'biography', 'ministry'])
    file_path = StringField(required=True)  # Path to PDF file
    cover_image = StringField()  # Path to cover image
    publication_date = DateTimeField()
    uploaded_date = DateTimeField(default=datetime.utcnow)
    download_count = IntField(default=0)
    file_size = IntField()  # Size in bytes
    isbn = StringField(max_length=20)
    tags = ListField(StringField())
    
    meta = {'collection': 'books'}

class Sermon(Document):
    """Audio/video sermons and teachings"""
    title = StringField(max_length=200, required=True)
    preacher = StringField(max_length=100, required=True)
    description = StringField()
    scripture_reference = StringField(max_length=100)
    audio_file = StringField()  # Path to audio file
    video_file = StringField()  # Path to video file
    transcript = StringField()  # Full text transcript
    duration = IntField()  # Duration in seconds
    date_preached = DateTimeField(required=True)
    uploaded_date = DateTimeField(default=datetime.utcnow)
    play_count = IntField(default=0)
    series_name = StringField(max_length=100)
    tags = ListField(StringField())
    is_featured = BooleanField(default=False)
    
    meta = {'collection': 'sermons'}

class Announcement(Document):
    """Church announcements and news"""
    title = StringField(max_length=200, required=True)
    content = StringField(required=True)
    category = StringField(choices=['general', 'event', 'urgent', 'ministry'])
    author = ReferenceField(User)
    publication_date = DateTimeField(default=datetime.utcnow)
    expiry_date = DateTimeField()
    is_published = BooleanField(default=True)
    priority = StringField(choices=['low', 'normal', 'high'], default='normal')
    target_audience = ListField(StringField())  # ['all', 'youth', 'adults', etc.]
    attachments = ListField(StringField())  # File paths
    view_count = IntField(default=0)
    
    meta = {'collection': 'announcements'}

class Event(Document):
    """Church events and activities"""
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    event_date = DateTimeField(required=True)
    end_date = DateTimeField()
    location = StringField(max_length=200)
    category = StringField(choices=['worship', 'conference', 'social', 'ministry', 'outreach'])
    organizer = ReferenceField(User)
    max_attendees = IntField()
    registration_deadline = DateTimeField()
    is_public = BooleanField(default=True)
    requires_rsvp = BooleanField(default=False)
    created_date = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'events'}

class EventRegistration(Document):
    """Event RSVP and attendance tracking"""
    event = ReferenceField(Event, required=True)
    user = ReferenceField(User, required=True)
    registration_date = DateTimeField(default=datetime.utcnow)
    attended = BooleanField(default=False)
    guests_count = IntField(default=0)
    special_requirements = StringField()
    
    meta = {'collection': 'event_registrations'}

class Ministry(Document):
    """Church ministry information"""
    name = StringField(max_length=100, required=True)
    description = StringField(required=True)
    leader = ReferenceField(User)
    meeting_schedule = StringField()
    contact_email = EmailField()
    contact_phone = StringField(max_length=15)
    category = StringField(choices=['youth', 'women', 'men', 'children', 'worship', 'outreach'])
    is_active = BooleanField(default=True)
    member_count = IntField(default=0)
    
    meta = {'collection': 'ministries'}

class MinistryMembership(Document):
    """Ministry membership tracking"""
    ministry = ReferenceField(Ministry, required=True)
    user = ReferenceField(User, required=True)
    join_date = DateTimeField(default=datetime.utcnow)
    role = StringField(choices=['member', 'leader', 'assistant'], default='member')
    is_active = BooleanField(default=True)
    
    meta = {'collection': 'ministry_memberships'}

class Donation(Document):
    """Financial contributions tracking"""
    donor = ReferenceField(User)
    amount = IntField(required=True)  # Amount in cents
    currency = StringField(max_length=3, default='KES')
    donation_type = StringField(choices=['tithe', 'offering', 'missions', 'building', 'special'])
    payment_method = StringField(choices=['card', 'mpesa', 'bank_transfer'])
    transaction_id = StringField(max_length=100, unique=True)
    payment_status = StringField(choices=['pending', 'completed', 'failed', 'refunded'], default='pending')
    donation_date = DateTimeField(default=datetime.utcnow)
    is_recurring = BooleanField(default=False)
    recurring_frequency = StringField(choices=['weekly', 'monthly', 'quarterly'])
    notes = StringField()
    
    meta = {'collection': 'donations'}

class Event(Document):
    """Calendar of Events - church events and activities"""
    title = StringField(max_length=200, required=True)
    description = StringField(required=True)
    event_type = StringField(choices=['service', 'bible_study', 'fellowship', 'outreach', 'youth', 'prayer', 'special'])
    start_date = DateTimeField(required=True)
    end_date = DateTimeField()
    location = StringField(max_length=200)
    organizer = ReferenceField(User)
    max_attendees = IntField()
    registration_required = BooleanField(default=False)
    is_recurring = BooleanField(default=False)
    recurrence_pattern = StringField()  # weekly, monthly, etc.
    is_active = BooleanField(default=True)
    
    meta = {'collection': 'events'}

class EventRegistration(Document):
    """Event registrations for Calendar of Events"""
    event = ReferenceField(Event, required=True)
    attendee = ReferenceField(User, required=True)
    registration_date = DateTimeField(default=datetime.utcnow)
    attendance_status = StringField(choices=['registered', 'attended', 'no_show'], default='registered')
    notes = StringField()
    
    meta = {'collection': 'event_registrations'}

class PrayerRequest(Document):
    """Prayer requests from members and visitors"""
    requester_name = StringField(max_length=100)  # Optional - for anonymous requests
    requester_email = StringField()  # Optional for follow-up
    prayer_text = StringField(required=True)
    is_anonymous = BooleanField(default=False)
    is_public = BooleanField(default=False)  # Display on prayer wall
    prayer_category = StringField(choices=['health', 'family', 'spiritual', 'financial', 'ministry', 'general'], default='general')
    urgency_level = StringField(choices=['normal', 'urgent'], default='normal')
    submission_date = DateTimeField(default=datetime.utcnow)
    is_answered = BooleanField(default=False)
    answered_date = DateTimeField()
    answer_testimony = StringField()  # Praise report when prayer is answered
    prayer_count = IntField(default=0)  # Number of people who prayed for this
    is_active = BooleanField(default=True)
    
    meta = {'collection': 'prayer_requests'}

class PrayerChainMember(Document):
    """Members committed to prayer chain"""
    member = ReferenceField(User, required=True)
    join_date = DateTimeField(default=datetime.utcnow)
    is_active = BooleanField(default=True)
    prayer_frequency = StringField(choices=['daily', 'weekly'], default='daily')
    notification_preference = StringField(choices=['email', 'sms', 'app'], default='email')
    prayers_offered = IntField(default=0)  # Count of prayers offered
    
    meta = {'collection': 'prayer_chain_members'}

class PrayerResponse(Document):
    """Track who has prayed for specific requests"""
    prayer_request = ReferenceField(PrayerRequest, required=True)
    pray_er = ReferenceField(User)  # Optional - can be anonymous
    prayed_date = DateTimeField(default=datetime.utcnow)
    prayer_note = StringField()  # Optional note or verse shared
    is_anonymous = BooleanField(default=False)
    
    meta = {'collection': 'prayer_responses'}

class Gallery(Document):
    """Photo gallery for church events"""
    title = StringField(max_length=200, required=True)
    description = StringField()
    image_path = StringField(required=True)
    event = ReferenceField(Event)
    uploaded_by = ReferenceField(User)
    upload_date = DateTimeField(default=datetime.utcnow)
    is_featured = BooleanField(default=False)
    tags = ListField(StringField())
    
    meta = {'collection': 'gallery'}

class Notification(Document):
    """System notifications"""
    recipient = ReferenceField(User)
    title = StringField(max_length=200, required=True)
    message = StringField(required=True)
    notification_type = StringField(choices=['announcement', 'event', 'ministry', 'system'])
    is_read = BooleanField(default=False)
    created_date = DateTimeField(default=datetime.utcnow)
    action_url = StringField()  # Optional link for notification action
    
    meta = {'collection': 'notifications'}

class ContentApproval(Document):
    """Content moderation and approval workflow"""
    content_type = StringField(choices=['prayer_request', 'announcement', 'book', 'sermon', 'comment'], required=True)
    content_id = StringField(required=True)  # Reference to the actual content
    submitted_by = ReferenceField(User)
    reviewer = ReferenceField(User)
    status = StringField(choices=['pending', 'approved', 'rejected'], default='pending')
    submission_date = DateTimeField(default=datetime.utcnow)
    review_date = DateTimeField()
    review_notes = StringField()
    rejection_reason = StringField()
    
    meta = {'collection': 'content_approvals'}

class AdminLog(Document):
    """Admin activity logging"""
    admin_user = ReferenceField(User, required=True)
    action = StringField(required=True)  # 'created', 'updated', 'deleted', 'approved', 'rejected'
    resource_type = StringField(required=True)  # 'user', 'event', 'prayer', 'announcement', etc.
    resource_id = StringField()
    details = StringField()
    ip_address = StringField()
    user_agent = StringField()
    timestamp = DateTimeField(default=datetime.utcnow)
    
    meta = {'collection': 'admin_logs'}

class SiteSettings(Document):
    """Global site configuration"""
    key = StringField(max_length=100, required=True, unique=True)
    value = StringField(required=True)
    description = StringField()
    category = StringField(choices=['general', 'payment', 'email', 'notification', 'security'])
    is_public = BooleanField(default=False)  # Whether setting is visible to users
    last_updated = DateTimeField(default=datetime.utcnow)
    updated_by = ReferenceField(User)
    
    meta = {'collection': 'site_settings'}
```

---

## API Endpoints

### 1. Authentication & User Management

```python
# User authentication endpoints
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Token refresh
GET    /api/auth/profile           # Get user profile
PUT    /api/auth/profile           # Update user profile
POST   /api/auth/forgot-password   # Password reset request
POST   /api/auth/reset-password    # Password reset confirmation
```

### 2. Content Management

```python
# Books and resources
GET    /api/books                  # List all books
GET    /api/books/{id}             # Get book details
POST   /api/books                  # Upload new book (admin)
PUT    /api/books/{id}             # Update book (admin)
DELETE /api/books/{id}             # Delete book (admin)
GET    /api/books/{id}/download    # Download book file
POST   /api/books/{id}/rate        # Rate a book

# Sermons and media
GET    /api/sermons                # List all sermons
GET    /api/sermons/{id}           # Get sermon details
POST   /api/sermons                # Upload new sermon (admin)
GET    /api/sermons/{id}/stream    # Stream audio/video
GET    /api/sermons/{id}/download  # Download sermon file
POST   /api/sermons/{id}/play      # Log play count

# Announcements
GET    /api/announcements          # List announcements
GET    /api/announcements/{id}     # Get announcement details
POST   /api/announcements          # Create announcement (admin)
PUT    /api/announcements/{id}     # Update announcement (admin)
DELETE /api/announcements/{id}     # Delete announcement (admin)
```

### 3. Events & Ministry

```python
# Events management
GET    /api/events                 # List upcoming events
GET    /api/events/{id}            # Get event details
POST   /api/events                 # Create event (admin)
POST   /api/events/{id}/rsvp       # RSVP to event
GET    /api/events/{id}/attendees  # Get event attendees
PUT    /api/events/{id}/attendance # Mark attendance

# Ministry management
GET    /api/ministries             # List all ministries
GET    /api/ministries/{id}        # Get ministry details
POST   /api/ministries/{id}/join   # Join ministry
GET    /api/ministries/{id}/members # Get ministry members
POST   /api/ministries/{id}/contact # Contact ministry leader
```

### 4. Financial Management

```python
# Donations and giving
POST   /api/donations/create       # Process donation
GET    /api/donations/history      # User donation history
GET    /api/donations/{id}/receipt # Get donation receipt
POST   /api/donations/recurring    # Set up recurring donation
DELETE /api/donations/recurring/{id} # Cancel recurring donation
GET    /api/donations/statements   # Annual giving statements
```

### 5. Calendar & Events (COE)

```python
# Calendar and events
GET    /api/calendar               # Get calendar view
GET    /api/events                 # List upcoming events
GET    /api/events/{id}            # Get event details
POST   /api/events                 # Create event (admin)
POST   /api/events/{id}/rsvp       # RSVP to event
GET    /api/events/{id}/attendees  # Get event attendees
PUT    /api/events/{id}/attendance # Mark attendance
GET    /api/calendar/export        # Export calendar (iCal format)
```

### 6. Prayer Requests & Spiritual Support

```python
# Prayer requests management
GET    /api/prayers                # List public prayer requests
POST   /api/prayers                # Submit new prayer request
GET    /api/prayers/{id}           # Get prayer request details
PUT    /api/prayers/{id}/pray      # Mark that you prayed for this request
POST   /api/prayers/{id}/answer    # Submit praise report/answered prayer
DELETE /api/prayers/{id}           # Delete prayer request (own requests only)

# Prayer chain management
POST   /api/prayer-chain/join      # Join prayer chain
DELETE /api/prayer-chain/leave     # Leave prayer chain
GET    /api/prayer-chain/members   # Get prayer chain statistics
PUT    /api/prayer-chain/preferences # Update notification preferences

# Prayer wall & community
GET    /api/prayers/wall           # Get prayer wall (public requests)
GET    /api/prayers/recent         # Get recent prayers for display
GET    /api/prayers/statistics     # Get prayer statistics (total requests, answered, etc.)
POST   /api/prayers/{id}/amen      # Add "amen" or support to prayer
GET    /api/prayers/categories     # Get prayer request categories
```

### 6. Administrative & Content Management

```python
# Content moderation and management
GET    /api/admin/content/pending  # Get content awaiting approval
PUT    /api/admin/content/{id}/approve # Approve content
DELETE /api/admin/content/{id}/reject # Reject content
GET    /api/admin/prayers/moderate # Review prayer requests
PUT    /api/admin/prayers/{id}/feature # Feature prayer on wall
DELETE /api/admin/prayers/{id}    # Remove inappropriate prayer

# User and ministry management
GET    /api/admin/users            # List all users with roles
PUT    /api/admin/users/{id}/role  # Update user role/permissions
GET    /api/admin/ministries       # Manage all ministries
POST   /api/admin/ministries       # Create new ministry
PUT    /api/admin/ministries/{id}  # Update ministry details
GET    /api/admin/ministries/{id}/members # View ministry members

# Content analytics and reporting
GET    /api/admin/analytics        # Site analytics dashboard
GET    /api/admin/reports/donations # Financial reports
GET    /api/admin/reports/engagement # User engagement metrics
GET    /api/admin/reports/content  # Content performance stats

# System administration
POST   /api/admin/notify/bulk      # Send bulk notifications
GET    /api/admin/uploads          # Manage file uploads
POST   /api/admin/backup           # Database backup
GET    /api/admin/logs             # System logs and errors
```

### 7. Real-time & Notifications

```python
# WebSocket endpoints
WS     /ws/notifications/          # Real-time notifications
WS     /ws/live-chat/              # Live chat during services
WS     /ws/prayer-requests/        # Real-time prayer requests

# Notification management
GET    /api/notifications          # Get user notifications
PUT    /api/notifications/{id}/read # Mark notification as read
POST   /api/notifications/subscribe # Subscribe to notifications
DELETE /api/notifications/unsubscribe # Unsubscribe from notifications
```

---

## Real-time Features

### 1. WebSocket Consumers

```python
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import User, Notification

class NotificationsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'notifications'
        
        # Join notification group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave notification group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'notification_message',
                'message': message
            }
        )

    async def notification_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'timestamp': str(datetime.now())
        }))

class LiveChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'live_service'
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'timestamp': str(datetime.now())
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))
```

### 2. Frontend WebSocket Integration

```javascript
// Real-time notification hook
const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/notifications/');
    
    ws.onopen = () => {
      console.log('Connected to notifications');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(prev => [data, ...prev.slice(0, 49)]); // Keep last 50
      
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(data.message, {
          icon: '/logo.png',
          tag: 'church-notification'
        });
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from notifications');
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { notifications, socket };
};

// Live chat component
const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/live-chat/');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && newMessage.trim()) {
      socket.send(JSON.stringify({
        message: newMessage,
        username: user.username
      }));
      setNewMessage('');
    }
  };

  return (
    <div className="live-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}:</strong> {msg.message}
            <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
```

---

## Security & Authentication

### 1. Authentication System

```python
# JWT-based authentication
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            # Log successful login
            user = User.objects.get(email=request.data['email'])
            user.last_login = datetime.utcnow()
            user.save()
        return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({'message': 'This is a protected endpoint'})
```

### 2. Role-Based Permissions

```python
from rest_framework.permissions import BasePermission

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user.is_authenticated and request.user.role == 'admin'

class IsMinistryLeaderOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return (request.user.is_authenticated and 
                (request.user.role in ['admin', 'leader'] or 
                 obj.leader == request.user))
```

### 3. Data Validation

```python
from rest_framework import serializers
from .models import Book, Announcement

class BookSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    author = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False)
    category = serializers.ChoiceField(choices=['theology', 'devotional', 'bible_study', 'biography', 'ministry'])
    file = serializers.FileField()
    
    def validate_file(self, value):
        if not value.name.endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files are allowed.")
        if value.size > 50 * 1024 * 1024:  # 50MB limit
            raise serializers.ValidationError("File size cannot exceed 50MB.")
        return value

class AnnouncementSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    content = serializers.CharField()
    category = serializers.ChoiceField(choices=['general', 'event', 'urgent', 'ministry'])
    expiry_date = serializers.DateTimeField(required=False)
    target_audience = serializers.ListField(child=serializers.CharField())
```

---

## Hosting Considerations

### 1. Current Stack Analysis

Your current Django setup with MongoDB and Channels requires:
- **Python environment** with package installation
- **MongoDB database** (local or cloud)
- **Redis server** for WebSocket channel layers
- **ASGI server** (Daphne/Uvicorn) for WebSocket support
- **Static/Media file serving**

### 2. Shared Hosting Limitations

Most shared hosting providers **cannot support**:
- Custom Python package installation
- MongoDB connections
- Redis server
- WebSocket/ASGI applications
- Long-running processes

### 3. Hosting Options Comparison

| Feature | Shared Hosting | VPS | Cloud Platform |
|---------|---------------|-----|---------------|
| **Cost** | $3-10/month | $5-20/month | $10-50/month |
| **WebSockets** | ❌ No | ✅ Yes | ✅ Yes |
| **MongoDB** | ❌ No | ✅ Yes | ✅ Yes (Atlas) |
| **Custom Packages** | ❌ Limited | ✅ Full control | ✅ Yes |
| **Redis** | ❌ No | ✅ Yes | ✅ Yes |
| **Scaling** | ❌ Limited | ⚠️ Manual | ✅ Automatic |
| **Maintenance** | ✅ Managed | ❌ Self-managed | ✅ Managed |

### 4. Recommended Architecture for Different Budgets

#### **Budget Option: Hybrid Approach ($8-15/month)**
```yaml
Frontend: Vercel/Netlify (Free)
Backend API: Railway/Render ($5-10/month)
Database: MongoDB Atlas (Free tier)
Real-time: Pusher/Ably (Free tier)
File Storage: Cloudinary (Free tier)
```

#### **Optimal Option: VPS ($10-25/month)**
```yaml
Server: DigitalOcean Droplet ($5/month)
Database: MongoDB Atlas (Free tier)
CDN: Cloudflare (Free)
SSL: Let's Encrypt (Free)
Backup: DigitalOcean Snapshots ($1/month)
```

#### **Production Option: Cloud Platform ($25-100/month)**
```yaml
Frontend: Vercel Pro
Backend: AWS ECS/Railway Pro
Database: MongoDB Atlas Dedicated
Cache: Redis Cloud
Storage: AWS S3
CDN: CloudFront
```

---

## Migration Paths

### 1. Keep Current Stack (RECOMMENDED)

**Time: 4-6 hours**
**Cost: $10-20/month**

```bash
# Remove WebSocket dependencies
pip uninstall channels channels-redis

# Update settings for shared hosting compatibility
# Use MongoDB Atlas for database
# Deploy to Railway/Render for ASGI support
```

**Steps:**
1. Create MongoDB Atlas cluster (30 minutes)
2. Update environment variables (15 minutes)
3. Remove Channels from settings (30 minutes)
4. Deploy to Railway/Render (2-3 hours)
5. Configure domain and SSL (1 hour)

### 2. Migrate to PHP/Laravel

**Time: 3-4 weeks**
**Cost: $5-15/month**

**Week 1: Setup & Basic Structure**
- Learn Laravel basics
- Set up development environment
- Create basic project structure
- Set up MySQL/PostgreSQL database

**Week 2: Core Features**
- Recreate all models
- Build authentication system
- Implement basic API endpoints
- Set up file upload handling

**Week 3: Advanced Features**
- Implement real-time features with Pusher
- Build admin dashboard
- Create payment integration
- Set up email notifications

**Week 4: Testing & Deployment**
- Test all functionality
- Set up shared hosting deployment
- Configure domain and SSL
- Performance optimization

### 3. Hybrid Supabase Approach

**Time: 1-2 weeks**
**Cost: Free - $25/month**

**Days 1-3: Supabase Setup**
- Create Supabase project
- Design PostgreSQL schema
- Set up authentication
- Configure storage buckets

**Days 4-7: Frontend Integration**
- Replace Django API calls with Supabase
- Implement real-time subscriptions
- Set up file upload/download
- Configure authentication flow

**Days 8-14: Advanced Features**
- Implement role-based access
- Set up email notifications
- Create admin functions
- Testing and optimization

---

## Final Recommendations

Based on your requirements and budget concerns, I recommend **keeping your current Django/React stack** with these modifications:

### **Immediate Action Plan (4-6 hours)**

1. **Remove WebSocket Dependencies** (1 hour)
   ```python
   # Remove from settings.py
   # 'channels',
   # ASGI_APPLICATION = 'church_api.asgi.application'
   # CHANNEL_LAYERS = {...}
   ```

2. **Set up MongoDB Atlas** (1 hour)
   - Create free cluster
   - Update DB_URI in environment

3. **Deploy to Railway** (2-3 hours)
   - Connect GitHub repository
   - Configure environment variables
   - Deploy with automatic builds

4. **Configure Domain** (1 hour)
   - Point domain to Railway
   - Set up SSL certificate

### **Optional Real-time Features**
If you need real-time notifications:
- Use **Pusher** (free tier: 100 connections, 200k messages/day)
- Simple JavaScript integration
- Works perfectly with shared hosting

This approach gives you:
- ✅ **Low cost**: $10-15/month total
- ✅ **Minimal code changes**: 95% of your work is preserved
- ✅ **Professional hosting**: Reliable, fast, scalable
- ✅ **Easy maintenance**: Managed infrastructure
- ✅ **Future-proof**: Can easily add features later

### **Environment Variables Required**

```bash
# Production Environment Variables
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DB_NAME=churchdb
DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/churchdb?retryWrites=true&w=majority
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
CSRF_TRUSTED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional for real-time features
REDIS_URL=redis://localhost:6379/0
PUSHER_APP_ID=your-pusher-app-id
PUSHER_KEY=your-pusher-key
PUSHER_SECRET=your-pusher-secret
PUSHER_CLUSTER=your-pusher-cluster
```

### **Next Steps**

1. **Review this analysis** and decide on the hosting approach
2. **Set up MongoDB Atlas** account and cluster
3. **Choose hosting platform** (Railway, Render, or VPS)
4. **Plan migration timeline** based on your availability
5. **Prepare domain and SSL** requirements

This comprehensive analysis should help you make an informed decision about your DeKUSDA website hosting and development strategy.
