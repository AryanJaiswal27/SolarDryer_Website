import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, Html } from '@react-three/drei';
import './ModelViewer.css';

// Component to load and display the GLTF model
function Model({ url }) {
  const { scene } = useGLTF(url);
  // dispose={null} prevents R3F from destroying the cached scene when switching models
  return <primitive object={scene} dispose={null} />;
}

// Preload models for instant switching
useGLTF.preload('/models/SeparateDryers-Assembly.gltf');
useGLTF.preload('/models/Stacked_SolarDryer-Assembly.gltf');
useGLTF.preload('/models/Adv_Solar_Dryer-SolarDryer.gltf');

const ModelViewer = () => {
  const [activeModel, setActiveModel] = useState('/models/SeparateDryers-Assembly.gltf');

  const models = [
    { name: 'Dryer with Camera Module', path: '/models/SeparateDryers-Assembly.gltf' },
    { name: 'Stacked Assembly', path: '/models/Stacked_SolarDryer-Assembly.gltf' },
    { name: 'Adv Solar Dryer', path: '/models/Adv_Solar_Dryer-SolarDryer.gltf' }
  ];

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="model-section" id="3d-model">
      <div className="model-header">
        <h2>Interactive <span className="gradient-text">3D Model</span></h2>
        <p>Explore the mechanical design of the solar dryer. Drag to rotate, scroll to zoom.</p>
        
        <div className="model-controls">
          {models.map((model) => (
            <button 
              key={model.name}
              className={`model-btn ${activeModel === model.path ? 'active' : ''}`}
              onClick={() => setActiveModel(model.path)}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      <div className="canvas-container glass-panel">
        <Canvas dpr={isMobile ? [0.5, 1] : [1, 1.5]} camera={{ position: [100, 100, 150], fov: 50 }} performance={{ min: 0.5 }}>
          <Suspense fallback={
            <Html center>
              <div className="loading" style={{ position: 'static', transform: 'none' }}>Loading...</div>
            </Html>
          }>
            <Stage environment="city" intensity={0.6} shadows={false} adjustCamera={1.4}>
              <Model url={activeModel} />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={1} makeDefault />
        </Canvas>
        {/* Loading overlay could be handled via useProgress from drei if needed, but simple Suspense inside canvas works */}
      </div>
    </section>
  );
};

export default ModelViewer;
