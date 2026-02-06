/**
 * useDashboardSimulation Hook
 * 
 * A custom React hook that manages the scroll-triggered code execution simulation.
 * 
 * FEATURES:
 * - IntersectionObserver for viewport entry detection (30% threshold)
 * - Line-by-line code progression with configurable timing
 * - Milestone callbacks for synchronized card reveals
 * - Replay on scroll away/return and tab visibility change
 * - prefers-reduced-motion support
 * 
 * USAGE:
 * ```tsx
 * const {
 *   state,           // 'idle' | 'running' | 'complete'
 *   currentLineIndex,// Current line being typed (-1 if not started)
 *   visibleCards,    // Set of card indices that should be visible
 *   startSimulation, // Manual start function
 *   resetSimulation, // Reset to initial state
 *   containerRef,    // Ref to attach to your container element
 *   isInView         // Boolean if container is in viewport
 * } = useDashboardSimulation();
 * ```
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export type SimulationState = 'idle' | 'running' | 'complete';

export interface CodeLine {
  id: number;
  content: string;
  type: 'comment' | 'import' | 'code' | 'export' | 'empty';
  milestone?: number; // Which card to trigger when this line completes
}

export interface UseDashboardSimulationOptions {
  /** Base delay between lines in ms (default: 250) */
  baseDelay?: number;
  /** Random variance added to delay for realism (default: 100) */
  variance?: number;
  /** Viewport visibility threshold 0-1 (default: 0.3) */
  scrollThreshold?: number;
  /** Code lines to simulate */
  codeLines: CodeLine[];
}

export interface UseDashboardSimulationReturn {
  state: SimulationState;
  currentLineIndex: number;
  visibleCards: Set<number>;
  startSimulation: () => void;
  resetSimulation: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
}

const DEFAULT_CONFIG = {
  baseDelay: 250,
  variance: 100,
  scrollThreshold: 0.3,
};

export function useDashboardSimulation(
  options: UseDashboardSimulationOptions
): UseDashboardSimulationReturn {
  const config = { ...DEFAULT_CONFIG, ...options };
  
  const [state, setState] = useState<SimulationState>('idle');
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [isInView, setIsInView] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Reset simulation to initial state
  const resetSimulation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setState('idle');
    setCurrentLineIndex(-1);
    setVisibleCards(new Set());
    hasRunRef.current = false;
  }, []);

  // Start the simulation
  const startSimulation = useCallback(() => {
    if (state === 'running') return;
    
    resetSimulation();
    setState('running');
    hasRunRef.current = true;

    const runLine = (index: number) => {
      if (index >= config.codeLines.length) {
        setState('complete');
        return;
      }

      setCurrentLineIndex(index);

      // Check if this line triggers a card milestone
      const line = config.codeLines[index];
      if (line.milestone !== undefined) {
        setVisibleCards(prev => new Set([...prev, line.milestone!]));
      }

      // Schedule next line with random variance for realism
      const delay = prefersReducedMotion 
        ? 50 
        : config.baseDelay + Math.random() * config.variance;

      timerRef.current = setTimeout(() => {
        runLine(index + 1);
      }, delay);
    };

    // Start after a brief delay
    timerRef.current = setTimeout(() => {
      runLine(0);
    }, 300);
  }, [state, resetSimulation, config.codeLines, config.baseDelay, config.variance, prefersReducedMotion]);

  // IntersectionObserver for scroll trigger
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const nowInView = entry.isIntersecting && entry.intersectionRatio >= config.scrollThreshold;
        
        setIsInView(nowInView);

        if (nowInView) {
          // Start if not yet run, or re-run if previously completed
          if (!hasRunRef.current || state === 'complete') {
            startSimulation();
          }
        } else {
          // User scrolled away - allow re-run when they come back
          if (state === 'running') {
            hasRunRef.current = false;
          }
        }
      },
      {
        threshold: [0, config.scrollThreshold, 1],
        rootMargin: '0px'
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [startSimulation, state, config.scrollThreshold]);

  // Handle tab visibility change (re-run when user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isInView) {
        // User returned to tab and dashboard is in view
        if (state === 'complete' || !hasRunRef.current) {
          startSimulation();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isInView, startSimulation, state]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    state,
    currentLineIndex,
    visibleCards,
    startSimulation,
    resetSimulation,
    containerRef,
    isInView
  };
}

export default useDashboardSimulation;