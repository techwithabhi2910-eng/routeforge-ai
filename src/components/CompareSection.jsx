import React from 'react';
import { Zap, DollarSign, FolderGit2, Check, ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';
import { ROUTE_CONFIGS } from '../data/careerData';

export default function CompareSection({
  selectedRouteId,
  onSelectRoute,
  routeConfigs = ROUTE_CONFIGS,
  isLiveGenerated = false,
  roadmapNote = ''
}) {
  const routes = Object.values(routeConfigs);

  return (
    <section
      id="section-compare"
      style={{
        position: 'relative',
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)',
        background: '#090807'
      }}
    >
      <div className="tech-container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'var(--text-secondary)',
              marginBottom: '16px'
            }}
          >
            <span style={{ color: 'var(--accent-orange)' }}>//</span>
            <span>SECTION 03 — ROUTE ARBITRAGE</span>
            {isLiveGenerated && (
              <span
                className="tech-tag active"
                style={{ fontSize: '8.5px', padding: '1px 6px', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.4)' }}
              >
                LIVE GEMINI SYNTHESIS
              </span>
            )}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(32px, 4.2vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#fff',
              marginBottom: '18px'
            }}
          >
            THREE ROUTES. <span className="text-orange">ONE DESTINATION.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)'
            }}
          >
            Choose the path that fits your priorities, resources, and preferred way to learn.
            Each route structures identical core competencies into distinct execution sequences.
          </p>

          {roadmapNote && (
            <div
              style={{
                marginTop: '14px',
                padding: '8px 12px',
                background: 'rgba(255, 106, 0, 0.08)',
                borderLeft: '2px solid var(--accent-orange)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-primary)',
                lineHeight: 1.4
              }}
            >
              <strong style={{ color: 'var(--accent-orange)' }}>// AI NOTE:</strong> {roadmapNote}
            </div>
          )}
        </div>

        {/* 3 Routes Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {routes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            return (
              <div
                key={route.id}
                className={`tech-panel tech-corner-box ${isSelected ? 'active' : ''}`}
                style={{
                  padding: '30px',
                  background: isSelected
                    ? 'rgba(18, 16, 14, 0.98)'
                    : 'rgba(13, 12, 11, 0.85)',
                  border: isSelected
                    ? '1.5px solid var(--accent-orange)'
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all var(--transition-normal)'
                }}
              >
                {/* Top Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '18px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      color: isSelected ? 'var(--accent-orange)' : 'var(--text-muted)'
                    }}
                  >
                    {route.badge}
                  </span>

                  {isSelected && (
                    <span
                      className="tech-tag active"
                      style={{ fontSize: '9px', padding: '2px 8px' }}
                    >
                      SELECTED FORGE
                    </span>
                  )}
                </div>

                {/* Route Title & Subtitle */}
                <h3
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '8px'
                  }}
                >
                  {route.name}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.5,
                    color: 'var(--text-secondary)',
                    marginBottom: '24px',
                    minHeight: '40px'
                  }}
                >
                  {route.subtitle}
                </p>

                {/* Technical Metric Specs */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '16px',
                    background: 'rgba(8, 8, 8, 0.7)',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: '24px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>ESTIMATED DURATION</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>{route.estimatedDuration}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>WEEKLY COMMITMENT</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{route.weeklyCommitment}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>RESOURCE COST</span>
                    <span style={{ color: route.id === 'budget-friendly' ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>
                      {route.costRating}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>MILESTONE NODES</span>
                    <span style={{ color: '#fff' }}>{route.milestonesCount} Integrated</span>
                  </div>
                </div>

                {/* Strategic Emphasis */}
                <div style={{ marginBottom: '24px', flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}
                  >
                    STRATEGIC EMPHASIS:
                  </div>
                  <div
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4
                    }}
                  >
                    {route.focus}
                  </div>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={() => onSelectRoute(route.id)}
                  className={`tech-btn ${isSelected ? 'primary' : ''}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>{isSelected ? 'ACTIVE ROUTE IN GRAPH' : 'SELECT THIS ROUTE'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
