import React, { useRef } from 'react';
import { Sun } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './Hero.css';

function SketchModel() {
  const { scene } = useGLTF('/models/Adv_Solar_Dryer-SolarDryer.gltf');
  const groupRef = useRef();

  const material = React.useMemo(() => new THREE.MeshBasicMaterial({
    color: "#222222", 
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide
  }), []);

  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
    return clone;
  }, [scene, material]);

  const speeds = React.useMemo(() => ({
    x: (Math.random() - 0.5) * 0.45,
    y: (Math.random() - 0.5) * 0.45,
    z: (Math.random() - 0.5) * 0.45,
  }), []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += speeds.x * delta;
      groupRef.current.rotation.y += speeds.y * delta;
      groupRef.current.rotation.z += speeds.z * delta;

      groupRef.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.4) * 0.005;
      groupRef.current.rotation.y += Math.cos(state.clock.elapsedTime * 0.3) * 0.005;
    }
  });

  return (
    <group ref={groupRef} scale={6.5} position={[5, 0.5, -3]}>
      <primitive object={clonedScene} />
    </group>
  );
}

const Hero = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      {/* Heavily cap dpr on mobile to stop lag */}
      <div className="hero-canvas-container animate-fade-in delay-300">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={isMobile ? [0.5, 1] : [1, 1.5]}>
          <ambientLight intensity={0.5} />
          <SketchModel />
        </Canvas>
      </div>

      <div className="hero-grid">
        
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            <span className="block-text">ADVANCED</span>
            <span className="block-text accent-text">SOLAR DRYER</span>
            <span className="block-text">SYSTEM</span>
          </h1>
          
          <div className="hero-desc-container delay-200">
            <p className="hero-subtitle">
              A comprehensive showcase of an optimized solar drying system, featuring a full 3D interactive model, a custom chilli dataset, and computer vision integration.
            </p>
            <button className="primary-btn" onClick={handleScroll}>
              Explore Project &rarr;
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
