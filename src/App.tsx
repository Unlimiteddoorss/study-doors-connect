
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { Toaster } from '@/components/ui/toaster';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Universities from './pages/Universities';
import University from './pages/University';
import Programs from './pages/Programs';
import Program from './pages/Program';
import MedicalPrograms from './pages/MedicalPrograms';
import EngineeringPrograms from './pages/EngineeringPrograms';
import Countries from './pages/Countries';
import Apply from './pages/Apply';
import IstanbulKulturUniversity from './pages/universities/IstanbulKulturUniversity';
import BahcesehirUniversity from './pages/universities/BahcesehirUniversity';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<University />} />
          <Route path="/universities/istanbul-kultur-university" element={<IstanbulKulturUniversity />} />
          <Route path="/universities/bahcesehir-university" element={<BahcesehirUniversity />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<Program />} />
          <Route path="/programs/medical" element={<MedicalPrograms />} />
          <Route path="/programs/engineering" element={<EngineeringPrograms />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:country" element={<Countries />} />
          <Route path="/apply" element={<Apply />} />
        </Routes>
        <Toaster />
      </Router>
    </I18nextProvider>
  );
}

export default App;
