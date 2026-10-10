import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Terminal, ShieldCheck, CheckCircle2, Zap, GitCommit, ChevronRight } from 'lucide-react';
import { INITIAL_ROLES } from '../data/careerData';

export default function HeroSection({
  selectedRole,
  onSelectRole,
  experienceLevel,
  onChangeExperienceLevel,
  onGenerateRoadmap,
  readinessScore
}) {
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [activeStagePill, setActiveStagePill] = useState(0);
  const [coords, setCoords] = useState({ x: 42.88, y: 77.12 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    onSelectRole({
      id: 'custom-' + Date.now(),
      title: customRoleInput.trim(),
      category: 'Custom Target Role',
      description: `Tailored reverse-engineering path synthesized for ${customRoleInput.trim()}.`,
      baseReadiness: 35,
      estTotalHours: 460,
      salaryBenchmark: '$195k — $275k / yr',
      demandIndex: 'High'
    });
    setCustomRoleInput('');
  };

  return (
    <section
      id="section-discover"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-height) - var(--announcement-height))',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '50px 0 30px',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Tech Grid */}
      <div
        className="technical-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.85,
          pointerEvents: 'none'
        }}
      />

      <div className="tech-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: '48px',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Typography & Form */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {/* Monospace Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: 'var(--text-secondary)',
                marginBottom: '20px'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--accent-orange)',
                  boxShadow: '0 0 8px var(--accent-orange)'
                }}
              />
              <span>CAREER INTELLIGENCE / 001</span>
            </div>

            {/* Large 3-Line Editorial Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(44px, 5.8vw, 76px)',
                fontWeight: 900,
                lineHeight: 0.96,
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                marginBottom: '24px'
              }}
            >
              <div style={{ color: 'var(--text-primary)' }}>YOUR DREAM.</div>
              <div style={{ color: 'var(--text-primary)' }}>REVERSE-</div>
              <div style={{ color: 'var(--accent-orange)' }}>ENGINEERED.</div>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                marginBottom: '32px'
              }}
            >
              Start with the role you want. Discover the skills, projects, and milestones that can
              take you there. Built for engineers seeking rigorous career trajectory clarity.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '36px'
              }}
            >
              <button
                type="button"
                onClick={onGenerateRoadmap}
                className="tech-btn primary"
                style={{ padding: '12px 24px', fontSize: '12px' }}
              >
                <span>BUILD MY ROADMAP</span>
                <ArrowUpRight size={15} />
              </button>

              <a
                href="#section-build"
                className="tech-btn"
                style={{ padding: '12px 20px', fontSize: '12px' }}
              >
                <span>EXPLORE A SAMPLE PATH</span>
              </a>
            </div>

            {/* Dream Job Interactive Console / Form */}
            <div
              className="tech-panel tech-corner-box"
              style={{
                padding: '20px',
                background: 'rgba(13, 12, 11, 0.95)',
                maxWidth: '520px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={13} style={{ color: 'var(--accent-orange)' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--text-primary)'
                    }}
                  >
                    TARGET ROLE CONSOLE
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--accent-orange)'
                  }}
                >
                  SYSTEM READY
                </span>
              </div>

              {/* Target Role Selector */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  SELECT TARGET ROLE:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {INITIAL_ROLES.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => onSelectRole(role)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-xs)',
                        border:
                          selectedRole.id === role.id
                            ? '1px solid var(--accent-orange)'
                            : '1px solid var(--border-subtle)',
                        background:
                          selectedRole.id === role.id
                            ? 'rgba(255, 106, 0, 0.15)'
                            : 'rgba(25, 24, 22, 0.6)',
                        color:
                          selectedRole.id === role.id ? '#fff' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {role.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input
                  type="text"
                  placeholder="Or type custom role: e.g. Autonomous AI Lead"
                  value={customRoleInput}
                  onChange={(e) => setCustomRoleInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(8, 8, 8, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-orange)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
                />
                <button
                  type="submit"
                  className="tech-btn"
                  style={{ padding: '8px 12px', fontSize: '10.5px' }}
                >
                  SET
                </button>
              </form>

              {/* Experience Level & Generate Trigger */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    EXPERIENCE:
                  </span>
                  {['Junior / Switcher', 'Mid-Level', 'Senior'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => onChangeExperienceLevel(lvl)}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        padding: '3px 7px',
                        borderRadius: 'var(--radius-xs)',
                        border:
                          experienceLevel === lvl
                            ? '1px solid var(--accent-orange)'
                            : '1px solid var(--border-subtle)',
                        background:
                          experienceLevel === lvl
                            ? 'rgba(255, 106, 0, 0.2)'
                            : 'transparent',
                        color: experienceLevel === lvl ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onGenerateRoadmap}
                  className="tech-btn primary sm"
                  style={{ gap: '4px' }}
                >
                  <span>FORGE ROADMAP</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Intelligence HUD Visualization */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px'
            }}
            className="hero-visual-stage"
          >
            {/* Outer Subtle Orbit Ring */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                width: '460px',
                height: '460px',
                borderRadius: '50%',
                border: '1px dashed rgba(220, 210, 195, 0.1)',
                pointerEvents: 'none'
              }}
            />

            {/* Inner Technical Orbit with Ticks */}
            <div
              className="animate-spin-reverse"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                border: '1px solid rgba(255, 106, 0, 0.2)',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-4px',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  background: 'var(--accent-orange)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--accent-orange)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  width: '8px',
                  height: '8px',
                  background: 'var(--accent-orange)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--accent-orange)'
                }}
              />
            </div>

            {/* Central Career Forge Apparatus */}
            <div
              style={{
                width: '320px',
                background: 'rgba(13, 12, 11, 0.94)',
                border: '1px solid rgba(255, 106, 0, 0.45)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 106, 0, 0.15)',
                padding: '24px',
                position: 'relative',
                zIndex: 20
              }}
              className="tech-corner-box"
            >
              {/* Header Telemetry */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '10px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                      boxShadow: '0 0 6px var(--accent-orange)'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: '#fff'
                    }}
                  >
                    TARGET FORGE // 01
                  </span>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--accent-orange)'
                  }}
                >
                  ACTIVE TELEMETRY
                </span>
              </div>

              {/* Target Role Core Badge */}
              <div
                style={{
                  padding: '14px',
                  background: 'rgba(255, 106, 0, 0.08)',
                  border: '1px solid rgba(255, 106, 0, 0.3)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '18px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: 'var(--accent-orange)',
                    letterSpacing: '0.12em',
                    marginBottom: '4px'
                  }}
                >
                  TARGET ROLE DESTINATION
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#fff'
                  }}
                >
                  {selectedRole.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-secondary)',
                    marginTop: '4px'
                  }}
                >
                  {selectedRole.category}
                </div>
              </div>

              {/* Reverse Engineering Progress Stats */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                  marginBottom: '18px'
                }}
              >
                <div
                  style={{
                    background: 'rgba(20, 19, 17, 0.8)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8.5px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    READINESS INDEX
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--accent-orange)'
                    }}
                  >
                    {readinessScore}%
                  </div>
                </div>

                <div
                  style={{
                    background: 'rgba(20, 19, 17, 0.8)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8.5px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    EST. EFFORT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#fff'
                    }}
                  >
                    {selectedRole.estTotalHours}h
                  </div>
                </div>
              </div>

              {/* Sequential Path Connectors Inspired by Screenshot */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span>PATH: STARTING POINT</span>
                  <span style={{ color: 'var(--accent-orange)' }}>→</span>
                  <span>TARGET ROLE</span>
                </div>

                {/* Simulated Nodes Chain */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(8, 8, 8, 0.7)',
                    padding: '8px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  {['01 BASE', '02 INFER', '03 AGENTS', '04 CAPSTONE'].map((stg, i) => (
                    <React.Fragment key={stg}>
                      <button
                        type="button"
                        onClick={() => setActiveStagePill(i)}
                        style={{
                          flex: 1,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '8.5px',
                          padding: '4px 2px',
                          textAlign: 'center',
                          borderRadius: '2px',
                          border:
                            activeStagePill === i
                              ? '1px solid var(--accent-orange)'
                              : '1px solid transparent',
                          background:
                            activeStagePill === i
                              ? 'rgba(255, 106, 0, 0.25)'
                              : 'transparent',
                          color: activeStagePill === i ? '#fff' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                      >
                        {stg}
                      </button>
                      {i < 3 && (
                        <span style={{ color: 'var(--border-medium)', fontSize: '9px' }}>-</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Live Coordinate Readout */}
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8.5px',
                  color: 'var(--text-muted)'
                }}
              >
                <span>X: {coords.x} • Y: {coords.y}</span>
                <span>CONFIDENCE: 96.8%</span>
              </div>
            </div>

            {/* Orbiting Satellite Status Tags (Matching Screenshot 1 & 2 aesthetic) */}
            <div
              className="tech-tag orange"
              style={{
                position: 'absolute',
                top: '40px',
                right: '20px',
                zIndex: 25
              }}
            >
              <span>CONFIDENCE // 97.4%</span>
            </div>

            <div
              className="tech-tag"
              style={{
                position: 'absolute',
                bottom: '50px',
                left: '10px',
                zIndex: 25
              }}
            >
              <span>PREREQUISITES // VERIFIED</span>
            </div>

            <div
              className="tech-tag"
              style={{
                position: 'absolute',
                top: '120px',
                left: '0px',
                zIndex: 25
              }}
            >
              <span>MILESTONES // 08</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-visual-stage {
            min-height: 420px !important;
          }
        }
      `}</style>
    </section>
  );
}
