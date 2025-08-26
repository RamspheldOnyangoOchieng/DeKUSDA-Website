import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Home
import Home from './pages/Home';

// About
import AboutDekusda from './pages/About/AboutDekusda';
import AboutSDA from './pages/About/AboutSDA';
import PastorMessage from './pages/About/PastorMessage';
import ElderMessage from './pages/About/ElderMessage';
import Leaders2022 from './pages/About/Leadership/Leaders2022';
import Leaders2023 from './pages/About/Leadership/Leaders2023';
import Leaders2024 from './pages/About/Leadership/Leaders2024';

// Ministries / Departments
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
import Sermons from './pages/Resources/Sermons';
import Books from './pages/Resources/Books';

// More Pages
import Announcements from './pages/More/Announcements';
import SabbathCalendar from './pages/Resources/COE'; // Reusing COE for Calendar

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/Aboutdekusda" element={<AboutDekusda />} />
        <Route path="/Aboutsda" element={<AboutSDA />} />
        <Route path="/Pastormessage" element={<PastorMessage />} />
        <Route path="/Eldermessage" element={<ElderMessage />} />
        <Route path="/Leaders2024" element={<Leaders2024 />} />
        <Route path="/Leaders2023" element={<Leaders2023 />} />
        <Route path="/Leaders2022" element={<Leaders2022 />} />

        {/* Ministries / Departments */}
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
        <Route path="/Sermons" element={<Sermons />} />
        <Route path="/Books" element={<Books />} />

        {/* More */}
        <Route path="/Announcements" element={<Announcements />} />
        <Route path="/SabbathCalendar" element={<SabbathCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
