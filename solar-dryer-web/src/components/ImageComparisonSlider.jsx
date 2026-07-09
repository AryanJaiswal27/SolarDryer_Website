import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import './ImageComparisonSlider.css';

const ImageComparisonSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const onMouseMove = (e) => handleMove(e.clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="comparison-container" 
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      <img src={beforeImage} alt="Before" className="comparison-image before-image" draggable="false" />
      <div className="image-label before-label">Raw</div>
      
      <div 
        className="image-after-container" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={afterImage} alt="After" className="comparison-image after-image" draggable="false" />
        <div className="image-label after-label">Annotated</div>
      </div>
      
      <div 
        className="slider-handle" 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="slider-handle-icon">
          <ArrowLeftRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
