import React, { useEffect, useRef, useState } from 'react';
import '../components/Starfield.css';

interface ParallaxStar {
  id: string;
  left: number;
  top: number;
  size: number;
  animationDelay: number;
  animationDuration: number;
  opacity: number;
  animation: string;
  type: string;
  parallaxX: number;
  parallaxY: number;
}

const MAX_OFFSET = 8; // px, clamp max movement for each star

const StarField: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lerpedScroll, setLerpedScroll] = useState(0);
  const requestRef = useRef<number | null>(null);

  const animations = ['stellar-twinkle', 'bright-pulse', 'distant-flicker', 'jwst-shimmer'];

  // Generate stars with unique parallax factors
  const generateStars = (count: number, type: 'hubble-cross' | 'jwst-hex' | 'simple-cross' | 'point' | 'medium') => {
    const stars: ParallaxStar[] = [];
    for (let i = 0; i < count; i++) {
      const animation = animations[Math.floor(Math.random() * animations.length)];
      stars.push({
        id: `${type}-${i}`,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        animationDelay: Math.random() * 8,
        animationDuration: Math.random() * 4 + 3,
        opacity: Math.random() * 0.4 + 0.4,
        animation,
        type,
        parallaxX: (Math.random() - 0.5) * 0.05, // -0.025 to 0.025
        parallaxY: (Math.random() - 0.5) * 0.07, // -0.035 to 0.035
      });
    }
    return stars;
  };

  // Generate different types of astronomical stars
  const hubbleStars = generateStars(8, 'hubble-cross');
  const jwstStars = generateStars(4, 'jwst-hex');
  const simpleCrossStars = generateStars(12, 'simple-cross');
  const mediumStars = generateStars(20, 'medium');
  const pointStars = generateStars(60, 'point');
  const allStars = [...hubbleStars, ...jwstStars, ...simpleCrossStars, ...mediumStars, ...pointStars];

  // Smoothly interpolate scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    let running = true;
    const animate = () => {
      setLerpedScroll((prev) => lerp(prev, scrollY, 0.015)); // even smoother
      if (running) requestRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { running = false; if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [scrollY]);

  // Clamp offset to prevent large jumps
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  return (
    <div className="starfield">
      {allStars.map((star) => {
        const offsetX = clamp(lerpedScroll * star.parallaxX, -MAX_OFFSET, MAX_OFFSET);
        const offsetY = clamp(lerpedScroll * star.parallaxY, -MAX_OFFSET, MAX_OFFSET);
        return (
          <div
            key={star.id}
            className="star"
            style={{
              left: `calc(${star.left}% + ${offsetX}px)` ,
              top: `calc(${star.top}% + ${offsetY}px)` ,
              '--size': star.size,
              '--delay': `${star.animationDelay}s`,
              '--duration': `${star.animationDuration}s`,
              '--opacity': star.opacity,
              '--animation': star.animation,
              willChange: 'left, top',
            } as React.CSSProperties}
          >
            <div className={`star-${star.type}`} />
          </div>
        );
      })}
    </div>
  );
};

export default StarField;