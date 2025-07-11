import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AboutDekusda } from './pages/About/AboutDekusda';
import { AboutSDA } from './pages/About/AboutSDA';
import { PastorMessage } from './pages/About/PastorMessage';
import { ElderMessage } from './pages/About/ElderMessage';
import { Leaders2022 } from './pages/About/Leadership/Leaders2022';
import { Leaders2023 } from './pages/About/Leadership/Leaders2023';
import { Leaders2024 } from './pages/About/Leadership/Leaders2024';
import { PersonalMinistries } from './pages/Ministries/PersonalMinistries';
import { PCM } from './pages/Evangelism/PCM';
import { ChurchChoir } from './pages/Music/ChurchChoir';
import { DCM } from './pages/Music/DCM';
import { Blissful } from './pages/Music/Blissful';
import { COE } from './pages/Resources/COE';
import { Sermons } from './pages/Resources/Sermons';
import { Books } from './pages/Resources/Books';
import PrayerDepartment from './pages/Ministries/PrayerDepartment'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Aboutdekusda" element={<AboutDekusda />} />
        <Route path="/Aboutsda" element={<AboutSDA />} />
        <Route path="/Pastormessage" element={<PastorMessage />} />
        <Route path="/Eldermessage" element={<ElderMessage />} />
        <Route path="/Leaders2024" element={<Leaders2024 />} />
        <Route path="/Leaders2023" element={<Leaders2023 />} />
        <Route path="/Leaders2022" element={<Leaders2022 />} />
        <Route path="/Personalministries" element={<PersonalMinistries />} />
        <Route path="/PCM" element={<PCM />} />
        <Route path="/Churchchoir" element={<ChurchChoir />} />
        <Route path="/DCM" element={<DCM />} />
        <Route path="/Blissful" element={<Blissful />} />
        <Route path="/COE" element={<COE />} />
        <Route path="/Sermons" element={<Sermons />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/PrayerDepartment" element={<PrayerDepartment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
