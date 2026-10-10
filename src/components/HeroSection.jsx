import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Terminal, ChevronRight } from 'lucide-react';
import { INITIAL_ROLES } from '../data/careerData';
import LumiMascot from './LumiMascot';

export default function HeroSection({
  selectedRole,
  onSelectRole,
  experienceLevel,
  onChangeExperienceLevel,
  onGenerateRoadmap,
  readinessScore,
  mascotState: externalMascotState,
  mascotMessage: externalMascotMessage,
  onTriggerMascotReaction: externalOnTriggerMascotReaction,
  isLoadingRoadmap = false,
  roadmapError = null,
  onRetryRoadmap,
  isLiveGenerated = false
}) {
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [activeStagePill, setActiveStagePill] = useState(0);
  const [coords, setCoords] = useState({ x: 42.88, y: 77.12 });
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [budgetInr, setBudgetInr] = useState(5000);
  const [internalMascotState, setInternalMascotState] = useState('neutral');
  const [internalMascotMessage, setInternalMascotMessage] = useState('Observing career objectives. Select a target role.');

  const isControlled = externalMascotState !== undefined;
  const currentMascotState = isControlled ? externalMascotState : internalMascotState;
  const currentMascotMessage = isControlled ? externalMascotMessage : internalMascotMessage;

  const setMascotReaction = (st, msg, duration = 0) => {
    if (externalOnTriggerMascotReaction) {
      externalOnTriggerMascotReaction(st, msg, duration);
    } else {
      setInternalMascotState(st);
      if (msg) setInternalMascotMessage(msg);
      if (duration > 0) {
        setTimeout(() => {
          setInternalMascotState('neutral');
          setInternalMascotMessage('Telemetry active. Select a target role.');
        }, duration);
      }
    }
  };

  // React to role change
  const handleSelectRoleWithMascot = (role) => {
    onSelectRole(role);
    setMascotReaction('thinking', `Synthesizing requirements for ${role.title}...`, 1200);
  };

  // React to experience level change
  const handleChangeExperienceWithMascot = (lvl) => {
    onChangeExperienceLevel(lvl);
    setMascotReaction('working', `Recalibrating curriculum for ${lvl} level...`, 1000);
  };

  // React to roadmap generation
  const handleTriggerForge = (e) => {
    if (e) e.preventDefault();
    if (isLoadingRoadmap) return;
    if (onGenerateRoadmap) {
      onGenerateRoadmap({
        targetRole: selectedRole.title,
        weeklyHours,
        budgetInr
      });
    }
  };

  // Derive active mascot state (celebrates automatically when readiness hits 100%)
  const activeMascotState = readinessScore >= 100 ? 'celebrate' : currentMascotState;
  const activeMascotMessage = readinessScore >= 100 ? 'Career Readiness: 100%! All milestones verified.' : currentMascotMessage;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCustomInputChange = (e) => {
    const val = e.target.value;
    setCustomRoleInput(val);
    if (val.trim()) {
      setMascotReaction('searching', `Searching skill graph for "${val.trim()}"...`, 0);
    } else {
      setMascotReaction('neutral', 'Observing career objectives. Select a target role.', 0);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    const title = customRoleInput.trim();
    onSelectRole({
      id: 'custom-' + Date.now(),
      title,
      category: 'Custom Target Role',
      description: `Tailored reverse-engineering path synthesized for ${title}.`,
      baseReadiness: 35,
      estTotalHours: 460,
      salaryBenchmark: '$195k — $275k / yr',
      demandIndex: 'High'
    });
    setCustomRoleInput('');
    setMascotReaction('happy', `Custom target locked: ${title}!`, 2500);
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
        padding: 'clamp(36px, 5vw, 64px) 0 clamp(24px, 4vw, 40px)',
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
            gridTemplateColumns: 'minmax(0, 1.28fr) minmax(0, 0.92fr)',
            gap: 'clamp(28px, 4vw, 56px)',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Typography & Form */}
          <div className="hero-left-col" style={{ position: 'relative', zIndex: 10, minWidth: 0 }}>
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
                marginBottom: '18px'
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

            {/* Responsive Editorial Headline */}
            <h1 className="hero-headline">
              <span className="hero-headline-line1" style={{ color: 'var(--text-primary)', display: 'block' }}>
                YOUR DREAM.
              </span>
              <span className="hero-headline-accent-row">
                <span style={{ color: 'var(--text-primary)' }}>REVERSE-</span>
                <span style={{ color: 'var(--accent-orange)' }}>ENGINEERED.</span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                marginBottom: '28px'
              }}
            >
              Start with the role you want. Discover the skills, projects, and milestones that can
              take you there. Built for engineers seeking rigorous career trajectory clarity.
            </p>

            {/* CTA Buttons */}
            <div
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '32px'
              }}
            >
              <button
                type="button"
                onClick={handleTriggerForge}
                disabled={isLoadingRoadmap}
                className="tech-btn primary hero-btn-primary"
                style={{
                  padding: '12px 22px',
                  fontSize: '12px',
                  opacity: isLoadingRoadmap ? 0.75 : 1,
                  cursor: isLoadingRoadmap ? 'wait' : 'pointer'
                }}
              >
                <span>{isLoadingRoadmap ? 'SYNTHESIZING ROADMAP...' : isLiveGenerated ? 'RE-FORGE ROADMAP' : 'BUILD MY ROADMAP'}</span>
                <ArrowUpRight size={15} />
              </button>

              <a
                href="#section-build"
                className="tech-btn hero-btn-secondary"
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
                    fontSize: '9px',
                    color: isLiveGenerated ? '#00ff88' : 'var(--accent-orange)'
                  }}
                >
                  {isLiveGenerated ? 'LIVE GEMINI ENGINE' : 'SYSTEM READY'}
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
                      onClick={() => handleSelectRoleWithMascot(role)}
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
                  onChange={handleCustomInputChange}
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

              {/* Experience Level */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    EXPERIENCE LEVEL:
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-orange)' }}>
                    {experienceLevel}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Junior / Switcher', 'Mid-Level', 'Senior'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => handleChangeExperienceWithMascot(lvl)}
                      style={{
                        flex: 1,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        padding: '4px 6px',
                        borderRadius: 'var(--radius-xs)',
                        border:
                          experienceLevel === lvl
                            ? '1px solid var(--accent-orange)'
                            : '1px solid var(--border-subtle)',
                        background:
                          experienceLevel === lvl
                            ? 'rgba(255, 106, 0, 0.2)'
                            : 'rgba(20, 19, 17, 0.6)',
                        color: experienceLevel === lvl ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Study Hours & Budget Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                {/* Weekly Study Hours */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      WEEKLY HOURS:
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-orange)' }}>
                      {weeklyHours}h/wk
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[10, 15, 20, 30].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setWeeklyHours(h)}
                        style={{
                          flex: 1,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          padding: '3px 0',
                          borderRadius: 'var(--radius-xs)',
                          border: weeklyHours === h ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                          background: weeklyHours === h ? 'rgba(255, 106, 0, 0.2)' : 'rgba(20, 19, 17, 0.6)',
                          color: weeklyHours === h ? '#fff' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                      >
                        {h}h
                      </button>
                    ))}
                  </div>
                </div>

                {/* Learning Budget (INR) */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      BUDGET (INR):
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent-orange)' }}>
                      {budgetInr === 0 ? '₹0' : `₹${budgetInr >= 1000 ? `${budgetInr / 1000}k` : budgetInr}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[
                      { val: 0, label: '₹0' },
                      { val: 5000, label: '₹5k' },
                      { val: 15000, label: '₹15k' },
                      { val: 50000, label: '₹50k' }
                    ].map((b) => (
                      <button
                        key={b.val}
                        type="button"
                        onClick={() => setBudgetInr(b.val)}
                        style={{
                          flex: 1,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          padding: '3px 0',
                          borderRadius: 'var(--radius-xs)',
                          border: budgetInr === b.val ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                          background: budgetInr === b.val ? 'rgba(255, 106, 0, 0.2)' : 'rgba(20, 19, 17, 0.6)',
                          color: budgetInr === b.val ? '#fff' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button & Live Status */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)' }}>
                  {isLiveGenerated ? '● 3 ROUTES SYNCED WITH GEMINI' : '● READY TO FORGE'}
                </div>

                <button
                  type="button"
                  onClick={handleTriggerForge}
                  disabled={isLoadingRoadmap}
                  className="tech-btn primary sm"
                  style={{
                    gap: '4px',
                    opacity: isLoadingRoadmap ? 0.75 : 1,
                    cursor: isLoadingRoadmap ? 'wait' : 'pointer'
                  }}
                >
                  <span>{isLoadingRoadmap ? 'SYNTHESIZING...' : isLiveGenerated ? 'RE-FORGE ROADMAP' : 'FORGE ROADMAP'}</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Error Callout Banner */}
              {roadmapError && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '8px 10px',
                    background: 'rgba(230, 92, 92, 0.12)',
                    border: '1px solid rgba(230, 92, 92, 0.4)',
                    borderRadius: 'var(--radius-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#ff6666', lineHeight: 1.3 }}>
                    ⚠️ {roadmapError}
                  </div>
                  <button
                    type="button"
                    onClick={handleTriggerForge}
                    className="tech-btn sm"
                    style={{
                      padding: '2px 8px',
                      fontSize: '8.5px',
                      color: '#ff8888',
                      borderColor: 'rgba(255, 100, 100, 0.4)',
                      flexShrink: 0
                    }}
                  >
                    RETRY
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Tactical Intelligence HUD Visualization */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '420px',
              margin: '0 auto',
              minWidth: 0,
              minHeight: '460px'
            }}
            className="hero-visual-stage"
          >
            {/* Outer Subtle Orbit Ring */}
            <div
              className="animate-spin-slow hero-orbit-ring"
              style={{
                position: 'absolute',
                width: '350px',
                height: '350px',
                maxWidth: '96%',
                maxHeight: '96%',
                borderRadius: '50%',
                border: '1px dashed rgba(220, 210, 195, 0.08)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Inner Technical Orbit with Ticks */}
            <div
              className="animate-spin-reverse hero-orbit-ring"
              style={{
                position: 'absolute',
                width: '290px',
                height: '290px',
                maxWidth: '88%',
                maxHeight: '88%',
                borderRadius: '50%',
                border: '1px solid rgba(255, 106, 0, 0.18)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-3px',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent-orange)',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px var(--accent-orange)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-3px',
                  left: '50%',
                  width: '6px',
                  height: '6px',
                  background: 'var(--accent-orange)',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px var(--accent-orange)'
                }}
              />
            </div>

            {/* Central Career Forge Apparatus */}
            <div
              style={{
                width: '100%',
                maxWidth: '380px',
                background: 'rgba(13, 12, 11, 0.96)',
                border: '1px solid rgba(255, 106, 0, 0.35)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 106, 0, 0.1)',
                padding: '18px 20px',
                position: 'relative',
                zIndex: 10,
                boxSizing: 'border-box'
              }}
              className="target-forge-panel tech-corner-box"
            >
              {/* Header Telemetry */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: '8px',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                      boxShadow: '0 0 6px var(--accent-orange)'
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
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
                    fontSize: '9px',
                    color: 'var(--accent-orange)'
                  }}
                >
                  ACTIVE TELEMETRY
                </span>
              </div>

              {/* Lumi Mascot Copilot Stage */}
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(230, 92, 92, 0.06)',
                  border: '1px solid rgba(230, 92, 92, 0.25)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <LumiMascot
                    state={activeMascotState}
                    size={58}
                    interactive={true}
                    onStateChange={(next) => {
                      const msgs = {
                        neutral: 'Observing your career configuration.',
                        curious: 'Inspecting career trajectory parameters.',
                        thinking: 'Evaluating career trajectories...',
                        searching: 'Scanning industry skill clusters...',
                        working: 'Compiling curriculum dependencies...',
                        happy: 'Optimal roadmap computed!',
                        celebrate: 'All objectives completed!',
                        confused: 'Anomalous telemetry detected. Recalibrating...'
                      };
                      setMascotReaction(next, msgs[next] || `Lumi is now ${next}.`, 3500);
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '3px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9px',
                          fontWeight: 700,
                          color: '#e65c5c',
                          letterSpacing: '0.08em'
                        }}
                      >
                        LUMI // AI NAVIGATOR
                      </span>
                      <span
                        className="tech-tag"
                        style={{
                          fontSize: '7.5px',
                          padding: '1px 4px',
                          color: '#e65c5c',
                          borderColor: 'rgba(230, 92, 92, 0.4)'
                        }}
                      >
                        {activeMascotState.toUpperCase()}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        color: 'var(--text-primary)',
                        lineHeight: 1.35
                      }}
                    >
                      "{activeMascotMessage}"
                    </div>
                  </div>
                </div>

                {/* State Quick-Selector Chips */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(230, 92, 92, 0.15)',
                    overflowX: 'auto',
                    scrollbarWidth: 'none'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '7.5px',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginRight: '2px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    STATE:
                  </span>
                  {[
                    { key: 'neutral', label: 'Reset' },
                    { key: 'curious', label: 'Curious' },
                    { key: 'thinking', label: 'Thinking' },
                    { key: 'searching', label: 'Search' },
                    { key: 'working', label: 'Working' },
                    { key: 'happy', label: 'Happy' },
                    { key: 'celebrate', label: 'Celebrate' }
                  ].map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => {
                        const msgs = {
                          neutral: 'Observing your career configuration.',
                          curious: 'Inspecting career trajectory parameters.',
                          thinking: 'Evaluating career trajectories...',
                          searching: 'Scanning industry skill clusters...',
                          working: 'Compiling curriculum dependencies...',
                          happy: 'Optimal roadmap computed!',
                          celebrate: 'All objectives completed!',
                          confused: 'Anomalous telemetry detected. Recalibrating...'
                        };
                        setMascotReaction(s.key, msgs[s.key] || `State: ${s.key}`, 3500);
                      }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '7.5px',
                        padding: '2px 4px',
                        borderRadius: '2px',
                        border:
                          activeMascotState === s.key
                            ? '1px solid #e65c5c'
                            : '1px solid var(--border-subtle)',
                        background:
                          activeMascotState === s.key
                            ? 'rgba(230, 92, 92, 0.25)'
                            : 'rgba(20, 19, 17, 0.6)',
                        color: activeMascotState === s.key ? '#fff' : 'var(--text-muted)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Role Core Badge */}
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255, 106, 0, 0.08)',
                  border: '1px solid rgba(255, 106, 0, 0.3)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8.5px',
                    color: 'var(--accent-orange)',
                    letterSpacing: '0.12em',
                    marginBottom: '3px'
                  }}
                >
                  TARGET ROLE DESTINATION
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.2
                  }}
                >
                  {selectedRole.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    color: 'var(--text-secondary)',
                    marginTop: '3px'
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
                  gap: '8px',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    background: 'rgba(20, 19, 17, 0.8)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em'
                    }}
                  >
                    READINESS INDEX
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '15px',
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
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '8px',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.06em'
                    }}
                  >
                    EST. EFFORT
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#fff'
                    }}
                  >
                    {selectedRole.estTotalHours}h
                  </div>
                </div>
              </div>

              {/* Sequential Path Connectors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8.5px',
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
                    padding: '6px',
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
                          fontSize: '8px',
                          padding: '3px 2px',
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
                        <span style={{ color: 'var(--border-medium)', fontSize: '8.5px' }}>-</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Live Coordinate Readout */}
              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: 'var(--text-muted)'
                }}
              >
                <span>X: {coords.x} • Y: {coords.y}</span>
                <span>CONFIDENCE: 96.8%</span>
              </div>
            </div>

            {/* Orbiting Satellite Status Tags (Anchored securely to apparatus bounds) */}
            <div
              className="tech-tag orange hero-satellite-tag hero-satellite-top"
              style={{
                position: 'absolute',
                top: '-10px',
                right: '12px',
                zIndex: 25
              }}
            >
              <span>CONFIDENCE // 97.4%</span>
            </div>

            <div
              className="tech-tag hero-satellite-tag hero-satellite-bottom"
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '12px',
                zIndex: 25
              }}
            >
              <span>PREREQUISITES // VERIFIED</span>
            </div>

            <div
              className="tech-tag hero-satellite-tag hero-satellite-side"
              style={{
                position: 'absolute',
                top: '48px',
                left: '-10px',
                zIndex: 25
              }}
            >
              <span>MILESTONES // 08</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-headline {
          font-family: var(--font-editorial);
          font-size: clamp(34px, 4.2vw, 68px);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -0.025em;
          text-transform: uppercase;
          margin-bottom: 22px;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .hero-headline-accent-row {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          column-gap: 0.22em;
          row-gap: 0;
        }
        @media (min-width: 1440px) {
          .hero-headline {
            font-size: 68px;
          }
        }
        @media (min-width: 1025px) and (max-width: 1439px) {
          .hero-headline {
            font-size: clamp(48px, 4.2vw, 58px);
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-headline {
            font-size: clamp(40px, 4.8vw, 48px);
          }
        }
        @media (max-width: 767px) {
          .hero-headline {
            font-size: clamp(32px, 7.8vw, 40px);
            line-height: 1.06;
          }
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-left-col {
            max-width: 640px;
            margin: 0 auto;
            width: 100%;
          }
          .hero-visual-stage {
            min-height: 440px !important;
            width: 100%;
          }
        }
        @media (max-width: 640px) {
          .hero-orbit-ring {
            display: none !important;
          }
          .hero-visual-stage {
            min-height: auto !important;
            padding-top: 14px;
            padding-bottom: 14px;
          }
          .hero-satellite-side {
            left: 4px !important;
            top: -24px !important;
          }
          .hero-satellite-top {
            right: 4px !important;
          }
          .hero-satellite-bottom {
            left: 4px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100% !important;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
