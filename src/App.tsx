import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext'; // Import useLanguage
import AppErrorBoundary from './components/ui/ErrorBoundary';
import Header from './components/Header/Header';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import News from "./components/sections/News";
import Footer from './components/layout/Footer';
import Container from './components/ui/Container';
import Updates from './pages/Updates';
import FAQ from './pages/FAQ';
import Roadmap from './components/sections/Roadmap';
import Docs from './pages/Docs'; // Import the new Docs page
import { PageTransitionWrapper } from './components/Effects/AnimationEffects'; // Import PageTransitionWrapper

import ScrollAnimation from './components/ui/ScrollAnimation'; // Import ScrollAnimation

const Home = () => (
  <main className="overflow-hidden">
    <Container>
      <Hero />
      <News />
      <Features />
      <Roadmap />

      {/* New section to demonstrate complex animations */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-10">Experience Our Advanced Animations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollAnimation animation="glitch" delay={0.1} duration={1.2} intensity={2}>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Glitch Effect</h3>
              <p>A subtle digital distortion on appearance.</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="inertia" delay={0.2} duration={1.5} direction="up">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Inertia Effect</h3>
              <p>Spring-like bounce into final position.</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="distortion" delay={0.3} duration={1.2} intensity={1.8}>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Distortion Effect</h3>
              <p>Slight skew and perspective shift.</p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="flying" delay={0.4} duration={1.8} direction="right">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Flying Effect</h3>
              <p>Appears as if floating from a distance.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Container>
  </main>
);

// Create a wrapper component to use useLocation hook inside Router
const AppContent = () => {
  const location = useLocation();
  const { language } = useLanguage(); // Get current language from context

  return (
    <div className="min-h-screen bg-[var(--primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Header />
      <PageTransitionWrapper key={`${location.pathname}-${language}`} duration={1.0} glitchIntensity={1.5}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </PageTransitionWrapper>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppErrorBoundary>
      <LanguageProvider>
        <ThemeProvider>
            <Router>
              <AppContent />
            </Router>
        </ThemeProvider>
      </LanguageProvider>
    </AppErrorBoundary>
  );
}

export default App;
