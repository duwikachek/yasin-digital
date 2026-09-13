import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReadingMenu from './pages/ReadingMenu';
import InteractiveFeatures from './pages/InteractiveFeatures';
import SurahYasin from './pages/SurahYasin';
import Tahlil from './pages/Tahlil';
import Galeri from './pages/Galeri';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bacaan" element={<ReadingMenu />} />
          <Route path="/yasin" element={<SurahYasin />} />
          <Route path="/tahlil" element={<Tahlil />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/interaktif" element={<InteractiveFeatures />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;
