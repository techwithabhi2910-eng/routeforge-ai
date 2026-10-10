import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Search, Compass, Award } from 'lucide-react';
import { INITIAL_ROLES } from '../data/careerData';
import LumiMascot from './LumiMascot';

export default function StepDiscover({
  selectedRole,
  onSelectRole,
  onNextStep,
  onTriggerMascotReaction
}) {
  const [customInput, setCustomInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const handleChooseRole = (role) => {
    onSelectRole(role);
    if (onTriggerMascotReaction) {
      onTriggerMascotReaction('happy', `Destination set to ${role.title}! Let's map where you're starting from.`, 2500);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const title = customInput.trim();
    const newRole = {
      id: `custom-${Date.now()}`,
      title,
      category: 'Custom Target Role',
      description: `Personalized reverse-engineering path synthesized for ${title}.`,
      baseReadiness: 30,
      estTotalHours: 400,
      salaryBenchmark: 'Industry Competitive',
      demandIndex: 'High',
      suggestedSkills: [
        'Core Foundations', 'Git & Version Control', 'Command Line & Linux',
        'System Architecture', 'Testing & CI/CD', 'Documentation & APIs'
      ]
    };
    onSelectRole(newRole);
    setCustomInput('');
    if (onTriggerMascotReaction) {
      onTriggerMascotReaction('celebrate', `Target role locked: ${title}!`, 2500);
    }
  };

  return (
    <section
      aria-label="Step 1: Discover Your Destination"
      style={{
        padding: 'clamp(32px, 5vw, 64px) 0',
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="tech-container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
        {/* Welcome Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'var(--accent-orange)',
              padding: '4px 12px',
              background: 'rgba(255, 106, 0, 0.08)',
              border: '1px solid rgba(255, 106, 0, 0.25)',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '20px'
            }}
          >
            <Compass size={13} />
            <span>STAGE 01 // DISCOVER YOUR DESTINATION</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: '20px'
            }}
          >
            Build your career path <span className="text-orange">backwards.</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            Traditional learning starts with random tutorials and hopes for the best.
            RouteForge AI starts at your dream job, isolates real industry prerequisites,
            and engineers a verifiable step-by-step roadmap to get you hired.
          </p>
        </div>

        {/* Step Guide with Lumi */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            background: 'rgba(25, 23, 21, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <LumiMascot
              state="neutral"
              size={40}
              interactive={false}
              compact={true}
              ariaLabel="Lumi Assistant"
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--accent-orange)',
                  letterSpacing: '0.05em'
                }}
              >
                LUMI'S TIP
              </div>
              <div style={{ fontSize: '13px', color: '#fff' }}>
                Where do you want your career to go? Select an industry role below or enter your own custom target.
              </div>
            </div>
          </div>
        </div>

        {/* Primary Role Grid: 4 Curated Roles */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              marginBottom: '14px'
            }}
          >
            FEATURED CAREER DESTINATIONS:
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px'
            }}
          >
            {INITIAL_ROLES.map((role) => {
              const isSelected = selectedRole?.id === role.id || selectedRole?.title === role.title;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleChooseRole(role)}
                  aria-pressed={isSelected}
                  style={{
                    background: isSelected
                      ? 'rgba(255, 106, 0, 0.1)'
                      : 'rgba(17, 16, 14, 0.8)',
                    border: isSelected
                      ? '2px solid var(--accent-orange)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '22px 18px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '170px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.5)';
                      e.currentTarget.style.background = 'rgba(25, 23, 21, 0.9)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = 'rgba(17, 16, 14, 0.8)';
                    }
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '9.5px',
                          color: isSelected ? 'var(--accent-orange)' : 'var(--text-muted)',
                          letterSpacing: '0.08em'
                        }}
                      >
                        {role.category}
                      </span>
                      {isSelected && (
                        <span
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: 'var(--accent-orange)',
                            color: '#000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: 700
                          }}
                        >
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '8px',
                        lineHeight: 1.2
                      }}
                    >
                      {role.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '12px',
                        lineHeight: 1.45,
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {role.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(220, 210, 195, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span>Est. ~{role.estTotalHours}h total</span>
                    <span style={{ color: isSelected ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>
                      {role.demandIndex} Demand
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Role Input */}
        <div
          style={{
            background: 'rgba(15, 14, 13, 0.6)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '20px',
            marginBottom: '40px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: 'var(--text-muted)',
              marginBottom: '10px',
              letterSpacing: '0.06em'
            }}
          >
            WANT A DIFFERENT ROLE? ENTER ANY TARGET TITLE:
          </div>
          <form
            onSubmit={handleCustomSubmit}
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. DevOps Engineer, Machine Learning Researcher, Product Manager..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: 'rgba(25, 23, 21, 0.9)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  color: '#fff',
                  fontSize: '13.5px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-orange)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
              />
            </div>
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="tech-btn"
              style={{
                padding: '12px 20px',
                opacity: customInput.trim() ? 1 : 0.6,
                cursor: customInput.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              Set Custom Role
            </button>
          </form>
        </div>

        {/* Selected Role Summary & Primary Action Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            background: 'rgba(255, 106, 0, 0.06)',
            border: '1.5px solid rgba(255, 106, 0, 0.35)',
            borderRadius: 'var(--radius-md)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                letterSpacing: '0.08em',
                marginBottom: '4px'
              }}
            >
              SELECTED TARGET ROLE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '22px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}
            >
              {selectedRole?.title || 'AI Engineer'}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Next, we'll map your current skills, study hours, and learning budget.
            </div>
          </div>

          <button
            type="button"
            onClick={onNextStep}
            className="tech-btn primary"
            style={{
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>Start My Journey</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
