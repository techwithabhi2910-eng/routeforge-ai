import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Compass, Layers, GitBranch, Crosshair, ChevronDown } from 'lucide-react';

export default function Header({ onOpenBuilder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pathsDropdownOpen, setPathsDropdownOpen] = useState(false);

  return (
    <header
      style={{
        height: 'var(--header-height)',
        background: 'rgba(8, 8, 8, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 90,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="tech-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <a
          href="#section-discover"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-primary)'
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
        </a>

        {/* Center Navigation for Desktop */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
          className="header-desktop-nav"
        >
          {/* Framed workspace badge inspired by reference */}
          <a
            href="#section-build"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xs)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              background: 'rgba(220, 210, 195, 0.04)',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
              e.currentTarget.style.color = 'var(--accent-orange)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-medium)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <Layers size={12} style={{ color: 'var(--accent-orange)' }} />
            <span>ROADMAP WORKSPACE</span>
          </a>

          <a href="#section-discover" className="nav-link">
            Explore
          </a>
          <a href="#section-analyze" className="nav-link">
            How It Works
          </a>

          {/* Paths Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setPathsDropdownOpen(true)}
            onMouseLeave={() => setPathsDropdownOpen(false)}
          >
            <a
              href="#section-compare"
              className="nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Career Paths</span>
              <ChevronDown size={11} style={{ opacity: 0.6 }} />
            </a>

            {pathsDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '240px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px',
                  marginTop: '6px',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 200
                }}
              >
                <a href="#section-compare" className="dropdown-link">
                  <span className="dropdown-title">Fastest Route</span>
                  <span className="dropdown-desc">16 weeks • Sprint prerequisite</span>
                </a>
                <a href="#section-compare" className="dropdown-link">
                  <span className="dropdown-title">Budget-Friendly Route</span>
                  <span className="dropdown-desc">26 weeks • $0 Zero-cost OSS</span>
                </a>
                <a href="#section-compare" className="dropdown-link">
                  <span className="dropdown-title">Portfolio-First Route</span>
                  <span className="dropdown-desc">22 weeks • Proof-of-work</span>
                </a>
              </div>
            )}
          </div>

          <a href="#section-track" className="nav-link">
            My Progress
          </a>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={onOpenBuilder}
            className="tech-btn"
            style={{
              borderColor: 'var(--border-orange-dim)',
              color: 'var(--text-primary)',
              background: 'rgba(255, 106, 0, 0.08)'
            }}
          >
            <span style={{ color: 'var(--accent-orange)' }}>••</span>
            <span>BUILD MY ROADMAP</span>
            <ArrowUpRight size={13} style={{ color: 'var(--accent-orange)' }} />
          </button>

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
            gap: '14px',
            zIndex: 100
          }}
        >
          <a
            href="#section-discover"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            01 / Explore Target Role
          </a>
          <a
            href="#section-analyze"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            02 / Analyze Skill Distance
          </a>
          <a
            href="#section-compare"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            03 / Compare 3 Alternative Routes
          </a>
          <a
            href="#section-build"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            04 / Interactive Roadmap Graph
          </a>
          <a
            href="#section-track"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            05 / Track Progress & Evidence
          </a>

          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuilder();
              }}
              className="tech-btn primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              BUILD MY ROADMAP ↗
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .nav-link:hover {
          color: var(--accent-orange);
        }
        .dropdown-link {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 8px 10px;
          border-radius: var(--radius-xs);
          text-decoration: none;
          transition: background var(--transition-fast);
        }
        .dropdown-link:hover {
          background: rgba(255, 106, 0, 0.1);
        }
        .dropdown-title {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .dropdown-desc {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }
        .mobile-nav-link {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-primary);
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }
        .mobile-nav-link:hover {
          color: var(--accent-orange);
        }
        @media (max-width: 860px) {
          .header-desktop-nav {
            display: none !important;
          }
          .header-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
