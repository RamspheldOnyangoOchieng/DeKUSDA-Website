import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context and Components
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ProtectedRoute, AdminRoute, MemberRoute } from './components/ProtectedRoute';

// Home
import Home from './pages/Home';

// Portal Pages
import MembersPortal from './pages/MembersPortal';
import LeadersPortal from './pages/LeadersPortal';
import CommunicationDashboard from './pages/CommunicationDashboard';
import DepartmentDashboard from './pages/DepartmentDashboard';
import SeniorAdminDashboard from './pages/SeniorAdminDashboard';

// About
import AboutDekusda from './pages/About/AboutDekusda';
import AboutSDA from './pages/About/AboutSDA';
import PastorMessage from './pages/About/PastorMessage';
import ElderMessage from './pages/About/ElderMessage';
import Leaders2022 from './pages/About/Leadership/Leaders2022';
import Leaders2023 from './pages/About/Leadership/Leaders2023';
import Leaders2024 from './pages/About/Leadership/Leaders2024';

// Ministries / Departments
import DeconaryDepartment from './pages/Ministries/DeconaryDepartment';
import PersonalMinistries from './pages/Ministries/PersonalMinistries';
import PrayerDepartment from './pages/Ministries/PrayerDepartment';
import AMO_ALO from './pages/Ministries/AMO_ALO';
import Health from './pages/Ministries/Health';
import SabbathSchool from './pages/Ministries/SabbathSchool';
import ProphecyDepartment from './pages/Ministries/Prophecy';

// Music Groups
import ChurchChoir from './pages/Music/ChurchChoir';
import DCM from './pages/Music/DCM';
import Blissful from './pages/Music/Blissful';

// Evangelism
import PCM from './pages/Evangelism/PCM';
import Evangelism from './pages/Evangelism/Evangelism';

// Resources
import COE from './pages/Resources/COE';
// Remove the old import
// import TithesOfferings from './pages/Resources/TithesOfferings';

// Add the new import (adjust path if your component is in a different folder)
import TithesOfferings from './pages/Resources/TithesOfferings';



import Books from './pages/Resources/Books';

// More Pages
import Announcements from './pages/More/Announcements';
import SabbathCalendar from './pages/Resources/COE'; // Reusing COE for Calendar
// Legal
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import Accessibility from './pages/Legal/Accessibility';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageSermons from './pages/Admin/ManageSermons';
import ManageMembers from './pages/Admin/ManageMembers';
import ManageGallery from './pages/Admin/ManageGallery';

// Member Pages
import MemberDashboard from './pages/Member/MemberDashboard';
import MyProfile from './pages/Member/MyProfile';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Portal Access */}
            <Route path="/members" element={<MembersPortal />} />
            <Route path="/leaders" element={<LeadersPortal />} />

            {/* Dashboard Routes */}
            <Route path="/member-dashboard" element={
              <ProtectedRoute>
                <MemberDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/communication-dashboard" element={
              <ProtectedRoute>
                <CommunicationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/department-dashboard" element={
              <ProtectedRoute>
                <DepartmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/senior-admin-dashboard" element={
              <ProtectedRoute>
                <SeniorAdminDashboard />
              </ProtectedRoute>
            } />

            {/* About */}
            <Route path="/Aboutdekusda" element={<AboutDekusda />} />
            <Route path="/Aboutsda" element={<AboutSDA />} />
            <Route path="/Pastormessage" element={<PastorMessage />} />
            <Route path="/Eldermessage" element={<ElderMessage />} />
            <Route path="/Leaders2024" element={<Leaders2024 />} />
            <Route path="/Leaders2023" element={<Leaders2023 />} />
            <Route path="/Leaders2022" element={<Leaders2022 />} />

            {/* Ministries / Departments */}
            <Route path="/DeconaryDepartment" element={<DeconaryDepartment />} />
            <Route path="/Personalministries" element={<PersonalMinistries />} />
            <Route path="/PrayerDepartment" element={<PrayerDepartment />} />
            <Route path="/AMO_ALO" element={<AMO_ALO />} />
            <Route path="/Health" element={<Health />} />
            <Route path="/SabbathSchool" element={<SabbathSchool />} />
            <Route path="/Prophecy" element={<ProphecyDepartment />} />

            {/* Music */}
            <Route path="/Music/ChurchChoir" element={<ChurchChoir />} />
            <Route path="/Music/DCM" element={<DCM />} />
            <Route path="/Music/Blissful" element={<Blissful />} />

            {/* Evangelism */}
            <Route path="/PCM" element={<PCM />} />
            <Route path="/Evangelism" element={<Evangelism />} />

            {/* Resources */}
            <Route path="/COE" element={<COE />} />
            <Route path="/tithes-offerings" element={<TithesOfferings />} />
            <Route path="/Books" element={<Books />} />

            {/* More */}
            <Route path="/Announcements" element={<Announcements />} />
            <Route path="/SabbathCalendar" element={<SabbathCalendar />} />

            {/* Legal */}
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<Accessibility />} />

            {/* Member Routes */}
            <Route path="/member/dashboard" element={
              <MemberRoute>
                <MemberDashboard />
              </MemberRoute>
            } />
            <Route path="/member/profile" element={
              <MemberRoute>
                <MyProfile />
              </MemberRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/events" element={
              <AdminRoute>
                <ManageEvents />
              </AdminRoute>
            } />
            <Route path="/admin/sermons" element={
              <AdminRoute>
                <ManageSermons />
              </AdminRoute>
            } />
            <Route path="/admin/members" element={
              <AdminRoute>
                <ManageMembers />
              </AdminRoute>
            } />
            <Route path="/admin/gallery" element={
              <AdminRoute>
                <ManageGallery />
              </AdminRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}
export default App;
