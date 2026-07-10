import React, { useState, useEffect, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import { ThemeProvider } from './components/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import './index.css';

const ModelViewer = lazy(() => import('./components/ModelViewer'));
const ComputerVision = lazy(() => import('./components/ComputerVision'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate the AI sweep loading process
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <>
        <div className={`loader-overlay ${!loading ? 'hidden' : ''}`}>
          <div className="loader-sweep-line"></div>
          <div className="loader-text">INITIALIZING</div>
        </div>

        <div className="App" style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
          <Hero />
          
          <Suspense fallback={<div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>Loading Models...</div>}>
            <ModelViewer />
          </Suspense>
          
          <Suspense fallback={<div style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>Loading AI Features...</div>}>
            <ComputerVision />
          </Suspense>
          
          <footer style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            color: 'var(--text-muted)'
          }}>
            <p>&copy; 2026 Solar Dryer Research Project. Designed for advanced agricultural solutions. Built by Aryan Jaiswal.</p>
          </footer>
        </div>
        
        <ThemeSwitcher />
      </>
    </ThemeProvider>
  );
}

export default App;
