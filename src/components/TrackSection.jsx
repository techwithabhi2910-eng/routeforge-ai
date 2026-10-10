import React from 'react';
import { CheckCircle2, Circle, Clock, Flame, ArrowUpRight, Award, Check } from 'lucide-react';

export default function TrackSection({
  telemetry,
  milestones,
  onToggleMilestoneComplete,
  selectedRouteName
}) {
  const activeMilestone =
    milestones.find((m) => m.status === 'active') ||
    milestones.find((m) => m.status === 'pending') ||
    milestones[milestones.length - 1];

  return (
    <section
      id="section-track"
      style={{
        position: 'relative',
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)',
        background: '#080808'
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
            <span>SECTION 05 — TELEMETRY & VERIFICATION</span>
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
            PROGRESS, <span className="text-orange">MADE VISIBLE.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)'
            }}
          >
            Track your milestones, portfolio evidence verification, and skill coverage in real-time.
            Click below to mark milestones complete and observe your readiness index recalibrate immediately.
          </p>
        </div>

        {/* Tactical Next Action Banner */}
        {activeMilestone && (
          <div
            className="tech-panel tech-corner-box"
            style={{
              padding: '24px',
              background: 'rgba(255, 106, 0, 0.05)',
              border: '1.5px solid rgba(255, 106, 0, 0.4)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}
          >
            <div style={{ maxWidth: '680px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: 'var(--accent-orange)',
                  letterSpacing: '0.1em',
                  marginBottom: '8px'
                }}
              >
                <Flame size={14} />
                <span>AI-RECOMMENDED NEXT TACTICAL MOVE:</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '19px',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: '6px'
                }}
              >
                {activeMilestone.code}: {activeMilestone.title}
              </h3>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {activeMilestone.task}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                onClick={() => onToggleMilestoneComplete(activeMilestone.id)}
                className={`tech-btn ${activeMilestone.status === 'completed' ? '' : 'primary'}`}
              >
                {activeMilestone.status === 'completed' ? (
                  <>
                    <Check size={14} />
                    <span>COMPLETED</span>
                  </>
                ) : (
                  <>
                    <span>COMPLETE THIS STEP</span>
                    <ArrowUpRight size={14} />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Telemetry Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          <div className="tech-panel" style={{ padding: '24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '8px'
              }}
            >
              OVERALL READINESS SCORE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '38px',
                fontWeight: 800,
                color: 'var(--accent-orange)',
                lineHeight: 1
              }}
            >
              {telemetry.overallReadiness}%
            </div>
            {/* Progress bar line */}
            <div
              style={{
                height: '4px',
                background: 'rgba(220, 210, 195, 0.1)',
                borderRadius: '2px',
                margin: '14px 0 8px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${telemetry.overallReadiness}%`,
                  background: 'var(--accent-orange)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)' }}>
              Composite of {telemetry.skillCoveragePct}% skill coverage + {telemetry.milestoneProgressPct}% milestone completion
            </div>
          </div>

          <div className="tech-panel" style={{ padding: '24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '8px'
              }}
            >
              MILESTONES COMPLETED
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '38px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1
              }}
            >
              {telemetry.completedMilestones}{' '}
              <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontWeight: 500 }}>
                / {telemetry.totalMilestones}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                marginTop: '16px'
              }}
            >
              {telemetry.pendingMilestones} remaining in active {selectedRouteName}
            </div>
          </div>

          <div className="tech-panel" style={{ padding: '24px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '8px'
              }}
            >
              PORTFOLIO PROOFS READY
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '38px',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1
              }}
            >
              {telemetry.completedMilestones}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                marginTop: '16px'
              }}
            >
              Verifiable repositories, ADR blueprints & automated test suites
            </div>
          </div>
        </div>

        {/* Interactive Milestones Checklist */}
        <div
          className="tech-panel"
          style={{
            padding: '28px',
            background: 'rgba(13, 12, 11, 0.95)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '14px',
              marginBottom: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#fff'
                }}
              >
                MILESTONE VERIFICATION CHECKLIST
              </span>
              <span className="tech-tag orange" style={{ fontSize: '9px' }}>
                FRONTEND DEMO SYNC
              </span>
            </div>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
              CLICK ANY ITEM TO TOGGLE STATUS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {milestones.map((m) => {
              const done = m.status === 'completed';
              return (
                <div
                  key={m.id}
                  onClick={() => onToggleMilestoneComplete(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: done
                      ? 'rgba(255, 106, 0, 0.08)'
                      : 'rgba(18, 17, 16, 0.6)',
                    border: done
                      ? '1px solid rgba(255, 106, 0, 0.4)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (!done) e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    if (!done) e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '2px',
                        border: done
                          ? '1px solid var(--accent-orange)'
                          : '1px solid var(--border-medium)',
                        background: done ? 'var(--accent-orange)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000'
                      }}
                    >
                      {done && <Check size={12} strokeWidth={3} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: done ? 'var(--accent-orange)' : '#fff'
                          }}
                        >
                          {m.code}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-editorial)',
                            fontSize: '14px',
                            fontWeight: 700,
                            color: done ? '#fff' : 'var(--text-secondary)'
                          }}
                        >
                          {m.title}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-muted)',
                          marginTop: '2px'
                        }}
                      >
                        {m.phase} • Deliverable: {m.deliverable}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`tech-tag ${done ? 'active' : ''}`}
                    style={{ fontSize: '9px', padding: '2px 8px' }}
                  >
                    {done ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
