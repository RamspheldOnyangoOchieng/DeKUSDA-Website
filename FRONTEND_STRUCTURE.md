# DeKUSDA Website - Complete Frontend Structure

## Current Frontend Architecture

### Root Structure
```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── Prophecy.jsx
│   ├── assets/           # 50+ images and media files
│   ├── components/       # React components organized by feature
│   └── pages/           # Page components
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

### Complete Components Structure

#### Core Components (`src/components/`)
```
components/
├── Loader.jsx           # Loading spinner component

├── Admin/               # Admin panel components
│   ├── AdminDashboard.jsx      # Main admin dashboard with stats
│   ├── ContentModeration.jsx   # Content approval system
│   ├── PrayerModeration.jsx    # Prayer request moderation
│   └── UserManagement.jsx      # User role management

├── Auth/                # Authentication components
│   ├── LoginForm.jsx           # User login form
│   ├── RegisterForm.jsx        # User registration form
│   └── ProtectedRoute.jsx      # Route protection wrapper

├── Prayer/              # Prayer system components
│   ├── PrayerForm.jsx          # Submit prayer requests
│   ├── PrayerWall.jsx          # Display public prayers
│   └── PrayerCard.jsx          # Individual prayer display

└── UI/                  # Reusable UI components
    ├── Button.jsx              # Styled button component
    └── Modal.jsx               # Modal dialog component
```

#### Pages Structure (`src/pages/`)
```
pages/
├── About.jsx
├── Activities.jsx
├── AdventistBooks.jsx
├── Baptism.jsx
├── Bereans.jsx
├── BibleStudy.jsx
├── Calling.jsx
├── CalendarOfEvents.jsx     # COE - Calendar of Events
├── Contact.jsx
├── Denomination.jsx
├── Donations.jsx
├── Events.jsx
├── Faith.jsx
├── Gallery.jsx
├── HealthAndWellness.jsx
├── Home.jsx
├── Leadership.jsx
├── Location.jsx
├── Mission.jsx
├── Ministries.jsx
├── News.jsx
├── PCMGroup.jsx
├── Prayer.jsx
├── Prophecy.jsx
├── Sabbath.jsx
├── Sermons.jsx
├── Services.jsx
├── Support.jsx
├── Sunset.jsx
└── Vision.jsx
```

### Service Layer (`src/services/`)
```
services/
├── api.js               # Base API configuration with Laravel Sanctum
├── auth.js              # Authentication service
├── prayers.js           # Prayer requests API
├── events.js            # Calendar events API
├── books.js             # Adventist books API
├── donations.js         # Digital giving API
└── admin.js             # Admin panel API
```

### Context Management (`src/context/`)
```
context/
├── AuthContext.jsx      # User authentication state
└── AdminContext.jsx     # Admin panel state management
```

### Utilities (`src/utils/`)
```
utils/
├── constants.js         # App-wide constants and configuration
└── helpers.js           # Utility functions and formatters
```

## Integration Architecture

### Laravel Backend Integration
- **Authentication**: Laravel Sanctum SPA authentication
- **API Endpoints**: RESTful APIs for all features
- **Real-time**: Laravel WebSockets with Pusher
- **File Storage**: Laravel Storage for media files

### State Management
- **React Context**: For global state (auth, admin)
- **Local State**: Component-level with useState/useReducer
- **API State**: Service layer with proper error handling

### Routing Structure
```jsx
// Protected Routes
/admin/*           - Admin dashboard (admin role required)
/prayer/manage     - Prayer moderation (moderator+ role)
/profile           - User profile (authenticated users)

// Public Routes
/                  - Home page
/about             - About page
/prayer            - Prayer wall
/events            - Calendar of events
/books             - Adventist books
// ... all other pages
```

### Component Patterns

#### Service Integration
```jsx
// Example: Prayer component using service layer
import { prayerService } from '../services/prayers';

const PrayerComponent = () => {
  const [prayers, setPrayers] = useState([]);
  
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const response = await prayerService.getPublicPrayers();
        setPrayers(response.data);
      } catch (error) {
        console.error('Error fetching prayers:', error);
      }
    };
    
    fetchPrayers();
  }, []);
  
  // Component JSX
};
```

#### Context Usage
```jsx
// Example: Using authentication context
import { useAuth } from '../context/AuthContext';

const Component = () => {
  const { user, login, logout, loading } = useAuth();
  
  if (loading) return <Loader />;
  
  return user ? <AuthenticatedView /> : <LoginForm />;
};
```

## File Organization Principles

### 1. Feature-Based Structure
- Components grouped by functionality (Admin, Auth, Prayer, UI)
- Related components in same directory
- Clear separation of concerns

### 2. Service Layer Pattern
- All API calls abstracted into service files
- Centralized error handling
- Consistent request/response patterns

### 3. Component Composition
- Reusable UI components (Button, Modal)
- Higher-order components (ProtectedRoute)
- Compound components (AdminDashboard with sub-components)

### 4. State Management Strategy
- Global state via React Context
- Local state for component-specific data
- Service layer for API state management

## Development Workflow

### 1. Component Development
```bash
# Create new component
mkdir src/components/NewFeature
touch src/components/NewFeature/NewComponent.jsx

# Export from index if needed
echo "export { default } from './NewComponent';" > src/components/NewFeature/index.js
```

### 2. Service Integration
```javascript
// Add new service method
// src/services/newFeature.js
export const newFeatureService = {
  async getItems() {
    return api.get('/api/new-feature');
  },
  
  async createItem(data) {
    return api.post('/api/new-feature', data);
  }
};
```

### 3. Route Integration
```jsx
// Add to App.jsx routing
<Route path="/new-feature" element={<NewFeatureComponent />} />
<Route path="/admin/new-feature" element={
  <ProtectedRoute requiredRole="admin">
    <AdminNewFeatureComponent />
  </ProtectedRoute>
} />
```

## Technology Stack

### Frontend
- **React 18** - Component framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **React Icons** - Icon library

### Backend Integration
- **Laravel 10** - Backend API
- **Laravel Sanctum** - SPA authentication
- **MySQL 8.0** - Database
- **Laravel WebSockets** - Real-time features

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vite** - Hot reload development

## Key Features Implemented

### 1. Authentication System
- ✅ Login/Register forms with validation
- ✅ Protected routes with role-based access
- ✅ Context-based state management
- ✅ Laravel Sanctum integration ready

### 2. Admin Panel
- ✅ Dashboard with statistics
- ✅ Content moderation system
- ✅ Prayer request approval
- ✅ User management with roles

### 3. Prayer System
- ✅ Prayer request submission
- ✅ Public prayer wall
- ✅ Moderation workflow
- ✅ Anonymous submission support

### 4. Service Layer
- ✅ API abstraction
- ✅ Error handling
- ✅ Authentication integration
- ✅ Consistent patterns

### 5. UI Components
- ✅ Reusable Button component
- ✅ Modal system
- ✅ Loading states
- ✅ Form validation

## Next Steps for Full Implementation

### 1. Complete Remaining Components
- [ ] Event management components
- [ ] Donation system components
- [ ] Content management components
- [ ] Media gallery components

### 2. Update Main App Structure
- [ ] Integrate new context providers
- [ ] Update routing with protected routes
- [ ] Add navigation authentication states
- [ ] Implement role-based menu items

### 3. Backend Integration
- [ ] Connect to Laravel API endpoints
- [ ] Implement real-time features
- [ ] Set up file upload handling
- [ ] Configure authentication flow

### 4. Testing and Optimization
- [ ] Add component tests
- [ ] Implement error boundaries
- [ ] Optimize bundle size
- [ ] Add progressive web app features

This structure provides a solid foundation for the complete Laravel migration while maintaining the excellent organization of the existing React frontend.
