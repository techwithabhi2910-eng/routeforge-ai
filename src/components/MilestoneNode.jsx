import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CheckCircle2, Clock, CircleDot, ArrowRight, GitCommit } from 'lucide-react';

export default function MilestoneNode({ data, selected }) {
  const { code, title, phase, status, skills, onToggleComplete } = data;

  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  return (
    <div
      style={{
        width: '240px',
        background: isCompleted
          ? 'rgba(16, 15, 13, 0.98)'
          : isActive
          ? 'rgba(20, 18, 15, 0.98)'
          : 'rgba(12, 11, 10, 0.95)',
        border: selected
          ? '1.5px solid var(--accent-orange)'
          : isActive
          ? '1.5px solid rgba(255, 106, 0, 0.7)'
          : isCompleted
          ? '1px solid rgba(255, 106, 0, 0.4)'
          : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)',
        padding: '14px',
        boxShadow: selected || isActive
          ? '0 0 25px rgba(255, 106, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.8)'
          : '0 8px 20px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        transition: 'all var(--transition-fast)',
        cursor: 'pointer'
      }}
      className="milestone-custom-node"
    >
      {/* React Flow Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: isCompleted ? 'var(--accent-orange)' : 'rgba(220, 210, 195, 0.4)',
          border: '2px solid #080808'
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: isCompleted ? 'var(--accent-orange)' : 'rgba(220, 210, 195, 0.4)',
          border: '2px solid #080808'
        }}
      />

      {/* Top Meta Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9.5px',
            fontWeight: 700,
            color: isActive ? 'var(--accent-orange)' : isCompleted ? '#fff' : 'var(--text-muted)',
            letterSpacing: '0.1em'
          }}
        >
          {code}
        </span>

        {/* Status Pill */}
        <span
          className={`tech-tag ${isCompleted ? 'active' : isActive ? 'orange' : ''}`}
          style={{ fontSize: '8px', padding: '2px 6px' }}
        >
          {isCompleted ? 'COMPLETED' : isActive ? 'ACTIVE' : 'UPCOMING'}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: '13.5px',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.3,
          marginBottom: '6px'
        }}
      >
        {title}
      </div>

      {/* Phase */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--text-muted)',
          marginBottom: '10px'
        }}
      >
        {phase}
      </div>

      {/* Skills Snippet */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
        {skills?.slice(0, 2).map((sk) => (
          <span
            key={sk}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              padding: '2px 5px',
              background: 'rgba(25, 23, 21, 0.8)',
              borderRadius: '2px',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {sk}
          </span>
        ))}
        {skills?.length > 2 && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '8px',
              color: 'var(--text-muted)',
              padding: '2px'
            }}
          >
            +{skills.length - 2}
          </span>
        )}
      </div>

      {/* Action / Click Hint */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '6px',
          marginTop: '6px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '8px',
            color: 'var(--text-muted)'
          }}
        >
          INSPECT DETAILS
        </span>

        <ArrowRight size={10} style={{ color: 'var(--accent-orange)' }} />
      </div>
    </div>
  );
}
