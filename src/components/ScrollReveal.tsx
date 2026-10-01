import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'fade';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce,
  });

  const getInitialStyle = (): React.CSSProperties => {
    switch (animation) {
      case 'fade-up':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        };
      case 'fade-down':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-28px)',
        };
      case 'fade-left':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(32px)',
        };
      case 'fade-right':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-32px)',
        };
      case 'zoom-in':
        return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.94)',
        };
      case 'fade':
      default:
        return {
          opacity: isVisible ? 1 : 0,
        };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getInitialStyle(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
