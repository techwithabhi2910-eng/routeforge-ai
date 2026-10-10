import React from 'react';
import { Compass, UserCheck, GitFork, Milestone, CheckCircle2, Lock } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Discover', label: '1. Destination', icon: Compass, description: 'Choose target role' },
  { id: 2, name: 'Your Skills', label: '2. Starting Point', icon: UserCheck, description: 'Map your skills & budget' },
  { id: 3, name: 'Skill Gap', label: '3. Skill Gap', icon: GitFork, description: 'Analyze learning distance' },
  { id: 4, name: 'Choose Route', label: '4. Choose Route', icon: GitFork, description: 'Compare 3 strategies' },
  { id: 5, name: 'Your Roadmap', label: '5. Follow Roadmap', icon: Milestone, description: 'Execute milestones' }
];

export default function JourneyStepper({
  currentStep = 1,
  maxStepReached = 1,
  onSelectStep,
  isLiveGenerated = false
}) {
  return (
    <nav
      className="journey-stepper-container"
      aria-label="Career Journey Progress"
      style={{
        position: 'sticky',
        top: 'var(--header-height, 56px)',
        zIndex: 85,
        background: 'rgba(9, 8, 7, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '10px 0'
      }}
    >
      <div className="tech-container">
        <ol
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = step.id < currentStep || (step.id < maxStepReached && step.id !== currentStep);
            const isAccessible = step.id <= maxStepReached;
            const StepIcon = isCompleted ? CheckCircle2 : step.icon;

            return (
              <li
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: '130px'
                }}
              >
                <button
                  type="button"
                  disabled={!isAccessible}
                  onClick={() => isAccessible && onSelectStep(step.id)}
                  aria-current={isCurrent ? 'step' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    background: isCurrent
                      ? 'rgba(255, 106, 0, 0.12)'
                      : isCompleted
                      ? 'rgba(25, 23, 21, 0.6)'
                      : 'rgba(15, 14, 13, 0.3)',
                    border: isCurrent
                      ? '1px solid var(--accent-orange)'
                      : isCompleted
                      ? '1px solid rgba(220, 210, 195, 0.2)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: isCurrent
                      ? '#fff'
                      : isCompleted
                      ? 'var(--text-primary)'
                      : 'var(--text-muted)',
                    cursor: isAccessible ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (isAccessible && !isCurrent) {
                      e.currentTarget.style.borderColor = 'rgba(255, 106, 0, 0.5)';
                      e.currentTarget.style.background = 'rgba(255, 106, 0, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.borderColor = isCompleted
                        ? 'rgba(220, 210, 195, 0.2)'
                        : 'var(--border-subtle)';
                      e.currentTarget.style.background = isCompleted
                        ? 'rgba(25, 23, 21, 0.6)'
                        : 'rgba(15, 14, 13, 0.3)';
                    }
                  }}
                >
                  {/* Step Number or Icon Indicator */}
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      background: isCurrent
                        ? 'var(--accent-orange)'
                        : isCompleted
                        ? 'rgba(0, 255, 136, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isCurrent
                        ? '#000'
                        : isCompleted
                        ? '#00ff88'
                        : 'var(--text-muted)',
                      border: isCompleted
                        ? '1px solid rgba(0, 255, 136, 0.4)'
                        : 'none',
                      fontWeight: 700,
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={14} />
                    ) : !isAccessible ? (
                      <Lock size={12} />
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Step Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        fontWeight: isCurrent ? 700 : 600,
                        letterSpacing: '0.02em',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        color: isCurrent ? 'var(--accent-orange)' : '#fff'
                      }}
                    >
                      {step.name}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        color: isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      {step.description}
                    </span>
                  </div>
                </button>

                {/* Arrow Connector between steps */}
                {index < STEPS.length - 1 && (
                  <div
                    style={{
                      margin: '0 4px',
                      color: isCompleted ? 'rgba(255, 106, 0, 0.5)' : 'var(--border-subtle)',
                      fontSize: '12px',
                      userSelect: 'none',
                      display: 'none' // Hidden on tight screens, displayed via CSS if width allows
                    }}
                    className="stepper-arrow-divider"
                  >
                    →
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
