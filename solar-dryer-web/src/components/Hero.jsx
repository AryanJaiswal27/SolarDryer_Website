import React, { useRef, useEffect } from 'react';
import { Sun, Code, Cpu } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Initial center position
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      currentPos.current = { x: centerX, y: centerY };
      targetPos.current = { x: centerX, y: centerY };
    }

    const animate = () => {
      // Small easing value = very smooth, slow follow
      const easing = 0.05;

      if (!isHovering.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        targetPos.current = { x: rect.width / 2, y: rect.height / 2 };
      }

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * easing;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * easing;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(calc(${currentPos.current.x}px - 50%), calc(${currentPos.current.y}px - 50%), 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    targetPos.current.x = e.clientX - rect.left;
    targetPos.current.y = e.clientY - rect.top;
  };

  const handleMouseEnter = () => { isHovering.current = true; };
  const handleMouseLeave = () => { isHovering.current = false; };

  return (
    <section 
      className="hero-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-content">
        <div className="badge animate-fade-in">
          <Sun size={16} className="badge-icon" />
          <span>Research Internship Project</span>
        </div>
        
        <h1 className="hero-title animate-fade-in delay-100">
          Advanced <span className="gradient-text">Solar Dryer</span> System
        </h1>
        
        <p className="hero-subtitle animate-fade-in delay-200">
          A comprehensive showcase of an optimized solar drying system, featuring a full 3D interactive model, a custom chilli dataset, and computer vision integration.
        </p>

        <div className="feature-cards animate-fade-in delay-300">
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Sun className="feature-icon" size={24} />
            </div>
            <h3>3D Modeling</h3>
            <p>Designed in FreeCAD, showcasing the mechanical structure.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Code className="feature-icon" size={24} />
            </div>
            <h3>Computer Vision</h3>
            <p>Python script for automated chilli identification.</p>
          </div>
          
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <Cpu className="feature-icon" size={24} />
            </div>
            <h3>Annotated Dataset</h3>
            <p>Custom dataset built specifically for training the model.</p>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="bg-glow" ref={glowRef}></div>
    </section>
  );
};

export default Hero;
