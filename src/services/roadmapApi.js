/**
 * RouteForge AI — Roadmap API Service
 * Handles communication with the Python FastAPI backend and adapts AI responses
 * into the frontend data model.
 */

// Read backend API base URL from Vite environment, fallback to standard local backend
const RAW_API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  'http://127.0.0.1:8000';
export const API_BASE_URL = RAW_API_BASE.replace(/\/+$/, '');

/**
 * Health check helper
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) return { ok: false, status: res.status };
    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/**
 * Fetch a personalized roadmap from the FastAPI + Gemini backend
 *
 * @param {Object} params
 * @param {string} params.target_role - Target career role
 * @param {string[]} [params.current_skills] - Skills the user currently knows
 * @param {number} [params.weekly_hours] - Available study hours per week (default 20)
 * @param {number} [params.budget_inr] - Learning budget in INR (default 5000)
 * @param {string[]} [params.completed_skills] - Already completed skills
 * @param {number} [timeoutMs] - Request timeout in milliseconds (default 60000)
 * @returns {Promise<Object>} Backend RoadmapResponse
 */
export async function generateRoadmapApi({
  target_role,
  current_skills = [],
  weekly_hours = 20,
  budget_inr = 5000,
  completed_skills = []
}, timeoutMs = 60000) {
  if (!target_role || typeof target_role !== 'string' || target_role.trim().length < 2) {
    throw new Error('Please enter a valid target role (at least 2 characters).');
  }

  const endpoint = `${API_BASE_URL}/api/roadmap`;

  const payload = {
    target_role: target_role.trim(),
    current_skills: Array.isArray(current_skills) ? current_skills : [],
    weekly_hours: Math.max(1, Math.min(168, Number(weekly_hours) || 20)),
    budget_inr: Math.max(0, Number(budget_inr) || 0),
    completed_skills: Array.isArray(completed_skills) ? completed_skills : []
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Safely parse JSON
    let responseData;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch (jsonErr) {
        throw new Error('Received malformed JSON from the backend server.');
      }
    } else {
      const text = await response.text();
      throw new Error(`Unexpected non-JSON response from server (HTTP ${response.status}): ${text.slice(0, 150)}`);
    }

    if (!response.ok) {
      // Extract useful error details from FastAPI
      const detail = responseData?.detail || responseData?.message;
      if (typeof detail === 'string') {
        throw new Error(detail);
      } else if (Array.isArray(detail)) {
        // Pydantic validation error list
        const msg = detail.map((d) => d.msg || d.message).join('; ');
        throw new Error(`Validation Error: ${msg}`);
      }
      throw new Error(`Server returned error HTTP ${response.status}. Please check backend logs.`);
    }

    // Validate expected structure
    if (!responseData || !responseData.routes || typeof responseData.routes !== 'object') {
      throw new Error('Invalid roadmap response schema received from backend.');
    }

    return responseData;
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new Error('Roadmap generation timed out (exceeded 60s). Gemini may be experiencing high demand; please retry.');
    }

    // Network / connection refusal
    if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
      throw new Error(
        `Unable to reach backend at ${API_BASE_URL}. Ensure FastAPI is running (uvicorn backend.main:app) and CORS is configured.`
      );
    }

    throw err;
  }
}

/**
 * Maps backend routes into UI-compatible milestones and route configurations
 *
 * @param {Object} backendData - The parsed RoadmapResponse from POST /api/roadmap
 * @param {Object} baseRouteConfigs - Baseline ROUTE_CONFIGS template
 * @returns {Object} { milestonesMap, routeConfigsMap, routeEdgesMap, note, targetRole }
 */
export function adaptRoadmapResponse(backendData, baseRouteConfigs = {}) {
  const { routes, target_role, note } = backendData;

  const keyMap = [
    { backendKey: 'fastest_practical', uiKey: 'fastest' },
    { backendKey: 'budget_friendly', uiKey: 'budget-friendly' },
    { backendKey: 'portfolio_first', uiKey: 'portfolio-first' }
  ];

  const milestonesMap = {};
  const routeConfigsMap = { ...baseRouteConfigs };
  const routeEdgesMap = {};

  keyMap.forEach(({ backendKey, uiKey }) => {
    const routeObj = routes?.[backendKey];
    if (!routeObj) return;

    const baseConfig = baseRouteConfigs[uiKey] || {};

    // 1. Update Route Config Metadata
    routeConfigsMap[uiKey] = {
      ...baseConfig,
      name: routeObj.name || baseConfig.name || 'Custom Route',
      subtitle: routeObj.description || baseConfig.subtitle || '',
      milestonesCount: Array.isArray(routeObj.nodes) ? routeObj.nodes.length : (baseConfig.milestonesCount || 6),
      isAIGenerated: true
    };

    // 2. Map Nodes to Milestones
    const nodes = Array.isArray(routeObj.nodes) ? routeObj.nodes : [];
    const adaptedMilestones = nodes.map((node, index) => {
      const nodeType = (node.type || 'skill').toLowerCase();
      const isCompleted = Boolean(node.completed);
      const code = `M-${String(index + 1).padStart(2, '0')}`;

      // Clean, aesthetic staggered DAG positioning
      const x = 50 + index * 290;
      const y = 80 + (index % 2 === 1 ? 60 : 0);

      const capitalizedType = nodeType.charAt(0).toUpperCase() + nodeType.slice(1);
      const phaseNum = Math.min(3, Math.floor(index / 2) + 1);

      return {
        id: node.id || `ai-${uiKey}-${index}`,
        code,
        title: node.label || `Milestone ${index + 1}`,
        nodeType,
        phase: `Phase ${phaseNum}: ${capitalizedType}`,
        status: isCompleted ? 'completed' : (index === 0 ? 'active' : 'pending'),
        skills: [node.label],
        task: `Implement and verify ${node.label} according to industry standards for ${target_role}.`,
        deliverable: `Production-ready codebase and architectural artifact demonstrating ${node.label}.`,
        githubEvidence: {
          repoName: `${(target_role || 'routeforge').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nodeType}-${index + 1}`,
          description: `Repository for ${node.label} containing source code, tests, and architecture documentation.`,
          readmeSnippet: `Demonstrates end-to-end integration of ${node.label} with automated CI/CD and telemetry verification.`
        },
        interviewPrep: [
          `How would you design and optimize systems utilizing ${node.label}?`,
          `What are the primary failure modes and scaling bottlenecks associated with ${node.label}?`
        ],
        position: { x, y }
      };
    });

    milestonesMap[uiKey] = adaptedMilestones;

    // 3. Map Edges
    if (Array.isArray(routeObj.edges) && routeObj.edges.length > 0) {
      routeEdgesMap[uiKey] = routeObj.edges.map((edge) => ({
        id: edge.id || `e-${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target
      }));
    } else {
      // Fallback: sequential linear edges
      const fallbackEdges = [];
      for (let i = 0; i < adaptedMilestones.length - 1; i++) {
        fallbackEdges.push({
          id: `e-${adaptedMilestones[i].id}-${adaptedMilestones[i + 1].id}`,
          source: adaptedMilestones[i].id,
          target: adaptedMilestones[i + 1].id
        });
      }
      routeEdgesMap[uiKey] = fallbackEdges;
    }
  });

  return {
    milestonesMap,
    routeConfigsMap,
    routeEdgesMap,
    targetRole: target_role,
    note: note || 'AI-generated personalized roadmap.'
  };
}
