import React from 'react';

const CHAPTERS = [
  { id: 'section-discover', code: '01', title: 'DISCOVER' },
  { id: 'section-analyze', code: '02', title: 'ANALYZE' },
  { id: 'section-compare', code: '03', title: 'COMPARE' },
  { id: 'section-build', code: '04', title: 'BUILD' },
  { id: 'section-track', code: '05', title: 'TRACK' }
];

export default function ChapterRail({ activeSection }) {
  const activeChapter = CHAPTERS.find((ch) => ch.id === `section-${activeSection}`) || CHAPTERS[0];

  return (
    <nav
      aria-label="Chapter Rail"
      style={{
        width: '100%',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 clamp(16px, 3vw, 32px)',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 40
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          border: '1px solid var(--border-subtle)',
          background: 'rgba(13, 12, 11, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: 'var(--radius-xs)',
          overflow: 'hidden'
        }}
      >
        {/* Active Stage Indicator Badge */}
        <div
          style={{
            padding: '10px 16px',
            background: 'rgba(255, 106, 0, 0.08)',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: 'var(--accent-orange)',
            whiteSpace: 'nowrap'
          }}
          className="chapter-badge"
        >
          <span style={{ fontWeight: 700 }}>{activeChapter.code} / 05</span>
          <span style={{ color: 'var(--text-secondary)' }}>{activeChapter.title}</span>
        </div>

        {/* Stages list */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}
        >
          {CHAPTERS.map((chap, idx) => {
            const isActive = `section-${activeSection}` === chap.id;
            return (
              <a
                key={chap.id}
                href={`#${chap.id}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '10px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive ? 'var(--accent-orange)' : 'var(--text-muted)',
                  borderRight: idx < CHAPTERS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  background: isActive ? 'rgba(255, 106, 0, 0.05)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--accent-orange)' : '2px solid transparent',
                  transition: 'all var(--transition-fast)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <span style={{ opacity: 0.6 }}>{chap.code}</span>
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{chap.title}</span>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .chapter-badge {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
