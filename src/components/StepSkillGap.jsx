import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Layers,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import LumiMascot from './LumiMascot';

export default function StepSkillGap({
  targetRole,
  currentSkills = [],
  skillCategories = [],
  currentMilestones = [],
  weeklyHours = 20,
  onNextStep,
  onPrevStep,
  isLiveGenerated = false,
  roadmapNote = ''
}) {
  // Extract all required skills from skill categories & milestones
  const allRequiredSkills = [];
  skillCategories.forEach((cat) => {
    cat.skills.forEach((sk) => {
      allRequiredSkills.push(sk.name);
    });
  });

  // Ensure known skills are identified
  const knownSet = new Set(
    currentSkills.map((s) => s.toLowerCase().trim())
  );

  // Group skills into: Already Known, Next to Learn, Later
  const alreadyKnownSkills = [];
  const nextToLearnSkills = [];
  const laterSkills = [];

  // Distribute based on milestones or categories
  if (currentMilestones && currentMilestones.length > 0) {
    currentMilestones.forEach((m, idx) => {
      const skillsInMilestone = m.skills || [m.title];
      skillsInMilestone.forEach((sk) => {
        const isKnown = knownSet.has(sk.toLowerCase().trim()) || m.status === 'completed';
        if (isKnown) {
          if (!alreadyKnownSkills.includes(sk)) alreadyKnownSkills.push(sk);
        } else if (idx < Math.ceil(currentMilestones.length / 2)) {
          if (!nextToLearnSkills.includes(sk)) nextToLearnSkills.push(sk);
        } else {
          if (!laterSkills.includes(sk)) laterSkills.push(sk);
        }
      });
    });
  }

  // Also include any user-selected skills into alreadyKnown
  currentSkills.forEach((sk) => {
    if (!alreadyKnownSkills.includes(sk)) {
      alreadyKnownSkills.push(sk);
    }
  });

  // Fallback defaults if list is small
  if (nextToLearnSkills.length === 0) {
    nextToLearnSkills.push('Foundational Architecture', 'Core Frameworks', 'API Integration');
  }
  if (laterSkills.length === 0) {
    laterSkills.push('Production Deployment', 'System Scaling', 'Portfolio Capstone Showcase');
  }

  const totalEvaluated = alreadyKnownSkills.length + nextToLearnSkills.length + laterSkills.length;
  const curriculumCoveragePct = Math.round((alreadyKnownSkills.length / Math.max(1, totalEvaluated)) * 100);

  // Estimated effort calculated from remaining skills and weekly hours
  const remainingCount = nextToLearnSkills.length + laterSkills.length;
  const estTotalStudyHours = Math.round(remainingCount * 28);
  const estWeeks = Math.max(4, Math.round(estTotalStudyHours / Math.max(1, weeklyHours)));

  return (
    <section
      aria-label="Step 3: Analyze Your Skill Gap"
      style={{
        padding: 'clamp(28px, 4vw, 56px) 0',
        minHeight: 'calc(100vh - 160px)'
      }}
    >
      <div className="tech-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Navigation & Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <button
            type="button"
            onClick={onPrevStep}
            className="tech-btn sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={13} />
            <span>Revise Starting Skills</span>
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)'
            }}
          >
            <span>Destination:</span>
            <strong style={{ color: 'var(--accent-orange)' }}>{targetRole?.title || 'Target Role'}</strong>
          </div>
        </div>

        <div style={{ marginBottom: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'var(--accent-orange)',
              marginBottom: '12px'
            }}
          >
            <span>STAGE 03 // ANALYZE YOUR SKILL GAP</span>
            {isLiveGenerated && (
              <span
                style={{
                  fontSize: '9px',
                  color: '#00ff88',
                  border: '1px solid rgba(0, 255, 136, 0.4)',
                  padding: '1px 6px',
                  borderRadius: '2px'
                }}
              >
                LIVE AI DATA
              </span>
            )}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#fff',
              marginBottom: '12px'
            }}
          >
            Here is the distance to your destination.
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            We compared your current skills against industry requirements for <strong>{targetRole?.title}</strong>.
            Review the competencies you already possess, what you need to master next, and what to tackle later.
          </p>
        </div>

        {/* 4 Clear Grounded Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '12px',
            marginBottom: '32px'
          }}
        >
          {/* Card 1: Already Known */}
          <div
            style={{
              padding: '18px 20px',
              background: 'rgba(0, 255, 136, 0.05)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: '#00ff88',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}
            >
              ALREADY KNOWN
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '26px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}
            >
              {alreadyKnownSkills.length} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>skills</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Verified from your starting inputs
            </div>
          </div>

          {/* Card 2: Next to Learn */}
          <div
            style={{
              padding: '18px 20px',
              background: 'rgba(255, 106, 0, 0.06)',
              border: '1px solid rgba(255, 106, 0, 0.35)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--accent-orange)',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}
            >
              NEXT TO LEARN
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '26px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}
            >
              {nextToLearnSkills.length} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>skills</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Immediate prerequisite gap
            </div>
          </div>

          {/* Card 3: Curriculum Coverage */}
          <div
            style={{
              padding: '18px 20px',
              background: 'rgba(20, 19, 18, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}
            >
              CURRICULUM COVERAGE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '26px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}
            >
              {curriculumCoveragePct}%
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Coverage of role core curriculum
            </div>
          </div>

          {/* Card 4: Estimated Study Timeline */}
          <div
            style={{
              padding: '18px 20px',
              background: 'rgba(20, 19, 18, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                marginBottom: '6px'
              }}
            >
              ESTIMATED DURATION
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '26px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px'
              }}
            >
              ~{estWeeks} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>weeks</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              At {weeklyHours} hours study per week
            </div>
          </div>
        </div>

        {/* 3 Skill Status Columns: Already Known, Next to Learn, Later */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {/* Column 1: Already Known */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.9)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#00ff88',
                  boxShadow: '0 0 6px #00ff88'
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.06em'
                }}
              >
                ALREADY KNOWN ({alreadyKnownSkills.length})
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Concepts you've already verified. We skip redundant beginner lessons for these:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {alreadyKnownSkills.map((sk) => (
                <div
                  key={sk}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: 'rgba(0, 255, 136, 0.04)',
                    border: '1px solid rgba(0, 255, 136, 0.15)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    color: '#fff'
                  }}
                >
                  <CheckCircle2 size={13} style={{ color: '#00ff88', flexShrink: 0 }} />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Next to Learn */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.9)',
              border: '1px solid rgba(255, 106, 0, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent-orange)',
                  boxShadow: '0 0 6px var(--accent-orange)'
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.06em'
                }}
              >
                NEXT TO LEARN ({nextToLearnSkills.length})
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Immediate prerequisites and core competencies to tackle first:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {nextToLearnSkills.map((sk) => (
                <div
                  key={sk}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: 'rgba(255, 106, 0, 0.06)',
                    border: '1px solid rgba(255, 106, 0, 0.25)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    color: '#fff'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-orange)',
                      flexShrink: 0
                    }}
                  />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Later */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.9)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--text-muted)'
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.06em'
                }}
              >
                LATER ({laterSkills.length})
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
              Advanced specialization, capstone projects, and high-scale architecture:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {laterSkills.map((sk) => (
                <div
                  key={sk}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    background: 'rgba(25, 23, 21, 0.6)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11.5px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--text-muted)',
                      flexShrink: 0
                    }}
                  />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prerequisite Sequencing Note */}
        <div
          style={{
            padding: '16px 20px',
            background: 'rgba(25, 23, 21, 0.6)',
            borderLeft: '3px solid var(--accent-orange)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '36px'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              fontWeight: 700,
              color: 'var(--accent-orange)',
              letterSpacing: '0.06em',
              marginBottom: '4px'
            }}
          >
            WHY PREREQUISITE SEQUENCING MATTERS
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Attempting advanced milestones without foundational building blocks causes learning plateaus.
            In the next step, you'll select how you want to sequence these skills: through speed, budget optimization, or heavy portfolio proof.
          </p>
        </div>

        {/* Primary Action Banner */}
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
              NEXT STAGE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '2px'
              }}
            >
              Choose Your Route Strategy
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Compare 3 distinct execution strategies: Fastest Practical, Budget-Friendly, or Portfolio-First.
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
            <span>Compare 3 Route Strategies</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
