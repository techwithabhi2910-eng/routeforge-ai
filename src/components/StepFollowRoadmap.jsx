import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  ArrowLeft,
  ChevronRight,
  Network,
  ListFilter,
  Check
} from 'lucide-react';

import MilestoneNode from './MilestoneNode';
import MilestoneInspector from './MilestoneInspector';
import { ROUTE_CONFIGS } from '../data/careerData';

const nodeTypes = {
  milestoneNode: MilestoneNode
};

export default function StepFollowRoadmap({
  targetRole,
  selectedRouteId = 'fastest',
  onSelectRoute,
  milestones = [],
  onToggleMilestoneComplete,
  routeConfigs = ROUTE_CONFIGS,
  customEdges = [],
  onGoToChooseRoute,
  onGoToStartingPoint,
  isLiveGenerated = false,
  roadmapNote = ''
}) {
  const currentRoute = routeConfigs[selectedRouteId] || ROUTE_CONFIGS[selectedRouteId] || ROUTE_CONFIGS['fastest'];
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(milestones[0]?.id || null);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'timeline'

  // Selected milestone object
  const activeMilestone = useMemo(() => {
    return milestones.find((m) => m.id === selectedMilestoneId) || milestones[0] || null;
  }, [milestones, selectedMilestoneId]);

  // Calculate overall milestone progress
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const totalCount = milestones.length;
  const progressPercent = Math.round((completedCount / Math.max(1, totalCount)) * 100);

  // Next pending milestone
  const nextPendingMilestone = useMemo(() => {
    return milestones.find((m) => m.status !== 'completed') || null;
  }, [milestones]);

  // ReactFlow Nodes
  const flowNodes = useMemo(() => {
    return milestones.map((m, index) => {
      // Ensure proper staggered DAG layout if needed
      const position = m.position || {
        x: 50 + index * 280,
        y: 80 + (index % 2 === 1 ? 60 : 0)
      };

      return {
        id: m.id,
        type: 'milestoneNode',
        position,
        data: {
          ...m,
          onToggleComplete: onToggleMilestoneComplete
        }
      };
    });
  }, [milestones, onToggleMilestoneComplete]);

  // ReactFlow Edges
  const flowEdges = useMemo(() => {
    if (customEdges && customEdges.length > 0) {
      return customEdges.map((e) => {
        const sourceNode = milestones.find((m) => m.id === e.source);
        const isDone = sourceNode?.status === 'completed';

        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: isDone || sourceNode?.status === 'active',
          style: {
            stroke: isDone ? 'var(--accent-orange)' : 'rgba(220, 210, 195, 0.25)',
            strokeWidth: isDone ? 2 : 1.5,
            strokeDasharray: isDone ? 'none' : '4, 4'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.4)',
            width: 14,
            height: 14
          }
        };
      });
    }

    // Default sequential edges
    const edges = [];
    for (let i = 0; i < milestones.length - 1; i++) {
      const src = milestones[i];
      const tgt = milestones[i + 1];
      const isDone = src.status === 'completed';

      edges.push({
        id: `e-${src.id}-${tgt.id}`,
        source: src.id,
        target: tgt.id,
        animated: isDone || src.status === 'active',
        style: {
          stroke: isDone ? 'var(--accent-orange)' : 'rgba(220, 210, 195, 0.25)',
          strokeWidth: isDone ? 2 : 1.5,
          strokeDasharray: isDone ? 'none' : '4, 4'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.4)',
          width: 14,
          height: 14
        }
      });
    }
    return edges;
  }, [milestones, customEdges]);

  const handleNodeClick = useCallback((event, node) => {
    setSelectedMilestoneId(node.id);
  }, []);

  const handleViewNext = () => {
    if (nextPendingMilestone) {
      setSelectedMilestoneId(nextPendingMilestone.id);
    }
  };

  return (
    <section
      aria-label="Step 5: Follow Your Roadmap"
      style={{
        padding: 'clamp(24px, 3.5vw, 48px) 0',
        minHeight: 'calc(100vh - 160px)'
      }}
    >
      <div className="tech-container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Navigation Bar & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onGoToChooseRoute}
              className="tech-btn sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={13} />
              <span>Change Route Strategy</span>
            </button>
            <button
              type="button"
              onClick={onGoToStartingPoint}
              className="tech-btn sm"
            >
              <span>Revise Starting Point</span>
            </button>
          </div>

          {/* Quick Route Switcher Pills */}
          <div
            style={{
              display: 'inline-flex',
              padding: '3px',
              background: 'rgba(25, 23, 21, 0.9)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)',
              gap: '4px'
            }}
          >
            {Object.values(routeConfigs).map((r) => {
              const isActive = selectedRouteId === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectRoute(r.id)}
                  style={{
                    padding: '5px 12px',
                    background: isActive ? 'var(--accent-orange)' : 'transparent',
                    color: isActive ? '#000' : 'var(--text-secondary)',
                    border: 'none',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {r.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Roadmap Header & Progress Bar */}
        <div
          style={{
            background: 'rgba(15, 14, 13, 0.9)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 24px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: 'var(--accent-orange)',
                  marginBottom: '4px'
                }}
              >
                <span>STAGE 05 // FOLLOW YOUR ROADMAP</span>
                <span>•</span>
                <span style={{ color: '#fff' }}>{currentRoute.name.toUpperCase()}</span>
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2
                }}
              >
                {targetRole?.title} Roadmap
              </h2>
            </div>

            {/* View Mode Switcher: Graph vs Timeline */}
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(25, 23, 21, 0.8)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)',
                padding: '2px'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('graph')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: viewMode === 'graph' ? 'rgba(255, 106, 0, 0.2)' : 'transparent',
                  color: viewMode === 'graph' ? 'var(--accent-orange)' : 'var(--text-muted)',
                  border: viewMode === 'graph' ? '1px solid var(--accent-orange)' : '1px solid transparent',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Network size={13} />
                <span>Interactive Graph</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  background: viewMode === 'timeline' ? 'rgba(255, 106, 0, 0.2)' : 'transparent',
                  color: viewMode === 'timeline' ? 'var(--accent-orange)' : 'var(--text-muted)',
                  border: viewMode === 'timeline' ? '1px solid var(--accent-orange)' : '1px solid transparent',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ListFilter size={13} />
                <span>Timeline Checklist</span>
              </button>
            </div>
          </div>

          {/* Progress Bar & Next Action */}
          <div style={{ marginTop: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                marginBottom: '6px'
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>
                Milestone Progress: <strong style={{ color: '#fff' }}>{completedCount} of {totalCount} Completed</strong> ({progressPercent}%)
              </span>
              {nextPendingMilestone && (
                <button
                  type="button"
                  onClick={handleViewNext}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-orange)',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Focus Next: {nextPendingMilestone.title}</span>
                  <ChevronRight size={12} />
                </button>
              )}
            </div>

            {/* Progress track */}
            <div
              style={{
                height: '6px',
                background: 'rgba(220, 210, 195, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #ff6a00, #00ff88)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {viewMode === 'graph' ? (
          /* Graph View: ReactFlow Canvas on left + Milestone Inspector on right */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: selectedMilestoneId ? 'minmax(0, 1fr) 380px' : '1fr',
              gap: '20px',
              minHeight: '620px'
            }}
            className="roadmap-graph-container"
          >
            {/* ReactFlow Interactive Canvas */}
            <div
              style={{
                height: '620px',
                background: 'rgba(10, 10, 9, 0.95)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <ReactFlow
                nodes={flowNodes}
                edges={flowEdges}
                nodeTypes={nodeTypes}
                onNodeClick={handleNodeClick}
                fitView
                fitViewOptions={{ padding: 0.25 }}
                minZoom={0.3}
                maxZoom={1.5}
                attributionPosition="bottom-left"
              >
                <Background color="rgba(255, 106, 0, 0.08)" gap={24} size={1} />
                <Controls
                  style={{
                    background: 'rgba(20, 19, 18, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    color: '#fff'
                  }}
                />
                <MiniMap
                  nodeColor={(n) => {
                    if (n.data?.status === 'completed') return '#00ff88';
                    if (n.data?.status === 'active') return '#ff6a00';
                    return 'rgba(220, 210, 195, 0.3)';
                  }}
                  style={{
                    background: 'rgba(15, 14, 13, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    height: 100,
                    width: 140
                  }}
                />
              </ReactFlow>

              {/* Canvas helper tip */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '6px 12px',
                  background: 'rgba(15, 14, 13, 0.85)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10.5px',
                  color: 'var(--text-secondary)',
                  pointerEvents: 'none'
                }}
              >
                // Click any node to open deliverables and mark progress
              </div>
            </div>

            {/* Inspector Drawer */}
            {selectedMilestoneId && activeMilestone && (
              <div style={{ height: '620px' }}>
                <MilestoneInspector
                  milestone={activeMilestone}
                  onClose={() => setSelectedMilestoneId(null)}
                  onToggleComplete={onToggleMilestoneComplete}
                />
              </div>
            )}
          </div>
        ) : (
          /* Timeline View: Numbered Milestones List with In-Card Actions */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {milestones.map((milestone, idx) => {
              const isCompleted = milestone.status === 'completed';
              const isSelected = selectedMilestoneId === milestone.id;

              return (
                <div
                  key={milestone.id}
                  style={{
                    background: isSelected
                      ? 'rgba(255, 106, 0, 0.08)'
                      : 'rgba(15, 14, 13, 0.85)',
                    border: isSelected
                      ? '1.5px solid var(--accent-orange)'
                      : isCompleted
                      ? '1px solid rgba(0, 255, 136, 0.3)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px 24px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '14px',
                      marginBottom: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isCompleted
                            ? 'rgba(0, 255, 136, 0.15)'
                            : 'rgba(255, 106, 0, 0.12)',
                          border: isCompleted
                            ? '1px solid #00ff88'
                            : '1px solid var(--accent-orange)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: isCompleted ? '#00ff88' : 'var(--accent-orange)'
                        }}
                      >
                        {isCompleted ? <Check size={16} /> : idx + 1}
                      </div>

                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: isCompleted ? '#00ff88' : 'var(--accent-orange)',
                            letterSpacing: '0.08em',
                            marginBottom: '2px'
                          }}
                        >
                          {milestone.code} // {milestone.phase || `PHASE ${idx + 1}`}
                        </div>
                        <h3
                          style={{
                            fontFamily: 'var(--font-editorial)',
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.2
                          }}
                        >
                          {milestone.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedMilestoneId(milestone.id)}
                        className="tech-btn sm"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleMilestoneComplete(milestone.id)}
                        className={`tech-btn sm ${isCompleted ? '' : 'primary'}`}
                      >
                        {isCompleted ? 'Mark Pending' : 'Mark Complete'}
                      </button>
                    </div>
                  </div>

                  {/* Task & Deliverable Preview */}
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.45 }}>
                    {milestone.task}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <span><strong>Deliverable:</strong> {milestone.deliverable}</span>
                    {milestone.githubEvidence?.repoName && (
                      <span style={{ color: 'var(--accent-orange)' }}>
                        github.com/{milestone.githubEvidence.repoName}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
