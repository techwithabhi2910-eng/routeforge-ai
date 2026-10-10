import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import MilestoneNode from './MilestoneNode';
import MilestoneInspector from './MilestoneInspector';
import { Layers, Maximize2, RotateCcw, ListFilter, Network } from 'lucide-react';
import { ROUTE_CONFIGS } from '../data/careerData';

const nodeTypes = {
  milestoneNode: MilestoneNode
};

export default function BuildSection({
  selectedRouteId,
  milestones,
  onToggleMilestoneComplete,
  routeConfigs = ROUTE_CONFIGS,
  customEdges,
  isLiveGenerated = false,
  roadmapNote = ''
}) {
  const currentRoute = routeConfigs[selectedRouteId] || ROUTE_CONFIGS[selectedRouteId] || ROUTE_CONFIGS['fastest'];
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(milestones[0]?.id || null);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'timeline'

  // Build ReactFlow Nodes
  const initialNodes = useMemo(() => {
    return milestones.map((m) => ({
      id: m.id,
      type: 'milestoneNode',
      position: m.position,
      data: {
        ...m,
        onToggleComplete: onToggleMilestoneComplete
      }
    }));
  }, [milestones, onToggleMilestoneComplete]);

  // Build ReactFlow Edges (supports custom backend edges or linear fallback)
  const initialEdges = useMemo(() => {
    if (customEdges && customEdges.length > 0) {
      return customEdges.map((e) => {
        const sourceNode = milestones.find((m) => m.id === e.source);
        const isSourceDone = sourceNode?.status === 'completed';
        const isSourceActive = sourceNode?.status === 'active';

        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: isSourceDone || isSourceActive,
          style: {
            stroke: isSourceDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.25)',
            strokeWidth: isSourceDone ? 2 : 1.5,
            strokeDasharray: isSourceDone ? 'none' : '4, 4'
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: isSourceDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.4)',
            width: 14,
            height: 14
          }
        };
      });
    }

    const edges = [];
    for (let i = 0; i < milestones.length - 1; i++) {
      const source = milestones[i];
      const target = milestones[i + 1];
      const isSourceDone = source.status === 'completed';

      edges.push({
        id: `e-${source.id}-${target.id}`,
        source: source.id,
        target: target.id,
        animated: isSourceDone || source.status === 'active',
        style: {
          stroke: isSourceDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.25)',
          strokeWidth: isSourceDone ? 2 : 1.5,
          strokeDasharray: isSourceDone ? 'none' : '4, 4'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: isSourceDone ? '#ff6a00' : 'rgba(220, 210, 195, 0.4)',
          width: 14,
          height: 14
        }
      });
    }
    return edges;
  }, [milestones, customEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync nodes & edges when milestones or route change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    if (!milestones.find((m) => m.id === selectedMilestoneId)) {
      setSelectedMilestoneId(milestones[0]?.id || null);
    }
  }, [initialNodes, initialEdges, milestones]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedMilestoneId(node.id);
  }, []);

  const activeMilestone = useMemo(() => {
    return milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];
  }, [milestones, selectedMilestoneId]);

  return (
    <section
      id="section-build"
      style={{
        position: 'relative',
        padding: '100px 0',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-base)'
      }}
    >
      <div className="tech-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '40px'
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: 'var(--text-secondary)',
                marginBottom: '16px'
              }}
            >
              <span style={{ color: 'var(--accent-orange)' }}>//</span>
              <span>SECTION 04 — INTERACTIVE FORGE GRAPH</span>
              {isLiveGenerated && (
                <span
                  className="tech-tag active"
                  style={{ fontSize: '8.5px', padding: '1px 6px', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.4)' }}
                >
                  LIVE GEMINI DAG
                </span>
              )}
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(32px, 4.2vw, 54px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: '#fff',
                marginBottom: '18px'
              }}
            >
              TURN THE GOAL INTO <span className="text-orange">MILESTONES.</span>
            </h2>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)'
              }}
            >
              An interactive DAG milestone graph for the{' '}
              <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>
                {currentRoute.name}
              </span>
              . Click any node to inspect project deliverables, verified GitHub evidence blueprints, and interview preparation questions.
            </p>
          </div>

          {/* View Mode Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-surface)',
              padding: '4px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xs)'
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('graph')}
              className={`tech-btn sm ${viewMode === 'graph' ? 'primary' : ''}`}
              style={{ gap: '6px' }}
            >
              <Network size={12} />
              <span>DAG GRAPH</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`tech-btn sm ${viewMode === 'timeline' ? 'primary' : ''}`}
              style={{ gap: '6px' }}
            >
              <ListFilter size={12} />
              <span>TIMELINE VIEW</span>
            </button>
          </div>
        </div>

        {/* Main Stage: Graph + Inspector Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(360px, 0.9fr)',
            gap: '24px',
            alignItems: 'stretch'
          }}
          className="build-split-grid"
        >
          {/* Graph View Canvas */}
          {viewMode === 'graph' ? (
            <div
              className="tech-panel tech-corner-box"
              style={{
                height: '620px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                background: '#090807'
              }}
            >
              {/* Canvas Overlay Header */}
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '16px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em'
                  }}
                >
                  ROADMAP GRAPH // {currentRoute.badge}
                </span>

                <span
                  className="tech-tag"
                  style={{ fontSize: '9px', padding: '2px 6px', pointerEvents: 'auto' }}
                >
                  PAN & ZOOM ACTIVE
                </span>
              </div>

              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.4}
                maxZoom={1.5}
                attributionPosition="bottom-left"
              >
                <Background color="rgba(220, 210, 195, 0.08)" gap={24} size={1} />
                <Controls
                  showInteractive={false}
                  style={{
                    bottom: '16px',
                    right: '16px',
                    left: 'auto'
                  }}
                />
              </ReactFlow>
            </div>
          ) : (
            /* Timeline / List Alternative View */
            <div
              className="tech-panel"
              style={{
                height: '620px',
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {milestones.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMilestoneId(m.id)}
                  style={{
                    padding: '16px',
                    background:
                      selectedMilestoneId === m.id
                        ? 'rgba(255, 106, 0, 0.1)'
                        : 'rgba(18, 17, 15, 0.6)',
                    border:
                      selectedMilestoneId === m.id
                        ? '1.5px solid var(--accent-orange)'
                        : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--accent-orange)',
                          fontWeight: 700
                        }}
                      >
                        {m.code}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-editorial)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#fff'
                        }}
                      >
                        {m.title}
                      </span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', color: 'var(--text-muted)' }}>
                      {m.phase} • {m.skills?.join(', ')}
                    </div>
                  </div>

                  <span
                    className={`tech-tag ${m.status === 'completed' ? 'active' : m.status === 'active' ? 'orange' : ''}`}
                    style={{ fontSize: '9px' }}
                  >
                    {m.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Right Column: Milestone Detail Inspector */}
          <div style={{ height: '620px' }}>
            <MilestoneInspector
              milestone={activeMilestone}
              onClose={() => {}}
              onToggleComplete={onToggleMilestoneComplete}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .build-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
