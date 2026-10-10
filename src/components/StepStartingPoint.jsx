import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  DollarSign,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  HelpCircle
} from 'lucide-react';
import { getSuggestedSkillsForRole } from '../data/careerData';
import LumiMascot from './LumiMascot';

const STUDY_HOUR_OPTIONS = [
  { hours: 10, label: '10 hrs / week', subtitle: 'Light (Steady progress)' },
  { hours: 15, label: '15 hrs / week', subtitle: 'Moderate (Balanced)' },
  { hours: 20, label: '20 hrs / week', subtitle: 'Recommended (Fast-track)' },
  { hours: 30, label: '30+ hrs / week', subtitle: 'Intensive (Full commitment)' }
];

const BUDGET_OPTIONS = [
  { amount: 0, label: '₹0 (Free Only)', subtitle: 'Open source & public docs' },
  { amount: 5000, label: '₹5,000', subtitle: 'Targeted course / books' },
  { amount: 15000, label: '₹15,000', subtitle: 'Certification & labs' },
  { amount: 50000, label: '₹50,000+', subtitle: 'Full curriculum & test servers' }
];

export default function StepStartingPoint({
  targetRole,
  currentSkills = [],
  onToggleSkill,
  onAddCustomSkill,
  onRemoveSkill,
  completedSkills = [],
  onAddCompletedSkill,
  onRemoveCompletedSkill,
  weeklyHours = 20,
  onChangeWeeklyHours,
  budgetInr = 5000,
  onChangeBudgetInr,
  onGenerateRoadmap,
  isLoadingRoadmap = false,
  roadmapError = null,
  onPrevStep,
  onUseDemoFallback
}) {
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [completedSkillInput, setCompletedSkillInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Suggested skills for the active target role
  const suggestedSkills = getSuggestedSkillsForRole(targetRole?.title || '');

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const skillName = customSkillInput.trim();
    onAddCustomSkill(skillName);
    setCustomSkillInput('');
  };

  const handleAddCompletedSkill = (e) => {
    e.preventDefault();
    if (!completedSkillInput.trim()) return;
    const skillName = completedSkillInput.trim();
    onAddCompletedSkill(skillName);
    setCompletedSkillInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!targetRole?.title || targetRole.title.trim().length < 2) {
      setValidationError('Please choose a target role in Step 1 first.');
      return;
    }

    if (weeklyHours <= 0) {
      setValidationError('Please select a valid number of weekly study hours.');
      return;
    }

    onGenerateRoadmap({
      targetRole: targetRole.title,
      weeklyHours,
      budgetInr
    });
  };

  return (
    <section
      aria-label="Step 2: Map Your Starting Point"
      style={{
        padding: 'clamp(28px, 4vw, 56px) 0',
        minHeight: 'calc(100vh - 160px)'
      }}
    >
      <div className="tech-container" style={{ maxWidth: '880px', margin: '0 auto' }}>
        
        {/* Navigation Breadcrumb / Target Role Recall */}
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
            <span>Change Target Role</span>
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
            <strong style={{ color: 'var(--accent-orange)' }}>{targetRole?.title || 'AI Engineer'}</strong>
          </div>
        </div>

        {/* Section Header */}
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
            <span>STAGE 02 // MAP YOUR STARTING POINT</span>
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
            Where are you starting from?
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            To personalize your path, tell us what you already know, your available weekly hours,
            and your budget. RouteForge will skip redundant concepts and sequence what you actually need.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Card 1: Current Skills */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              marginBottom: '24px'
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px'
                }}
              >
                <label
                  htmlFor="custom-skill-input"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em'
                  }}
                >
                  1. YOUR CURRENT SKILLS
                </label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--accent-orange)' }}>
                  {currentSkills.length} selected
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Why this matters:</strong> Skills you select are marked as already completed,
                so your roadmap starts with the immediate next gaps instead of beginner basics.
              </p>
            </div>

            {/* Suggested Skills Chips */}
            <div style={{ marginBottom: '18px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  marginBottom: '8px'
                }}
              >
                CLICK SKILLS YOU ALREADY KNOW:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {suggestedSkills.map((skill) => {
                  const isChecked = currentSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => onToggleSkill(skill)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: isChecked ? 'rgba(255, 106, 0, 0.15)' : 'rgba(25, 23, 21, 0.7)',
                        border: isChecked ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        color: isChecked ? '#fff' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isChecked ? (
                        <Check size={12} style={{ color: 'var(--accent-orange)' }} />
                      ) : (
                        <Plus size={12} style={{ color: 'var(--text-muted)' }} />
                      )}
                      <span>{skill}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                id="custom-skill-input"
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add another skill you know (e.g. AWS, C++, GraphQL...)"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  background: 'rgba(20, 19, 17, 0.9)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-xs)',
                  color: '#fff',
                  fontSize: '12.5px',
                  outline: 'none'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomSkill(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                disabled={!customSkillInput.trim()}
                className="tech-btn sm"
                style={{ opacity: customSkillInput.trim() ? 1 : 0.6 }}
              >
                Add Skill
              </button>
            </div>

            {/* Display custom added skills */}
            {currentSkills.filter((s) => !suggestedSkills.includes(s)).length > 0 && (
              <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {currentSkills
                  .filter((s) => !suggestedSkills.includes(s))
                  .map((customSkill) => (
                    <span
                      key={customSkill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        background: 'rgba(255, 106, 0, 0.1)',
                        border: '1px solid var(--accent-orange)',
                        borderRadius: 'var(--radius-xs)',
                        color: '#fff',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {customSkill}
                      <button
                        type="button"
                        onClick={() => onRemoveSkill(customSkill)}
                        style={{ background: 'none', border: 'none', color: '#ff7d1a', cursor: 'pointer', padding: 0 }}
                        aria-label={`Remove ${customSkill}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Card 2: Weekly Study Hours */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              marginBottom: '24px'
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}
              >
                <Clock size={15} style={{ color: 'var(--accent-orange)' }} />
                <label
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em'
                  }}
                >
                  2. WEEKLY STUDY COMMITMENT
                </label>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Why this matters:</strong> Sets realistic completion timelines and paces
                how many milestones are assigned per phase.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '10px'
              }}
            >
              {STUDY_HOUR_OPTIONS.map((opt) => {
                const isSelected = weeklyHours === opt.hours;
                return (
                  <button
                    key={opt.hours}
                    type="button"
                    onClick={() => onChangeWeeklyHours(opt.hours)}
                    style={{
                      padding: '14px',
                      background: isSelected ? 'rgba(255, 106, 0, 0.12)' : 'rgba(25, 23, 21, 0.7)',
                      border: isSelected ? '1.5px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--accent-orange)' : '#fff',
                        marginBottom: '3px'
                      }}
                    >
                      {opt.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {opt.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 3: Learning Budget */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              marginBottom: '24px'
            }}
          >
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}
              >
                <DollarSign size={15} style={{ color: 'var(--accent-orange)' }} />
                <label
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em'
                  }}
                >
                  3. AVAILABLE LEARNING BUDGET
                </label>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <strong>Why this matters:</strong> Informs whether routes prioritize free documentation
                and open-source projects or include premium courses and industry certifications.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '10px'
              }}
            >
              {BUDGET_OPTIONS.map((b) => {
                const isSelected = budgetInr === b.amount;
                return (
                  <button
                    key={b.amount}
                    type="button"
                    onClick={() => onChangeBudgetInr(b.amount)}
                    style={{
                      padding: '14px',
                      background: isSelected ? 'rgba(255, 106, 0, 0.12)' : 'rgba(25, 23, 21, 0.7)',
                      border: isSelected ? '1.5px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--accent-orange)' : '#fff',
                        marginBottom: '3px'
                      }}
                    >
                      {b.label}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {b.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional / Collapsible: Completed Skills or Certifications */}
          <div
            style={{
              background: 'rgba(15, 14, 13, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 24px',
              marginBottom: '32px'
            }}
          >
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                padding: 0
              }}
            >
              <span>+ OPTIONAL: PREVIOUS CERTIFICATIONS OR PORTFOLIO PROJECTS ({completedSkills.length})</span>
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAdvanced && (
              <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Add any completed university courses, past portfolio repositories, or industry certifications:
                </p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={completedSkillInput}
                    onChange={(e) => setCompletedSkillInput(e.target.value)}
                    placeholder="e.g. AWS Certified Cloud Practitioner, CS50, GitHub repo..."
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      background: 'rgba(20, 19, 17, 0.9)',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-xs)',
                      color: '#fff',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCompletedSkill(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCompletedSkill}
                    disabled={!completedSkillInput.trim()}
                    className="tech-btn sm"
                  >
                    Add
                  </button>
                </div>

                {completedSkills.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {completedSkills.map((item) => (
                      <span
                        key={item}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 8px',
                          background: 'rgba(0, 255, 136, 0.08)',
                          border: '1px solid rgba(0, 255, 136, 0.3)',
                          borderRadius: 'var(--radius-xs)',
                          color: '#00ff88',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => onRemoveCompletedSkill(item)}
                          style={{ background: 'none', border: 'none', color: '#00ff88', cursor: 'pointer', padding: 0 }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'rgba(255, 75, 75, 0.1)',
                border: '1px solid rgba(255, 75, 75, 0.4)',
                borderRadius: 'var(--radius-xs)',
                color: '#ff6666',
                fontSize: '12.5px',
                marginBottom: '20px'
              }}
            >
              <AlertTriangle size={16} />
              <span>{validationError}</span>
            </div>
          )}

          {/* Backend Error Banner with Recovery Actions */}
          {roadmapError && (
            <div
              style={{
                padding: '16px 20px',
                background: 'rgba(255, 106, 0, 0.08)',
                border: '1.5px solid var(--accent-orange)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-orange)', marginBottom: '8px' }}>
                <AlertTriangle size={16} />
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  ROADMAP GENERATION NOTICE
                </strong>
              </div>
              <p style={{ fontSize: '13px', color: '#fff', marginBottom: '14px', lineHeight: 1.45 }}>
                {roadmapError}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={isLoadingRoadmap}
                  className="tech-btn primary sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <RotateCcw size={13} />
                  <span>Retry AI Generation</span>
                </button>
                {onUseDemoFallback && (
                  <button
                    type="button"
                    onClick={onUseDemoFallback}
                    className="tech-btn sm"
                    style={{ borderColor: 'rgba(255, 106, 0, 0.5)' }}
                  >
                    <span>Load Demo Sample Roadmap</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Primary Action Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 24px',
              background: 'rgba(25, 23, 21, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-orange)',
                  marginBottom: '2px'
                }}
              >
                READY TO REVERSE-ENGINEER
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Target: <strong>{targetRole?.title}</strong> • {weeklyHours}h/week • ₹{budgetInr.toLocaleString()}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingRoadmap}
              className="tech-btn primary"
              style={{
                padding: '14px 36px',
                fontSize: '14.5px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                opacity: isLoadingRoadmap ? 0.75 : 1,
                cursor: isLoadingRoadmap ? 'wait' : 'pointer'
              }}
            >
              {isLoadingRoadmap ? (
                <>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(0,0,0,0.3)',
                      borderTopColor: '#000',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite'
                    }}
                  />
                  <span>Synthesizing 3 Routes with Gemini...</span>
                </>
              ) : (
                <>
                  <span>Generate My Roadmap</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
