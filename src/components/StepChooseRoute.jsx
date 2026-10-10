import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  DollarSign,
  FolderGit2,
  Check,
  Clock,
  Sparkles,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ROUTE_CONFIGS } from '../data/careerData';
import LumiMascot from './LumiMascot';

const ROUTE_ICONS = {
  'fastest': Zap,
  'budget-friendly': DollarSign,
  'portfolio-first': FolderGit2
};

export default function StepChooseRoute({
  selectedRouteId = 'fastest',
  onSelectRoute,
  onProceedToRoadmap,
  onPrevStep,
  routeConfigs = ROUTE_CONFIGS,
  allRouteMilestones = {},
  isLiveGenerated = false,
  roadmapNote = '',
  targetRole
}) {
  const routes = Object.values(routeConfigs);

  const handleChoose = (routeId) => {
    onSelectRoute(routeId);
    onProceedToRoadmap(routeId);
  };

  return (
    <section
      aria-label="Step 4: Choose Your Route"
      style={{
        padding: 'clamp(28px, 4vw, 56px) 0',
        minHeight: 'calc(100vh - 160px)'
      }}
    >
      <div className="tech-container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        
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
            <span>Back to Skill Gap</span>
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
            <span>Target:</span>
            <strong style={{ color: 'var(--accent-orange)' }}>{targetRole?.title || 'Target Role'}</strong>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
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
            <span>STAGE 04 // CHOOSE YOUR ROUTE</span>
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
                LIVE SYNTHESIS
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
            Three routes. <span className="text-orange">One destination.</span>
          </h2>

          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '720px' }}>
            Choose the learning strategy that best matches your personal priorities, budget, and learning style.
            All three routes lead to competency for <strong>{targetRole?.title}</strong>, but sequence the milestones differently.
          </p>

          {roadmapNote && (
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                background: 'rgba(255, 106, 0, 0.08)',
                borderLeft: '3px solid var(--accent-orange)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-primary)',
                lineHeight: 1.45
              }}
            >
              <strong style={{ color: 'var(--accent-orange)' }}>// AI NOTE:</strong> {roadmapNote}
            </div>
          )}
        </div>

        {/* 3 Visually Consistent Comparison Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {routes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            const Icon = ROUTE_ICONS[route.id] || Zap;
            const milestonesList = allRouteMilestones[route.id] || [];
            const milestoneCount = milestonesList.length || route.milestonesCount || 6;

            return (
              <div
                key={route.id}
                style={{
                  background: isSelected
                    ? 'rgba(255, 106, 0, 0.08)'
                    : 'rgba(15, 14, 13, 0.9)',
                  border: isSelected
                    ? '2px solid var(--accent-orange)'
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '26px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--accent-orange)' : 'var(--text-muted)',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {route.badge}
                    </span>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-xs)',
                        background: isSelected ? 'rgba(255, 106, 0, 0.2)' : 'rgba(25, 23, 21, 0.8)',
                        border: isSelected ? '1px solid var(--accent-orange)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'var(--accent-orange)' : 'var(--text-secondary)'
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Route Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#fff',
                      marginBottom: '8px',
                      lineHeight: 1.2
                    }}
                  >
                    {route.name}
                  </h3>

                  {/* Plain Language Subtitle */}
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '20px'
                    }}
                  >
                    {route.subtitle}
                  </p>

                  {/* Metrics Strip */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(20, 19, 17, 0.7)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '20px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px'
                    }}
                  >
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '9px', marginBottom: '2px' }}>
                        DURATION
                      </div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>
                        {route.estimatedDuration || '16 Weeks'}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '9px', marginBottom: '2px' }}>
                        COST
                      </div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>
                        {route.costRating?.includes('$0') || route.costRating?.includes('₹0') ? 'Free / ₹0' : 'Budget-Aligned'}
                      </div>
                    </div>
                    <div style={{ gridColumn: 'span 2', paddingTop: '6px', borderTop: '1px solid rgba(220, 210, 195, 0.08)' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '9px', marginBottom: '2px' }}>
                        KEY MILESTONES
                      </div>
                      <div style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>
                        {milestoneCount} Sequential Milestones
                      </div>
                    </div>
                  </div>

                  {/* Strategy Description */}
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                        marginBottom: '4px'
                      }}
                    >
                      MAIN STRATEGY:
                    </div>
                    <p style={{ fontSize: '12px', color: '#fff', lineHeight: 1.45 }}>
                      {route.focus || 'Focuses on critical skills and production-grade deliverables.'}
                    </p>
                  </div>

                  {/* Trade-Off Description in Plain Language */}
                  <div style={{ marginBottom: '24px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9.5px',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.06em',
                        marginBottom: '4px'
                      }}
                    >
                      TRADE-OFF:
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {route.id === 'fastest'
                        ? 'Concentrated pace; prioritizes high-yield skills with less time spent on tangential electives.'
                        : route.id === 'budget-friendly'
                        ? 'Zero out-of-pocket spend; relies on self-directed curation of open documentation.'
                        : 'Demands extra effort documenting code, writing tests, and publishing public deliverables.'}
                    </p>
                  </div>
                </div>

                {/* Single Primary Action per Card */}
                <button
                  type="button"
                  onClick={() => handleChoose(route.id)}
                  className={`tech-btn ${isSelected ? 'primary' : ''}`}
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{isSelected ? 'Continue with This Route' : 'Choose This Route'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Note on Switchability */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)'
          }}
        >
          // Note: You can switch between routes at any time in Step 5 without regenerating.
        </div>

      </div>
    </section>
  );
}
