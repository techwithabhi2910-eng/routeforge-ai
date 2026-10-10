import React, { useEffect, useRef, useState } from 'react';

export default function CursorTracker() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Check for touch device or reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const renderLoop = () => {
      posRef.current.x = lerp(posRef.current.x, posRef.current.targetX, 0.28);
      posRef.current.y = lerp(posRef.current.y, posRef.current.targetY, 0.28);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${posRef.current.targetX}px, ${posRef.current.targetY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {/* Central crisp orange dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          marginLeft: '-3px',
          marginTop: '-3px',
          backgroundColor: '#ff6a00',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ff6a00',
          willChange: 'transform'
        }}
      />

      {/* Outer targeting reticle ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          marginLeft: '-14px',
          marginTop: '-14px',
          border: '1px solid rgba(255, 106, 0, 0.45)',
          borderRadius: '50%',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Subtle crosshair ticks */}
        <div style={{ position: 'absolute', width: '4px', height: '1px', background: '#ff6a00', left: '-5px' }} />
        <div style={{ position: 'absolute', width: '4px', height: '1px', background: '#ff6a00', right: '-5px' }} />
        <div style={{ position: 'absolute', width: '1px', height: '4px', background: '#ff6a00', top: '-5px' }} />
        <div style={{ position: 'absolute', width: '1px', height: '4px', background: '#ff6a00', bottom: '-5px' }} />
      </div>
    </div>
  );
}
