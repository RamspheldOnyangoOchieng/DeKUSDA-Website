import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutDekusda from './pages/About/AboutDekusda';
import AboutSDA from './pages/About/AboutSDA';
import ElderMessage from './pages/About/ElderMessage';
import Leaders2022 from './pages/About/Leadership/Leaders2022';
import Leaders2023 from './pages/About/Leadership/Leaders2023';
import Leaders2024 from './pages/About/Leadership/Leaders2024';
import PastorMessage from './pages/About/PastorMessage';
import PCM from './pages/Evangelism/PCM';
import Home from './pages/Home';
import PersonalMinistries from './pages/Ministries/PersonalMinistries';
import Announcements from './pages/More/Announcements';
import Blissful from './pages/Music/Blissful';
import ChurchChoir from './pages/Music/ChurchChoir';
import DCM from './pages/Music/DCM';
import Books from './pages/Resources/Books';
import COE from './pages/Resources/COE';
import Sermons from './pages/Resources/Sermons';

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
        <Route path="/Announcements" element={<Announcements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;