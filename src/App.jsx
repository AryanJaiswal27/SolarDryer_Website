import React from 'react';
import Hero from './components/Hero';
import ModelViewer from './components/ModelViewer';
import ComputerVision from './components/ComputerVision';
import './index.css';

function App() {
  return (
    <div className="App">
      <Hero />
      <ModelViewer />
      <ComputerVision />
      
      <footer style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'var(--text-muted)'
      }}>
        <p>&copy; 2026 Solar Dryer Research Project. Designed for advanced agricultural solutions. Built by Aryan Jaiswal.</p>
      </footer>
    </div>
  );
}

export default App;
