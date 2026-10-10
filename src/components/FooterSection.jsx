import React from 'react';
import { ArrowUpRight, Terminal, Shield, Sparkles } from 'lucide-react';

export default function FooterSection({ onOpenBuilder }) {
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        background: '#060605',
        padding: '100px 0 40px',
        overflow: 'hidden'
      }}
    >
      <div className="tech-container">
        {/* Final CTA Visual Stage */}
        <div
          className="tech-panel tech-corner-box"
          style={{
            padding: '60px 40px',
            background: 'rgba(13, 12, 11, 0.95)',
            border: '1.5px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Ambient Orange Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(255, 106, 0, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'var(--accent-orange)',
              marginBottom: '20px'
            }}
          >
            <span>// EXECUTE YOUR TRAJECTORY</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#fff',
              maxWidth: '800px',
              marginBottom: '20px'
            }}
          >
            YOUR NEXT MOVE <span className="text-orange">STARTS HERE.</span>
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              marginBottom: '36px',
              lineHeight: 1.6
            }}
          >
            Stop guessing your route to high-impact technical roles. Reverse-engineer your skills,
            produce demonstrable GitHub evidence, and forge your roadmap today.
          </p>

          <button
            type="button"
            onClick={onOpenBuilder}
            className="tech-btn primary"
            style={{ padding: '14px 32px', fontSize: '13px' }}
          >
            <span>BUILD MY ROADMAP</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Technical Footer Details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '40px',
            marginBottom: '40px'
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-orange)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-orange)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-editorial)', fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                RouteForge AI
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '260px' }}>
              Career Intelligence System designed for technical engineers, researchers, and aspiring engineering leaders.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                letterSpacing: '0.1em',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}
            >
              ROADMAP MODULES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#section-discover" className="footer-link">01 / Discover Role</a>
              <a href="#section-analyze" className="footer-link">02 / Skill Gap Analysis</a>
              <a href="#section-compare" className="footer-link">03 / Compare 3 Routes</a>
              <a href="#section-build" className="footer-link">04 / Interactive Graph</a>
              <a href="#section-track" className="footer-link">05 / Evidence Telemetry</a>
            </div>
          </div>

          {/* System Telemetry Specs */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                letterSpacing: '0.1em',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}
            >
              SYSTEM TELEMETRY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              <div style={{ color: 'var(--text-secondary)' }}>STATUS: <span style={{ color: '#fff' }}>NOMINAL // ONLINE</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>CORE VERSION: <span style={{ color: '#fff' }}>v2.4.0-PROD</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>ENGINE: <span style={{ color: '#fff' }}>DAG REACT FLOW v12</span></div>
              <div style={{ color: 'var(--text-secondary)' }}>AI PIPELINE: <span style={{ color: 'var(--accent-orange)' }}>DEMO SIMULATOR</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} ROUTEFORGE AI. ALL ARCHITECTURE MODELS PRESERVED.
          </div>
          <div>
            FRONTEND DEMO SIMULATION • NO LIVE LLM CREDENTIALS REQUIRED
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent-orange);
        }
      `}</style>
    </footer>
  );
}
