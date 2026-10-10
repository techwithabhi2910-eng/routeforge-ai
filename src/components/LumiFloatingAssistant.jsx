import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Compass, UserCheck, GitFork, Milestone, Sparkles } from 'lucide-react';
import LumiMascot from './LumiMascot';

const STEP_GUIDANCE = {
  1: {
    tag: 'STAGE 1 // DISCOVER',
    message: 'Where do you want your career to go? Pick a role or enter your dream job.'
  },
  2: {
    tag: 'STAGE 2 // YOUR SKILLS',
    message: 'Let\'s understand what you already know. Select your skills, study hours, and budget.'
  },
  3: {
    tag: 'STAGE 3 // SKILL GAP',
    message: 'Here are the skills between you and your goal. Review the gap before picking a route.'
  },
  4: {
    tag: 'STAGE 4 // CHOOSE ROUTE',
    message: 'Pick the strategy that fits your priorities: speed, budget, or portfolio proof.'
  },
  5: {
    tag: 'STAGE 5 // YOUR ROADMAP',
    message: 'Let\'s start with your next milestone! Click any milestone to see deliverables.'
  }
};

export default function LumiFloatingAssistant({
  currentStep = 1,
  targetRole,
  mascotState = 'neutral',
  mascotMessage = '',
  onTriggerReaction,
  isLoadingRoadmap = false,
  onGoToStep
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const currentGuidance = STEP_GUIDANCE[currentStep] || STEP_GUIDANCE[1];
  const displayMessage = mascotMessage || currentGuidance.message;

  // Determine avatar state based on real system state
  const computedState = isLoadingRoadmap ? 'working' : mascotState;

  return (
    <aside
      ref={containerRef}
      className="lumi-floating-container"
      aria-label="Lumi AI Career Guide"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 100
      }}
    >
      {/* Popover Helper Panel */}
      {isOpen && (
        <div
          className="lumi-popover-panel tech-corner-box"
          role="dialog"
          aria-label="Lumi AI Career Guide"
          aria-modal="false"
          style={{
            position: 'absolute',
            bottom: '68px',
            right: '0',
            width: '320px',
            background: 'rgba(15, 14, 12, 0.98)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '18px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 106, 0, 0.15)'
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-orange)',
                  boxShadow: '0 0 8px var(--accent-orange)'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.08em'
                }}
              >
                LUMI // CAREER GUIDE
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="lumi-popover-close"
              aria-label="Close Lumi assistant"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={15} />
            </button>
          </div>

          {/* Context Guidance Card */}
          <div style={{ marginBottom: '14px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--accent-orange)',
                letterSpacing: '0.08em',
                marginBottom: '4px'
              }}
            >
              {currentGuidance.tag}
            </div>
            {targetRole?.title && (
              <div
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '8px'
                }}
              >
                Target: {targetRole.title}
              </div>
            )}
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                padding: '10px 12px',
                background: 'rgba(25, 23, 21, 0.9)',
                borderRadius: 'var(--radius-xs)',
                borderLeft: '3px solid var(--accent-orange)'
              }}
            >
              "{displayMessage}"
            </div>
          </div>

          {/* Quick Stage Shortcuts */}
          {onGoToStep && (
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  marginBottom: '6px'
                }}
              >
                JOURNEY STEPS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { step: 1, label: '1. Discover Destination', icon: Compass },
                  { step: 2, label: '2. Your Starting Point', icon: UserCheck },
                  { step: 3, label: '3. Skill Gap Analysis', icon: GitFork },
                  { step: 4, label: '4. Choose Route', icon: GitFork },
                  { step: 5, label: '5. Follow Roadmap', icon: Milestone }
                ].map((s) => {
                  const isCurrent = currentStep === s.step;
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        onGoToStep(s.step);
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        background: isCurrent ? 'rgba(255, 106, 0, 0.12)' : 'rgba(25, 23, 21, 0.5)',
                        border: isCurrent ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        color: isCurrent ? '#fff' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon size={12} style={{ color: isCurrent ? 'var(--accent-orange)' : 'var(--text-muted)' }} />
                        <span>{s.label}</span>
                      </span>
                      {isCurrent && (
                        <span style={{ fontSize: '8.5px', color: 'var(--accent-orange)' }}>ACTIVE</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="lumi-floating-trigger"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Lumi AI Career Guide - Click to view advice"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(15, 14, 12, 0.95)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '28px',
          padding: '4px 12px 4px 6px',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 106, 0, 0.15)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-orange)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-medium)')}
      >
        <LumiMascot
          state={computedState}
          size={38}
          interactive={false}
          compact={true}
          ariaLabel="Lumi Cubee Mascot"
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.06em'
            }}
          >
            LUMI AI
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8.5px',
              color: 'var(--accent-orange)'
            }}
          >
            STAGE {currentStep} GUIDE
          </span>
        </div>
      </button>
    </aside>
  );
}
