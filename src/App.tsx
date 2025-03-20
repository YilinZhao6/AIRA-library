import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import MainPage from './pages/MainPage';
import ArchivePage from './pages/ArchivePage';
import RequestPage from './pages/RequestPage';
import ContactPage from './pages/ContactPage';
import PaperView from './pages/PaperView';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/paper/:id" element={<PaperView />} />
          </Routes>
          <ThemeToggle />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;