import React from 'react';
import { X, Code2, HelpCircle } from 'lucide-react';
import LumiMascot from './LumiMascot';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function MilestoneInspector({ milestone, onClose, onToggleComplete }) {
  if (!milestone) return null;

  const isCompleted = milestone.status === 'completed';

  return (
    <div
      className="tech-panel tech-corner-box"
      style={{
        background: 'rgba(15, 14, 12, 0.98)',
        border: '1.5px solid var(--border-medium)',
        borderRadius: 'var(--radius-sm)',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 106, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        overflowY: 'auto',
        position: 'relative'
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '14px',
          marginBottom: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--accent-orange)',
              letterSpacing: '0.1em'
            }}
          >
            {milestone.code} // INSPECTOR
          </span>
          <span className="tech-tag" style={{ fontSize: '9px', padding: '2px 6px' }}>
            {milestone.phase}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close inspector"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={16} />
        </button>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '20px',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.25,
          marginBottom: '16px'
        }}
      >
        {milestone.title}
      </h3>

      {/* Completion Status & Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          background: isCompleted ? 'rgba(255, 106, 0, 0.1)' : 'rgba(25, 23, 21, 0.8)',
          border: isCompleted
            ? '1px solid var(--accent-orange)'
            : '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LumiMascot
            state={isCompleted ? 'celebrate' : 'working'}
            size={42}
            interactive={false}
            ariaLabel={isCompleted ? 'Lumi celebrating milestone completion' : 'Lumi in working state'}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: isCompleted ? '#fff' : 'var(--text-secondary)'
              }}
            >
              {isCompleted ? 'MILESTONE COMPLETED' : 'MILESTONE IN PROGRESS'}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--text-muted)' }}>
              {isCompleted ? 'Evidence verified in portfolio' : 'Click right button to mark complete'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleComplete(milestone.id)}
          className={`tech-btn ${isCompleted ? '' : 'primary'} sm`}
        >
          {isCompleted ? 'MARK PENDING' : 'MARK COMPLETE'}
        </button>
      </div>

      {/* Skills Covered */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}
        >
          COMPETENCIES COVERED:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {milestone.skills?.map((sk) => (
            <span
              key={sk}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10.5px',
                padding: '4px 8px',
                background: 'rgba(25, 24, 22, 0.9)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xs)',
                color: '#fff'
              }}
            >
              {sk}
            </span>
          ))}
        </div>
      </div>

      {/* Practical Task & Deliverable */}
      <div
        style={{
          padding: '14px',
          background: 'rgba(10, 10, 9, 0.7)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--accent-orange)',
            letterSpacing: '0.08em',
            marginBottom: '8px'
          }}
        >
          <Code2 size={13} />
          <span>PRACTICAL TASK & DELIVERABLE</span>
        </div>

        <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.5 }}>
          {milestone.task}
        </p>

        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          <strong style={{ color: '#fff' }}>Deliverable:</strong> {milestone.deliverable}
        </div>
      </div>

      {/* Suggested GitHub Portfolio Evidence */}
      {milestone.githubEvidence && (
        <div
          style={{
            padding: '14px',
            background: 'rgba(10, 10, 9, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '20px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--accent-orange)',
              letterSpacing: '0.08em',
              marginBottom: '8px'
            }}
          >
            <GithubIcon size={13} />
            <span>PORTFOLIO EVIDENCE BLUEPRINT</span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '4px'
            }}
          >
            github.com/profile/{milestone.githubEvidence.repoName}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: 1.4 }}>
            {milestone.githubEvidence.description}
          </p>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              background: 'rgba(20, 19, 17, 0.9)',
              padding: '8px 10px',
              borderRadius: 'var(--radius-xs)',
              border: '1px dashed var(--border-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            README Evidence: {milestone.githubEvidence.readmeSnippet}
          </div>
        </div>
      )}

      {/* Interview Prep Questions */}
      {milestone.interviewPrep?.length > 0 && (
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}
          >
            <HelpCircle size={13} style={{ color: 'var(--accent-orange)' }} />
            <span>TARGET TECHNICAL INTERVIEW QUESTIONS:</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {milestone.interviewPrep.map((q, qIdx) => (
              <div
                key={qIdx}
                style={{
                  fontSize: '11.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  padding: '8px 10px',
                  background: 'rgba(18, 17, 15, 0.5)',
                  borderRadius: 'var(--radius-xs)',
                  borderLeft: '2px solid var(--accent-orange)'
                }}
              >
                {q}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
