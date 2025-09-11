// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    USER: '/user',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password'
  },
  PRAYERS: {
    BASE: '/prayers',
    WALL: '/prayers/wall',
    RECENT: '/prayers/recent',
    CATEGORIES: '/prayers/categories',
    STATISTICS: '/prayers/statistics'
  },
  EVENTS: {
    BASE: '/events',
    CALENDAR: '/events/calendar'
  },
  BOOKS: {
    BASE: '/books'
  },
  DONATIONS: {
    CREATE: '/donations/create',
    HISTORY: '/donations/history',
    RECURRING: '/donations/recurring',
    STATEMENTS: '/donations/statements'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    CONTENT: '/admin/content',
    PRAYERS: '/admin/prayers',
    USERS: '/admin/users',
    REPORTS: '/admin/reports'
  }
};

// User Roles
export const USER_ROLES = {
  MEMBER: 'member',
  LEADER: 'leader',
  ADMIN: 'admin'
};

// Prayer Categories (must match backend validation)
export const PRAYER_CATEGORIES = [
  { value: 'healing', label: 'Healing' },
  { value: 'guidance', label: 'Guidance' },
  { value: 'thanksgiving', label: 'Thanksgiving' },
  { value: 'family', label: 'Family' },
  { value: 'financial', label: 'Financial' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'other', label: 'Other' }
];

// Event Types
export const EVENT_TYPES = [
  { value: 'service', label: 'Worship Service' },
  { value: 'bible_study', label: 'Bible Study' },
  { value: 'fellowship', label: 'Fellowship' },
  { value: 'outreach', label: 'Outreach' },
  { value: 'youth', label: 'Youth Ministry' },
  { value: 'prayer', label: 'Prayer Meeting' },
  { value: 'special', label: 'Special Event' }
];

// Book Categories
export const BOOK_CATEGORIES = [
  { value: 'theology', label: 'Theology' },
  { value: 'devotional', label: 'Devotional' },
  { value: 'prophecy', label: 'Prophecy' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'family', label: 'Family Life' },
  { value: 'youth', label: 'Youth' },
  { value: 'general', label: 'General' }
];

// Donation Types
export const DONATION_TYPES = [
  { value: 'tithe', label: 'Tithe' },
  { value: 'offering', label: 'Offering' },
  { value: 'missions', label: 'Missions' },
  { value: 'building', label: 'Building Fund' },
  { value: 'special', label: 'Special Project' }
];

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'mpesa', label: 'M-Pesa' },
  { value: 'bank_transfer', label: 'Bank Transfer' }
];

// Content Types for Admin
export const CONTENT_TYPES = {
  PRAYER_REQUEST: 'prayer_request',
  ANNOUNCEMENT: 'announcement',
  BOOK: 'book',
  SERMON: 'sermon',
  COMMENT: 'comment'
};

// Status Types
export const STATUS_TYPES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

// Navigation Menu Items
export const MAIN_MENU = [
  {
    label: 'Home',
    path: '/',
    icon: 'home'
  },
  {
    label: 'About',
    path: '/about',
    icon: 'info',
    submenu: [
      { label: 'About DeKUSDA', path: '/Aboutdekusda' },
      { label: 'About SDA', path: '/Aboutsda' },
      { label: 'Pastor Message', path: '/Pastormessage' },
      { label: 'Elder Message', path: '/Eldermessage' },
      { label: 'Leadership 2024', path: '/Leaders2024' }
    ]
  },
  {
    label: 'Ministries',
    path: '/ministries',
    icon: 'users',
    submenu: [
      { label: 'Personal Ministries', path: '/Personalministries' },
      { label: 'Prayer Department', path: '/PrayerDepartment' },
      { label: 'AMO ALO', path: '/AMO_ALO' },
      { label: 'Health Ministry', path: '/Health' },
      { label: 'Sabbath School', path: '/SabbathSchool' },
      { label: 'Prophecy', path: '/Prophecy' }
    ]
  },
  {
    label: 'Resources',
    path: '/resources',
    icon: 'book',
    submenu: [
      { label: 'Calendar of Events', path: '/COE' },
      { label: 'Books', path: '/Books' },
      { label: 'Tithes & Offerings', path: '/tithes-offerings' }
    ]
  },
  {
    label: 'Music',
    path: '/music',
    icon: 'music',
    submenu: [
      { label: 'Church Choir', path: '/Music/ChurchChoir' },
      { label: 'DCM', path: '/Music/DCM' },
      { label: 'Blissful', path: '/Music/Blissful' }
    ]
  }
];

// Admin Menu Items
export const ADMIN_MENU = [
  { label: 'Dashboard', path: '/admin', icon: 'dashboard' },
  { label: 'Content Moderation', path: '/admin/content', icon: 'moderation' },
  { label: 'Prayer Requests', path: '/admin/prayers', icon: 'prayer' },
  { label: 'Users', path: '/admin/users', icon: 'users' },
  { label: 'Events', path: '/admin/events', icon: 'calendar' },
  { label: 'Books', path: '/admin/books', icon: 'book' },
  { label: 'Analytics', path: '/admin/analytics', icon: 'chart' },
  { label: 'Settings', path: '/admin/settings', icon: 'settings' }
];
