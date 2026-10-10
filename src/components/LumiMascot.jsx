import React, { useState, useEffect, useMemo, useCallback, useRef, Component } from 'react';
import { createAvatar } from '@bible-strong/avatar-react';
import './LumiMascot.css';

/**
 * Valid animation keys defined in cubee.avatar.json
 */
const AVAILABLE_ANIMATIONS = [
  'thinking',
  'searching',
  'working',
  'angry',
  'happy',
  'confused',
  'sad',
  'celebrate'
];

/**
 * Valid expression keys defined in cubee.avatar.json
 */
const AVAILABLE_EXPRESSIONS = [
  'neutral',
  'curious-left',
  'upward-side-glance',
  'downward-gaze',
  'skeptical-right',
  'small-attentive',
  'wide-downward-gaze',
  'surprised-left',
  'sleepy-squint',
  'angry-right',
  'asymmetric-down-right',
  'attentive-left',
  'joyful-wide',
  'eyes-closed',
  'joyful-down-right',
  'skeptical-left',
  'far-right-glance',
  'angry-left',
  'playful-right',
  'asymmetric-up-left',
  'gentle-downward-gaze',
  'wide-down-left',
  'surprised-wide-left',
  'drowsy-closed',
  'suspicious-right',
  'shy-downward',
  'angry-brows',
  'uneasy-left'
];

/**
 * Module-level memory cache for the fetched avatar definition and created component
 */
let cachedDefinition = null;
let cachedCreatedComponent = null;
let fetchPromise = null;

function fetchAvatarDefinition(url = '/mascot/cubee.avatar.json') {
  if (cachedDefinition) return Promise.resolve(cachedDefinition);
  if (!fetchPromise) {
    fetchPromise = fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load mascot definition from ${url}: HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        cachedDefinition = data;
        return data;
      })
      .catch((err) => {
        fetchPromise = null;
        throw err;
      });
  }
  return fetchPromise;
}

/**
 * High-fidelity SVG fallback component
 * Based on cubee.avatar.json specs:
 * - Body: capsule (width: 205, height: 270, roundness: 1, color: #e65c5c)
 * - Eyes: left (20x30), right (28x37), spacing: ~16.8, color: #111316
 */
export function LumiSvgFallback({
  state = 'neutral',
  size = 120,
  ariaLabel = 'Lumi AI assistant'
}) {
  const isHappy = state === 'happy' || state === 'celebrate';
  const isThinking = state === 'thinking';
  const isWorking = state === 'working';
  const isCurious = state === 'curious' || state === 'curious-left';

  return (
    <div
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1',
        overflow: 'hidden'
      }}
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        viewBox="0 0 205 270"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          transform: isCurious ? 'rotate(-3deg)' : 'none',
          transition: 'transform 0.3s ease'
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lumiFallbackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f07272" />
            <stop offset="100%" stopColor="#e65c5c" />
          </linearGradient>
          <filter id="lumiSoftShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.4)" />
          </filter>
        </defs>

        {/* Capsule Body */}
        <rect
          x="0"
          y="0"
          width="205"
          height="270"
          rx="102.5"
          ry="102.5"
          fill="url(#lumiFallbackGradient)"
          filter="url(#lumiSoftShadow)"
        />

        {/* Subtle Top-Left Ambient Highlight */}
        <path
          d="M 40 40 Q 102.5 15 165 40 Q 102.5 30 40 40 Z"
          fill="rgba(255, 255, 255, 0.2)"
        />

        {/* Eye Group */}
        <g
          transform={
            isThinking
              ? 'translate(0, -6)'
              : isWorking
              ? 'translate(0, 4)'
              : 'translate(0, 0)'
          }
          style={{ transition: 'transform 0.3s ease' }}
        >
          {isHappy ? (
            /* Joyful Happy Arcs */
            <>
              <path
                d="M 68 132 Q 78 116 88 132"
                stroke="#111316"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 112 132 Q 124 114 136 132"
                stroke="#111316"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            /* Characteristic Asymmetric Dark Eyes */
            <>
              {/* Left Eye: ~20x30 */}
              <ellipse
                cx="78"
                cy="128"
                rx="10"
                ry="15"
                fill="#111316"
              />
              {/* Left Eye Catchlight */}
              <circle cx="76" cy="123" r="3" fill="#ffffff" opacity="0.8" />

              {/* Right Eye: ~28x37 */}
              <ellipse
                cx="124"
                cy="128"
                rx="14"
                ry="18.5"
                fill="#111316"
              />
              {/* Right Eye Catchlight */}
              <circle cx="121" cy="122" r="4" fill="#ffffff" opacity="0.8" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/**
 * Resilient Error Boundary that falls back to SVG if runtime rendering fails
 */
class LumiErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('[LumiMascot] Renderer error caught by boundary, switching to SVG fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <LumiSvgFallback
          state={this.props.state}
          size={this.props.size}
          ariaLabel={this.props.ariaLabel}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * Main Reusable Lumi Mascot Component
 *
 * @param {string} state - Animation/expression state: 'neutral' | 'idle' | 'curious' | 'thinking' | 'searching' | 'working' | 'happy' | 'celebrate' | 'confused' | 'sad' | 'angry'
 * @param {string} animation - Explicit animation key override
 * @param {string} expression - Explicit expression key override
 * @param {number|string} size - Size in pixels or CSS string (default 120, or 42 for compact)
 * @param {boolean} compact - Compact mode for cards and inline telemetry
 * @param {string} speechBubble - Optional text to show in the companion dialogue bubble
 * @param {boolean} showStatusBadge - Whether to display the technical status pill
 * @param {boolean} interactive - Whether hovering and clicking trigger playful reactions
 * @param {boolean} floating - Adds a subtle hovering float animation
 * @param {boolean} useFallback - Force SVG fallback mode
 * @param {object} definition - Custom avatar definition JSON
 * @param {string} avatarUrl - Public URL path to cubee.avatar.json (default '/mascot/cubee.avatar.json')
 * @param {string} ariaLabel - Accessible label (default 'Lumi AI assistant')
 */
export default function LumiMascot({
  state = 'neutral',
  animation,
  expression,
  size,
  compact = false,
  speechBubble,
  showStatusBadge = false,
  interactive = false,
  floating = false,
  useFallback = false,
  definition: propDefinition,
  avatarUrl = '/mascot/cubee.avatar.json',
  className = '',
  style = {},
  ariaLabel = 'Lumi AI assistant',
  onStateChange,
  onClick
}) {
  const [fetchedDefinition, setFetchedDefinition] = useState(() => cachedDefinition);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimerRef = useRef(null);

  // Default size: 42 for compact cards, 120 for normal/hero
  const effectiveSize = size ?? (compact ? 42 : 120);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load avatar definition dynamically from public URL without importing into JS bundle
  useEffect(() => {
    if (propDefinition || cachedDefinition) return;

    let isMounted = true;
    fetchAvatarDefinition(avatarUrl)
      .then((data) => {
        if (isMounted) {
          setFetchedDefinition(data);
          setHasLoadError(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('[LumiMascot] Could not load avatar JSON, using safe SVG fallback:', err.message);
          setHasLoadError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [propDefinition, avatarUrl]);

  // Clean up any hover timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const definition = propDefinition || fetchedDefinition;

  // Compile definition once using createAvatar from @bible-strong/avatar-react
  const CreatedAvatar = useMemo(() => {
    if (!definition) return null;
    if (cachedCreatedComponent && cachedDefinition === definition) {
      return cachedCreatedComponent;
    }
    try {
      const comp = createAvatar(definition);
      if (definition === cachedDefinition) {
        cachedCreatedComponent = comp;
      }
      return comp;
    } catch (err) {
      console.warn('[LumiMascot] createAvatar failed validation, using fallback:', err);
      return null;
    }
  }, [definition]);

  const [prevPropState, setPrevPropState] = useState(state);
  const [interactiveState, setInteractiveState] = useState(null);

  if (state !== prevPropState) {
    setPrevPropState(state);
    setInteractiveState(null);
  }

  // Active state: hover state (if interactive and hovered), interactiveState, or prop state
  const effectiveStateName = useMemo(() => {
    if (interactive && hovered && !interactiveState) {
      return 'curious';
    }
    return interactiveState ?? state;
  }, [interactive, hovered, interactiveState, state]);

  // Determine active animation or expression target (mutually exclusive in @bible-strong/avatar-react)
  const { resolvedAnimation, resolvedExpression } = useMemo(() => {
    // Explicit props override
    if (animation) return { resolvedAnimation: animation, resolvedExpression: undefined };
    if (expression) return { resolvedAnimation: undefined, resolvedExpression: expression };

    const target = (effectiveStateName || 'neutral').toLowerCase();

    // Respect prefers-reduced-motion: map animated states to gentle static expressions
    if (prefersReducedMotion) {
      if (target === 'happy' || target === 'celebrate') {
        return { resolvedAnimation: undefined, resolvedExpression: 'joyful-wide' };
      }
      if (target === 'thinking' || target === 'searching' || target === 'curious') {
        return { resolvedAnimation: undefined, resolvedExpression: 'curious-left' };
      }
      if (target === 'working') {
        return { resolvedAnimation: undefined, resolvedExpression: 'attentive-left' };
      }
      if (target === 'confused' || target === 'angry') {
        return { resolvedAnimation: undefined, resolvedExpression: 'skeptical-right' };
      }
      if (target === 'sad') {
        return { resolvedAnimation: undefined, resolvedExpression: 'sleepy-squint' };
      }
      return { resolvedAnimation: undefined, resolvedExpression: 'neutral' };
    }

    // Standard animation mapping
    if (AVAILABLE_ANIMATIONS.includes(target)) {
      return { resolvedAnimation: target, resolvedExpression: undefined };
    }

    // Standard expression mappings
    if (target === 'idle' || target === 'neutral') {
      return { resolvedAnimation: undefined, resolvedExpression: 'neutral' };
    }

    if (target === 'curious') {
      return { resolvedAnimation: undefined, resolvedExpression: 'curious-left' };
    }

    if (AVAILABLE_EXPRESSIONS.includes(target)) {
      return { resolvedAnimation: undefined, resolvedExpression: target };
    }

    // Default neutral state
    return { resolvedAnimation: undefined, resolvedExpression: 'neutral' };
  }, [animation, expression, effectiveStateName, prefersReducedMotion]);

  // Hover handlers for interactive mode
  const handleMouseEnter = useCallback(() => {
    if (!interactive) return;
    setHovered(true);
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;
    setHovered(false);
  }, [interactive]);

  // Cycle states on click for demo / interaction
  const handleClick = useCallback((e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (interactive) {
      const stateCycle = ['neutral', 'curious', 'thinking', 'searching', 'working', 'happy', 'celebrate'];
      const currentIndex = stateCycle.indexOf(effectiveStateName);
      const nextState = stateCycle[(currentIndex + 1) % stateCycle.length];
      setInteractiveState(nextState);
      if (onStateChange) onStateChange(nextState);
    }
  }, [onClick, interactive, effectiveStateName, onStateChange]);

  const stateLabel = effectiveStateName.toUpperCase();
  const shouldRenderFallback = useFallback || hasLoadError || !CreatedAvatar;

  return (
    <div
      className={`lumi-mascot-wrapper ${compact ? 'lumi-compact' : ''} ${floating ? 'lumi-floating' : ''} ${className}`}
      style={style}
    >
      <div
        className={`lumi-avatar-stage ${interactive ? 'interactive' : ''}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={interactive ? `Lumi is currently ${stateLabel}. Click to cycle mood.` : `Lumi (${stateLabel})`}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick(e);
          }
        }}
      >
        {/* Soft atmospheric glow (omitted in compact mode) */}
        {!compact && <div className="lumi-glow-ambient" />}

        {/* Avatar Rendering Core */}
        <div className="lumi-avatar-canvas">
          {shouldRenderFallback ? (
            <LumiSvgFallback state={effectiveStateName} size={effectiveSize} ariaLabel={ariaLabel} />
          ) : (
            <LumiErrorBoundary state={effectiveStateName} size={effectiveSize} ariaLabel={ariaLabel}>
              <CreatedAvatar
                {...(resolvedAnimation
                  ? { animation: resolvedAnimation }
                  : { expression: resolvedExpression || 'neutral' })}
                size={effectiveSize}
                ariaLabel={ariaLabel}
                onError={(err) => {
                  console.warn('[LumiMascot] Avatar runtime issue:', err);
                }}
              />
            </LumiErrorBoundary>
          )}
        </div>
      </div>

      {/* Optional Speech Bubble */}
      {speechBubble && !compact && (
        <div className="lumi-speech-bubble" role="status" aria-live="polite">
          <div className="lumi-speech-bubble-header">
            <span>LUMI // {stateLabel}</span>
          </div>
          <div className="lumi-speech-bubble-body">{speechBubble}</div>
        </div>
      )}

      {/* Optional Status Pill Badge */}
      {showStatusBadge && !compact && (
        <div className={`lumi-status-badge state-${effectiveStateName.toLowerCase()}`}>
          <span className="lumi-status-dot" />
          <span>LUMI // {stateLabel}</span>
        </div>
      )}
    </div>
  );
}
