import React, { useEffect, useState, useRef } from 'react';
import './StarField.css';

const STAR_TYPES = ['hubble-cross', 'jwst-hex', 'simple-cross', 'medium', 'point'] as const;
type StarType = typeof STAR_TYPES[number];

interface Star {
  id: string;
  left: number;
  top: number;
  size: number;
  animationDelay: number;
  animationDuration: number;
  opacity: number;
  animation: string;
  type: StarType;
  fadingOut?: boolean;
}

const STAR_ANIMATIONS = ['stellar-twinkle', 'bright-pulse', 'distant-flicker', 'jwst-shimmer'];
const STAR_COUNTS: Record<StarType, number> = {
  'hubble-cross': 10,
  'jwst-hex': 5,
  'simple-cross': 15,
  'medium': 23,
  'point': 60,
};
const TOTAL_STARS = Object.values(STAR_COUNTS).reduce((a, b) => a + b, 0);

function randomStar(type: StarType, i: number): Star {
  const animation = STAR_ANIMATIONS[Math.floor(Math.random() * STAR_ANIMATIONS.length)];
  return {
    id: `${type}-${Date.now()}-${i}-${Math.random()}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    animationDelay: Math.random() * 8,
    animationDuration: Math.random() * 4 + 3,
    opacity: Math.random() * 0.4 + 0.4,
    animation,
    type,
  };
}

const initialStars = () => {
  let stars: Star[] = [];
  STAR_TYPES.forEach((type) => {
    for (let i = 0; i < STAR_COUNTS[type]; i++) {
      stars.push(randomStar(type, i));
    }
  });
  return stars;
};

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>(initialStars);
  const starIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Mark the oldest star as fading out
      setStars((prev) => {
        if (prev.length === 0) return prev;
        const fadingStar = { ...prev[0], fadingOut: true };
        return [fadingStar, ...prev.slice(1)];
      });
      // After fade duration, remove the oldest and add a new one
      setTimeout(() => {
        setStars((prev) => {
          const type = STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)];
          const newStar = randomStar(type, starIndex.current++);
          // Remove the first (fading) star, add new one
          return [...prev.slice(1), newStar];
        });
      }, 1200); // fade duration 1.2s
    }, 3000); // 3000ms speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star${star.fadingOut ? ' star-fade-out' : ' star-fade-in'}`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            '--size': star.size,
            '--delay': `${star.animationDelay}s`,
            '--duration': `${star.animationDuration}s`,
            '--opacity': star.opacity,
            '--animation': star.animation,
          } as React.CSSProperties}
        >
          <div className={`star-${star.type}`} />
        </div>
      ))}
    </div>
  );
};

export default StarField;