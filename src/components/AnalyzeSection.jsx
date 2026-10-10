import React from 'react';
import { Check, Plus, AlertCircle, Clock, Zap, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function AnalyzeSection({
  selectedRole,
  skillCategories,
  onToggleSkill,
  telemetry
}) {
  return (
    <section
      id="section-analyze"
      style={{
        position: 'relative',
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-base)'
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
            <span>SECTION 02 — DISTANCE EVALUATION</span>
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
            UNDERSTAND THE <span className="text-orange">DISTANCE.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)'
            }}
          >
            Map the skills, experience, and practical evidence that connect your current position
            to your target role. Click any competency below to toggle your proficiency and recalculate your roadmap.
          </p>
        </div>

        {/* Telemetry Summary Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1px',
            background: 'var(--border-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '40px',
            overflow: 'hidden'
          }}
        >
          <div style={{ background: 'var(--bg-surface)', padding: '18px 22px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '6px'
              }}
            >
              TARGET POSITION
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff'
              }}
            >
              {selectedRole.title}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-orange)', marginTop: '4px' }}>
              BENCHMARK: {selectedRole.salaryBenchmark}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '18px 22px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '6px'
              }}
            >
              SKILL COVERAGE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: 800,
                color: 'var(--accent-orange)'
              }}
            >
              {telemetry.skillCoveragePct}%
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {telemetry.knownSkills} / {telemetry.totalSkills} Competencies Mastered
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '18px 22px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '6px'
              }}
            >
              REMAINING EFFORT DEFICIT
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '24px',
                fontWeight: 800,
                color: '#fff'
              }}
            >
              {telemetry.remainingHours} hrs
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Estimated hands-on deliberate practice
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '18px 22px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '6px'
              }}
            >
              PREREQUISITE STATUS
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                fontWeight: 700,
                color: telemetry.knownSkills >= 6 ? 'var(--accent-orange)' : '#fff'
              }}
            >
              {telemetry.knownSkills >= 6 ? 'PHASE 2 READY' : 'FOUNDATIONS ACTIVE'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Milestone synthesis active
            </div>
          </div>
        </div>

        {/* Skill Matrix Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '24px'
          }}
        >
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.id}
              className="tech-panel tech-corner-box"
              style={{
                padding: '24px',
                background: 'rgba(13, 12, 11, 0.95)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '12px',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      color: 'var(--accent-orange)',
                      letterSpacing: '0.1em',
                      marginRight: '6px'
                    }}
                  >
                    CAT. 0{catIdx + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#fff',
                      display: 'inline'
                    }}
                  >
                    {category.name}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '18px',
                  lineHeight: 1.4
                }}
              >
                {category.description}
              </p>

              {/* Skills Interactive List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                {category.skills.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => onToggleSkill(category.id, skill.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: skill.known
                        ? 'rgba(255, 106, 0, 0.08)'
                        : 'rgba(18, 17, 16, 0.6)',
                      border: skill.known
                        ? '1px solid rgba(255, 106, 0, 0.4)'
                        : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      if (!skill.known) {
                        e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.3)';
                        e.currentTarget.style.background = 'rgba(25, 23, 21, 0.8)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!skill.known) {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.background = 'rgba(18, 17, 16, 0.6)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '2px',
                          border: skill.known
                            ? '1px solid var(--accent-orange)'
                            : '1px solid var(--border-medium)',
                          background: skill.known ? 'var(--accent-orange)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        {skill.known ? <Check size={11} strokeWidth={3} /> : null}
                      </div>

                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: skill.known ? '#fff' : 'var(--text-secondary)'
                        }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9.5px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        {skill.estHours}h
                      </span>

                      <span
                        className={`tech-tag ${skill.known ? 'orange' : ''}`}
                        style={{ fontSize: '9px', padding: '2px 6px' }}
                      >
                        {skill.known ? 'KNOWN' : 'GAP'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Recalculation Hint */}
        <div
          style={{
            marginTop: '36px',
            padding: '16px 20px',
            border: '1px dashed var(--border-medium)',
            background: 'rgba(13, 12, 11, 0.6)',
            borderRadius: 'var(--radius-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={16} style={{ color: 'var(--accent-orange)' }} />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                color: 'var(--text-secondary)'
              }}
            >
              Skill state directly recalibrates your 3 Alternative Routes and active Milestone DAG.
            </span>
          </div>

          <a
            href="#section-compare"
            className="tech-btn"
            style={{ padding: '8px 14px', fontSize: '11px' }}
          >
            <span>COMPARE ROUTES</span>
            <ArrowRight size={13} style={{ color: 'var(--accent-orange)' }} />
          </a>
        </div>
      </div>
    </section>
  );
}
