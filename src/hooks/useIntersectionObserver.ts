import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  triggerOnce?: boolean;
}

/**
 * Custom React hook that uses IntersectionObserver API to detect when an element
 * enters the viewport. Ideal for triggering scroll-reveal animations, lazy-loading,
 * and analytics.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.12,
    root = null,
    rootMargin = '0px 0px -40px 0px',
    freezeOnceVisible = true,
    triggerOnce = true,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Fallback if IntersectionObserver is unsupported in older runtimes
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const isElementVisible = entry.isIntersecting;
      if (isElementVisible) {
        setIsVisible(true);
        if (triggerOnce || freezeOnceVisible) {
          observer.unobserve(node);
        }
      } else if (!triggerOnce && !freezeOnceVisible) {
        setIsVisible(false);
      }
    }, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, triggerOnce]);

  return [elementRef, isVisible];
}

export default useIntersectionObserver;
