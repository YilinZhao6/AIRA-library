import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/ArchivePage';
import RequestPage from './pages/RequestPage';
import ContactPage from './pages/ContactPage';
import PaperView from './pages/PaperView';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/paper/:id" element={<PaperView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;