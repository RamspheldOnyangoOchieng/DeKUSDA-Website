import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home
import Home from "./pages/Home";

// About
import AboutDekusda from "./pages/About/AboutDekusda";
import AboutSDA from "./pages/About/AboutSDA";
import PastorMessage from "./pages/About/PastorMessage";
import ElderMessage from "./pages/About/ElderMessage";
import Leaders2022 from "./pages/About/Leadership/Leaders2022";
import Leaders2023 from "./pages/About/Leadership/Leaders2023";
import Leaders2024 from "./pages/About/Leadership/Leaders2024";

// Ministries / Departments
import PersonalMinistries from "./pages/Ministries/PersonalMinistries";
import PrayerDepartment from "./pages/Ministries/PrayerDepartment";
import AMO_ALO from "./pages/Ministries/AMO_ALO";
import Health from "./pages/Ministries/Health";
import SabbathSchool from "./pages/Ministries/SabbathSchool";
import ProphecyDepartment from "./pages/Ministries/Prophecy";

// Music Groups
import ChurchChoir from "./pages/Music/ChurchChoir";
import DCM from "./pages/Music/DCM";
import Blissful from "./pages/Music/Blissful";

// Evangelism
import PCM from "./pages/Evangelism/PCM";
import Evangelism from "./pages/Evangelism/Evangelism";

// Resources
import COE from "./pages/Resources/COE";
import Sermons from "./pages/Resources/Sermons";
import Books from "./pages/Resources/Books";

// More Pages
import Announcements from "./pages/More/Announcements";
import SabbathCalendar from "./pages/Resources/COE"; // Reusing COE for Calendar

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/about/dekusda" element={<AboutDekusda />} />
        <Route path="/about/sda" element={<AboutSDA />} />
        <Route path="/about/pastor-message" element={<PastorMessage />} />
        <Route path="/about/elder-message" element={<ElderMessage />} />
        <Route path="/about/leaders/2024" element={<Leaders2024 />} />
        <Route path="/about/leaders/2023" element={<Leaders2023 />} />
        <Route path="/about/leaders/2022" element={<Leaders2022 />} />

        {/* Ministries / Departments */}
        <Route path="/ministries/personal" element={<PersonalMinistries />} />
        <Route path="/ministries/prayer" element={<PrayerDepartment />} />
        <Route path="/ministries/amo-alo" element={<AMO_ALO />} />
        <Route path="/ministries/health" element={<Health />} />
        <Route path="/ministries/sabbath-school" element={<SabbathSchool />} />
        <Route path="/ministries/prophecy" element={<ProphecyDepartment />} />

        {/* Music */}
        <Route path="/music/choir" element={<ChurchChoir />} />
        <Route path="/music/dcm" element={<DCM />} />
        <Route path="/music/blissful" element={<Blissful />} />

        {/* Evangelism */}
        <Route path="/evangelism/pcm" element={<PCM />} />
        <Route path="/evangelism" element={<Evangelism />} />

        {/* Resources */}
        <Route path="/resources/coe" element={<COE />} />
        <Route path="/resources/sermons" element={<Sermons />} />
        <Route path="/resources/books" element={<Books />} />

        {/* More */}
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/sabbath-calendar" element={<SabbathCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
