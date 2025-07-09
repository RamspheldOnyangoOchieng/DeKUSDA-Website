import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {AboutDekusda} from './pages/About/AboutDekusda';
import {AboutSDA} from './pages/About/AboutSDA';
import { PastorMessage } from './pages/About/PastorMessage';
import { ElderMessage } from './pages/About/ElderMessage';
import { Leaders2022 } from './pages/About/Leadership/Leaders2022';
import { Leaders2023 } from './pages/About/Leadership/Leaders2023';
import { Leaders2024 } from './pages/About/Leadership/Leaders2024';
import { PersonalMinistries } from './pages/Ministries/PersonalMinistries';
import { PCM  } from './pages/Evangelism/PCM';
import {ChurchChoir} from './pages/Music/ChurchChoir'
import {DCM} from './pages/Music/DCM'
import {Blissful} from './pages/Music/Blissful'
import {COE} from './pages/Resources/COE'
import {Sermons} from './pages/Resources/Sermons'
import {Books} from './pages/Resources/Books'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path='/Aboutdekusda' element={<AboutDekusda></AboutDekusda>}></Route>
        <Route path='/Aboutsda' element={<AboutSDA></AboutSDA>}></Route>
        <Route path='/Pastormessage' element={<PastorMessage></PastorMessage>}></Route>
        <Route path='/Eldermessage' element={<ElderMessage></ElderMessage>}></Route>
        <Route path='Leaders2024' element={<Leaders2024></Leaders2024>}></Route>
        <Route path='Leaders2023' element={<Leaders2023></Leaders2023>}></Route>
        <Route path='Leaders2022' element={<Leaders2022></Leaders2022>}></Route>
        <Route path="/Personalministries" element={<PersonalMinistries></PersonalMinistries>}/>
        <Route path='/PCM' element={<PCM></PCM>}></Route>
        <Route path='/Churchchoir' element={<ChurchChoir></ChurchChoir>}></Route>
        <Route path='/DCM' element={<DCM></DCM>}></Route>
        <Route path='/Blissful' element={<Blissful></Blissful>}></Route>
        <Route path='/COE' element={<COE></COE>}></Route>
        <Route path='/Sermons' element={<Sermons></Sermons>}></Route>
        <Route path='/Books' element={<Books></Books>}></Route>
      </Routes>   
    </BrowserRouter>
    </>
  );
}
export default App;
