import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import AppErrorBoundary from './components/common/ErrorBoundary';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import News from './components/News/News';
import Footer from './components/Footer/Footer';
import Container from './components/common/Container';
import Updates from './pages/Updates';
import FAQ from './pages/FAQ';
import Poll from './pages/Poll';
import Roadmap from './components/Roadmap/Roadmap';

const Navigation = () => (
  <nav className="flex items-center gap-8">
    <Link to="/" className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
      Home
    </Link>
    <Link to="/updates" className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
      Updates
    </Link>
    <Link to="/faq" className="text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
      FAQ
    </Link>
  </nav>
);

const Home = () => (
  <main className="overflow-hidden">
    <Container>
      <Hero />
      <News />
      <Features />
      <Roadmap />
    </Container>
  </main>
);

function App() {
  return (
    <AppErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)] transition-colors duration-300">
                <Header>
                  <Navigation />
                </Header>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/poll" element={<Poll />} />
                </Routes>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  );
}

export default App;