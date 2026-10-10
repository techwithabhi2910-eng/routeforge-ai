
// Simplified RightSidebarIndex – minimal vertical dot navigation with hover panel
import React, { useCallback } from 'react';

const SECTIONS = [
  { id: 'discover', label: 'DISCOVERY' },
  { id: 'analyze', label: 'GAP ANALYST' },
  { id: 'compare', label: 'ROUTE MATRIX' },
  { id: 'build', label: 'FORGE GRAPH' },
  { id: 'track', label: 'VERIFICATION' },
];

export default function RightSidebarIndex({ activeSection }) {
  const handleClick = useCallback((sectionId) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <aside
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '8px',
        zIndex: 80,
        pointerEvents: 'auto',
      }}
      className="right-sidebar-index"
    >
      {/* Hover panel wrapper */}
      <div className="nav-wrapper" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {/* Dots column */}
        <div className="dots-column" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleClick(sec.id)}
              aria-label={sec.label}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: 'none',
                background: activeSection === sec.id ? 'var(--accent-orange)' : 'rgba(150,150,150,0.4)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        {/* Hover panel – hidden by default, shown on hover/focus */}
        <div className="nav-panel" style={{
          position: 'absolute',
          right: '100%',
          marginRight: '8px',
          background: 'rgba(0,0,0,0.85)',
          borderRadius: '6px',
          padding: '8px 12px',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          lineHeight: '1.6',
          display: 'none',
        }}>
          {SECTIONS.map((sec) => (
            <div key={sec.id} style={{ color: activeSection === sec.id ? 'var(--accent-orange)' : undefined, marginBottom: '4px' }}>
              {sec.label}
            </div>
          ))}
        </div>
      </div>
      {/* Responsive hide on small screens */}
      <style>{`@media (max-width: 1240px) { .right-sidebar-index { display: none !important; } }`}</style>
    </aside>
  );
}

/* CSS to toggle panel visibility on hover/focus */
<style>{`
  .nav-wrapper:hover .nav-panel,
  .nav-wrapper:focus-within .nav-panel {
    display: block;
  }
`}</style>
