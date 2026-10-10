import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Compass, Layers, Sparkles, RotateCcw, Eye } from 'lucide-react';

export default function Header({
  currentStep = 1,
  maxStepReached = 1,
  onSelectStep,
  isAdvancedMode = false,
  onToggleAdvancedMode,
  onResetJourney
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { step: 1, label: '1. Destination' },
    { step: 2, label: '2. Your Skills' },
    { step: 3, label: '3. Skill Gap' },
    { step: 4, label: '4. Choose Route' },
    { step: 5, label: '5. Follow Roadmap' }
  ];

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'rgba(8, 8, 8, 0.94)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="tech-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand */}
        <button
          type="button"
          onClick={() => onSelectStep ? onSelectStep(1) : null}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {/* Circular orange symbol with technical dots */}
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1.5px solid var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              background: 'rgba(255, 106, 0, 0.08)'
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-orange)',
                boxShadow: '0 0 6px var(--accent-orange)'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '17px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#fff'
              }}
            >
              RouteForge
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--accent-orange)',
                letterSpacing: '0.05em'
              }}
            >
              AI
            </span>
          </div>
        </button>

        {/* Center Stage Quick Nav (Desktop) */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(8px, 1.2vw, 16px)'
          }}
          className="header-desktop-nav"
        >
          {navItems.map((item) => {
            const isAccessible = item.step <= maxStepReached;
            const isCurrent = currentStep === item.step;
            return (
              <button
                key={item.step}
                type="button"
                disabled={!isAccessible}
                onClick={() => isAccessible && onSelectStep(item.step)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent
                    ? 'var(--accent-orange)'
                    : isAccessible
                    ? 'var(--text-secondary)'
                    : 'var(--text-dim)',
                  cursor: isAccessible ? 'pointer' : 'not-allowed',
                  padding: '4px 6px',
                  borderBottom: isCurrent ? '1.5px solid var(--accent-orange)' : '1.5px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Optional Advanced View Toggle */}
          {onToggleAdvancedMode && (
            <button
              type="button"
              onClick={onToggleAdvancedMode}
              title="Toggle all panels overview"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                padding: '6px 10px',
                background: isAdvancedMode ? 'rgba(255, 106, 0, 0.15)' : 'rgba(25, 23, 21, 0.6)',
                border: isAdvancedMode ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                color: isAdvancedMode ? 'var(--accent-orange)' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <Eye size={12} />
              <span className="advanced-toggle-text">
                {isAdvancedMode ? 'Guided Journey' : 'All Panels'}
              </span>
            </button>
          )}

          {/* New Journey / Restart */}
          {onResetJourney && (
            <button
              type="button"
              onClick={onResetJourney}
              className="tech-btn sm"
              style={{
                fontSize: '10.5px',
                padding: '6px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <RotateCcw size={11} />
              <span>New Path</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              padding: '6px'
            }}
            className="header-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: 'var(--bg-surface-elevated)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 100
          }}
        >
          {navItems.map((item) => {
            const isAccessible = item.step <= maxStepReached;
            const isCurrent = currentStep === item.step;
            return (
              <button
                key={item.step}
                type="button"
                disabled={!isAccessible}
                onClick={() => {
                  if (isAccessible) {
                    onSelectStep(item.step);
                    setMobileMenuOpen(false);
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: isCurrent
                    ? 'var(--accent-orange)'
                    : isAccessible
                    ? '#fff'
                    : 'var(--text-muted)',
                  cursor: isAccessible ? 'pointer' : 'not-allowed'
                }}
              >
                {item.label} {isCurrent && ' (Active)'}
              </button>
            );
          })}

          <div style={{ paddingTop: '8px' }}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onResetJourney) onResetJourney();
              }}
              className="tech-btn primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Start New Journey ↗
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-mobile-toggle {
            display: flex !important;
          }
        }
        @media (max-width: 500px) {
          .advanced-toggle-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
