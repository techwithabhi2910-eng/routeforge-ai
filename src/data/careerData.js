// Career intelligence dataset for RouteForge AI
// Providing realistic, comprehensive reverse-engineering paths for technical dream roles

export const INITIAL_ROLES = [
  {
    id: 'staff-ai-engineer',
    title: 'Staff AI Engineer',
    category: 'Artificial Intelligence & Systems',
    description: 'Designs enterprise-grade autonomous agent architectures, fine-tunes LLMs, and deploys high-throughput distributed inference pipelines.',
    baseReadiness: 38,
    estTotalHours: 480,
    salaryBenchmark: '$210k — $290k / yr',
    demandIndex: 'Critical (Top 1%)'
  },
  {
    id: 'fullstack-tech-lead',
    title: 'Full-Stack Tech Lead',
    category: 'Distributed Systems & Web',
    description: 'Architects multi-region web applications, guides engineering teams, leads API design, and guarantees 99.99% system resilience.',
    baseReadiness: 45,
    estTotalHours: 420,
    salaryBenchmark: '$185k — $250k / yr',
    demandIndex: 'Very High'
  },
  {
    id: 'cloud-solutions-architect',
    title: 'Cloud Solutions Architect',
    category: 'Cloud & Infrastructure',
    description: 'Designs zero-trust cloud architectures, orchestrates Kubernetes clusters, and implements multi-cloud disaster recovery.',
    baseReadiness: 30,
    estTotalHours: 520,
    salaryBenchmark: '$190k — $260k / yr',
    demandIndex: 'High'
  }
];

export const SKILL_CATEGORIES = [
  {
    id: 'ai-core',
    name: 'AI & Inference Systems',
    description: 'Model serving, vector embeddings, fine-tuning, and prompt routing.',
    skills: [
      { id: 'sk-llm-arch', name: 'LLM Reasoning & Agent Architectures', known: false, weight: 15, estHours: 50 },
      { id: 'sk-vector-db', name: 'Vector DBs & Hybrid Semantic Search', known: true, weight: 12, estHours: 35 },
      { id: 'sk-fine-tuning', name: 'LoRA / QLoRA Parameter Fine-Tuning', known: false, weight: 14, estHours: 60 },
      { id: 'sk-rag-eval', name: 'RAG Triad & Hallucination Evaluation', known: true, weight: 10, estHours: 30 }
    ]
  },
  {
    id: 'system-arch',
    name: 'System Architecture & Scale',
    description: 'Distributed memory, async messaging, and fault-tolerant pipelines.',
    skills: [
      { id: 'sk-dist-cache', name: 'Distributed Caching & Redis Streams', known: true, weight: 10, estHours: 30 },
      { id: 'sk-grpc-proto', name: 'High-Performance gRPC & Protobuf', known: false, weight: 10, estHours: 40 },
      { id: 'sk-event-bus', name: 'Event Sourcing & Kafka Pipelines', known: false, weight: 12, estHours: 45 },
      { id: 'sk-load-balance', name: 'Edge Routing & Envoy Proxying', known: true, weight: 8, estHours: 25 }
    ]
  },
  {
    id: 'production-ops',
    name: 'Production & MLOps Toolchain',
    description: 'Container orchestration, CI/CD, telemetry, and observability.',
    skills: [
      { id: 'sk-k8s', name: 'Kubernetes GPU Scheduling & Autoscaling', known: false, weight: 12, estHours: 55 },
      { id: 'sk-telemetry', name: 'OpenTelemetry Distributed Tracing', known: false, weight: 8, estHours: 25 },
      { id: 'sk-ci-cd', name: 'Automated Model Regression Testing', known: true, weight: 8, estHours: 20 },
      { id: 'sk-cost-opt', name: 'GPU Memory & Quantization Optimization', known: false, weight: 11, estHours: 45 }
    ]
  },
  {
    id: 'portfolio-evidence',
    name: 'Proof of Work & Artifacts',
    description: 'GitHub repositories, benchmarks, architecture decision records.',
    skills: [
      { id: 'sk-adr-writing', name: 'Architecture Decision Records (ADRs)', known: true, weight: 6, estHours: 15 },
      { id: 'sk-oss-contrib', name: 'Open Source Framework Contributions', known: false, weight: 10, estHours: 40 },
      { id: 'sk-live-deploy', name: 'Production Benchmarks with Stress-Testing', known: false, weight: 10, estHours: 35 }
    ]
  }
];

export const ROUTE_CONFIGS = {
  'fastest': {
    id: 'fastest',
    badge: '01 // SPEED OPTIMIZED',
    name: 'Fastest Route',
    subtitle: 'Prerequisite-accelerated sprint focusing on high-leverage skills and production deployments.',
    estimatedDuration: '16 Weeks',
    weeklyCommitment: '20-25 hrs / week',
    costRating: 'Moderate ($150-$300 for cloud runtime)',
    projectEmphasis: '2 End-to-End Enterprise Demonstrators',
    focus: 'Direct path to technical interview competency with zero wasted tangents.',
    milestonesCount: 6,
    color: '#ff6a00'
  },
  'budget-friendly': {
    id: 'budget-friendly',
    badge: '02 // ZERO COST STACK',
    name: 'Budget-Friendly Route',
    subtitle: '100% open-source tools, free tier infrastructure, local LLM execution, and community docs.',
    estimatedDuration: '26 Weeks',
    weeklyCommitment: '12-15 hrs / week',
    costRating: '$0 (Zero out-of-pocket spend)',
    projectEmphasis: '3 Open Source Tools & Local Deployments',
    focus: 'Mastering Ollama, vLLM, PostgreSQL pgvector, and public benchmark datasets.',
    milestonesCount: 6,
    color: '#e27d32'
  },
  'portfolio-first': {
    id: 'portfolio-first',
    badge: '03 // PROOF-OF-WORK',
    name: 'Portfolio-First Route',
    subtitle: 'Heavy emphasis on demonstrable GitHub artifacts, live URL deployments, and public case studies.',
    estimatedDuration: '22 Weeks',
    weeklyCommitment: '16-18 hrs / week',
    costRating: 'Low ($50 domain & test server)',
    projectEmphasis: '4 Public GitHub Showcases with CI/CD Badges',
    focus: 'Building public authority, comprehensive READMEs, and technical blog teardowns.',
    milestonesCount: 7,
    color: '#ff8c38'
  }
};

// Route-specific milestones
export const ROUTE_MILESTONES = {
  'fastest': [
    {
      id: 'm-f1',
      code: 'M-01',
      title: 'Distributed Inference & Streaming Core',
      phase: 'Phase 1: Foundations',
      status: 'completed', // completed, active, pending
      skills: ['vLLM', 'FastAPI WebSockets', 'Token Streaming', 'SSE'],
      task: 'Build a low-latency multi-tenant proxy with token streaming and rate limiting.',
      deliverable: 'A Dockerized proxy handling concurrent requests with under 18ms TTFT (Time to First Token).',
      githubEvidence: {
        repoName: 'inference-stream-gateway',
        description: 'Async gateway with token-level backpressure and Prometheus metrics.',
        readmeSnippet: 'Includes load testing scripts with Locust verifying 1,500 req/sec.'
      },
      interviewPrep: [
        'How does speculative decoding decrease inference latency?',
        'Explain token streaming backpressure handling in Node/Python.'
      ],
      position: { x: 50, y: 120 }
    },
    {
      id: 'm-f2',
      code: 'M-02',
      title: 'Hybrid Semantic Retrieval Engine',
      phase: 'Phase 1: Knowledge',
      status: 'completed',
      skills: ['Vector DBs', 'BM25 Hybrid Search', 'Rerankers', 'pgvector'],
      task: 'Implement a two-stage retrieval pipeline combining sparse lexical search with dense embeddings and cross-encoder reranking.',
      deliverable: 'Benchmarked pipeline showing 24% MRR improvement over standard dense search.',
      githubEvidence: {
        repoName: 'hybrid-retrieval-eval',
        description: 'Comprehensive RAG evaluation suite tested against 10k technical docs.',
        readmeSnippet: 'Automated evaluation report with RAGAS metrics & latency breakdown.'
      },
      interviewPrep: [
        'When does BM25 outperform dense embeddings?',
        'Trade-offs between HNSW and IVFFlat vector indexing algorithms.'
      ],
      position: { x: 340, y: 80 }
    },
    {
      id: 'm-f3',
      code: 'M-03',
      title: 'Autonomous Multi-Agent Orchestrator',
      phase: 'Phase 2: Execution',
      status: 'active',
      skills: ['LangGraph', 'State Machines', 'Tool Calling', 'Human-in-the-Loop'],
      task: 'Design a cyclic graph agent with durable execution, checkpointing, and human confirmation triggers.',
      deliverable: 'Enterprise code-review assistant that analyzes PRs, runs linter checks, and drafts diff comments.',
      githubEvidence: {
        repoName: 'graph-agent-engine',
        description: 'Fault-tolerant agent engine with state persistence in Redis.',
        readmeSnippet: 'Full visual DAG visualization with step replay and audit trails.'
      },
      interviewPrep: [
        'How do you handle cyclic state degradation in multi-agent discussions?',
        'Implementing idempotency in non-deterministic LLM tool calls.'
      ],
      position: { x: 630, y: 150 }
    },
    {
      id: 'm-f4',
      code: 'M-04',
      title: 'LoRA Domain Adaptation & Quantization',
      phase: 'Phase 2: Modeling',
      status: 'pending',
      skills: ['Unsloth', 'QLoRA 4-bit', 'GGUF Conversion', 'Evaluation Loss'],
      task: 'Fine-tune a 8B open model on domain-specific system architecture decision records.',
      deliverable: 'Fine-tuned model weights exported to GGUF and Ollama model card with eval metrics.',
      githubEvidence: {
        repoName: 'arch-finetune-lora',
        description: 'Fine-tuning pipeline with synthetic dataset synthesis and loss graphs.',
        readmeSnippet: 'Includes Weights & Biases training logs and automated eval harness.'
      },
      interviewPrep: [
        'What rank (r) and alpha values should you pick for code generation LoRA?',
        'Mathematical difference between AWQ and GPTQ quantization.'
      ],
      position: { x: 920, y: 90 }
    },
    {
      id: 'm-f5',
      code: 'M-05',
      title: 'Kubernetes GPU Auto-Scaler & Envoy Gateway',
      phase: 'Phase 3: Scale',
      status: 'pending',
      skills: ['KEDA', 'NVIDIA Container Toolkit', 'Envoy Gateway', 'Ray Serve'],
      task: 'Configure automated horizontal scaling based on inference queue depth instead of raw CPU/RAM.',
      deliverable: 'Helm chart and Terraform module deploying a self-healing inference cluster.',
      githubEvidence: {
        repoName: 'k8s-gpu-serving-stack',
        description: 'Production infrastructure-as-code for GPU worker scaling.',
        readmeSnippet: 'Terraform manifests and KEDA custom metric scaler for vLLM.'
      },
      interviewPrep: [
        'How do you prevent cold-start latency when scaling GPU pods from zero?',
        'Memory bandwidth vs compute capacity in transformer inference.'
      ],
      position: { x: 1210, y: 140 }
    },
    {
      id: 'm-f6',
      code: 'M-06',
      title: 'CapStone: Enterprise Agent Intelligence Platform',
      phase: 'Phase 3: Capstone',
      status: 'pending',
      skills: ['Full Stack Systems', 'SOC-2 Guardrails', 'Distributed Telemetry'],
      task: 'Deploy a unified enterprise intelligence system with sandboxed code execution, telemetry, and rate control.',
      deliverable: 'Live production URL with interactive demo, comprehensive system docs, and architecture diagram.',
      githubEvidence: {
        repoName: 'routeforge-core-system',
        description: 'Production-ready platform with OpenTelemetry integration and ADRs.',
        readmeSnippet: 'Full ADR suite, end-to-end test matrix, and architecture diagrams.'
      },
      interviewPrep: [
        'Walk through your production incident mitigation protocol for hallucinations.',
        'How would you architect multi-tenant data isolation in shared vector indices?'
      ],
      position: { x: 1500, y: 100 }
    }
  ],
  'budget-friendly': [
    {
      id: 'm-b1',
      code: 'M-01',
      title: 'Local LLM Sandbox with Ollama & Docker',
      phase: 'Phase 1: Local Setup',
      status: 'completed',
      skills: ['Ollama', 'Docker Compose', 'Local HuggingFace Cache', 'Python Asyncio'],
      task: 'Set up an offline AI workbench running quantized Llama-3 and Mistral models without cloud API charges.',
      deliverable: 'A single-command Docker environment with automated model pulling and health checks.',
      githubEvidence: {
        repoName: 'zero-cost-ai-sandbox',
        description: 'Containerized local AI stack with automatic memory profiling.',
        readmeSnippet: 'Runs on 8GB RAM laptops with CPU fallback support.'
      },
      interviewPrep: [
        'How does llama.cpp achieve high CPU inference performance?',
        'Context window memory scaling in KV caching.'
      ],
      position: { x: 50, y: 100 }
    },
    {
      id: 'm-b2',
      code: 'M-02',
      title: 'PostgreSQL & pgvector Knowledge Engine',
      phase: 'Phase 1: Free Storage',
      status: 'completed',
      skills: ['PostgreSQL 16', 'pgvector', 'HNSW Indexing', 'SQL Queries'],
      task: 'Replace commercial vector databases with free open-source Postgres and native pgvector.',
      deliverable: 'SQL migrations, similarity search functions, and indexing benchmark scripts.',
      githubEvidence: {
        repoName: 'pgvector-production-starter',
        description: 'Production schema and query optimization for 1M+ embeddings in Postgres.',
        readmeSnippet: 'Includes query execution plans (EXPLAIN ANALYZE) and tuning tips.'
      },
      interviewPrep: [
        'Why choose pgvector over dedicated vector databases in early-stage products?',
        'Explaining cosine distance vs inner product in normalized embeddings.'
      ],
      position: { x: 340, y: 150 }
    },
    {
      id: 'm-b3',
      code: 'M-03',
      title: 'Open Source Agent Framework Integration',
      phase: 'Phase 2: Logic',
      status: 'active',
      skills: ['Pydantic AI', 'DuckDuckGo API', 'SQLite Vector Cache', 'Python'],
      task: 'Build a research agent utilizing free public search APIs and local memory caching.',
      deliverable: 'Command-line and web research assistant that collects evidence without paid APIs.',
      githubEvidence: {
        repoName: 'oss-research-automator',
        description: 'Zero-API-cost research agent with citation cross-referencing.',
        readmeSnippet: 'Includes 50 automated tests and mock search stubs.'
      },
      interviewPrep: [
        'How do you handle schema validation failures from small open-source LLMs?',
        'Strategies for reliable structured JSON output from 7B models.'
      ],
      position: { x: 630, y: 80 }
    },
    {
      id: 'm-b4',
      code: 'M-04',
      title: 'Kaggle & Colab Free-Tier Fine-Tuning Pipeline',
      phase: 'Phase 2: Training',
      status: 'pending',
      skills: ['Google Colab Free GPU', 'TRL / PEFT', 'Hugging Face Hub'],
      task: 'Train a task-specific adapter on a free T4 GPU notebook with checkpoint resumption.',
      deliverable: 'Public Hugging Face model card with training curves and evaluation scripts.',
      githubEvidence: {
        repoName: 'free-tier-lora-cookbook',
        description: 'Reproducible Jupyter notebooks for training models under strict 12hr limits.',
        readmeSnippet: 'Step-by-step memory checkpointing to avoid Colab disconnections.'
      },
      interviewPrep: [
        'Gradient accumulation vs batch size adjustments on constrained VRAM.',
        'What causes catastrophic forgetting during fine-tuning?'
      ],
      position: { x: 920, y: 160 }
    },
    {
      id: 'm-b5',
      code: 'M-05',
      title: 'Free Cloud Deployment on Fly.io / Render',
      phase: 'Phase 3: Production',
      status: 'pending',
      skills: ['Fly.io Free Tier', 'LiteLLM Proxy', 'Caddy Reverse Proxy', 'TLS'],
      task: 'Package and deploy the system on perpetual free-tier container hosting with automatic sleeping.',
      deliverable: 'Live publicly accessible HTTPS URL with uptime monitoring via GitHub Actions.',
      githubEvidence: {
        repoName: 'free-cloud-agent-runner',
        description: 'Optimized tiny Alpine Docker image running under 512MB RAM limits.',
        readmeSnippet: 'Live demo URL with health check badges and uptime stats.'
      },
      interviewPrep: [
        'Techniques to keep container images under 100MB for rapid cold boots.',
        'Handling rate limits across multi-provider fallbacks.'
      ],
      position: { x: 1210, y: 90 }
    },
    {
      id: 'm-b6',
      code: 'M-06',
      title: 'Community Open Source Contribution & Technical Case Study',
      phase: 'Phase 3: Authority',
      status: 'pending',
      skills: ['Git Fork / PR', 'Documentation', 'Issue Triage', 'Public Writing'],
      task: 'Submit accepted pull requests to popular AI libraries (e.g., vLLM or LangChain docs/integrations).',
      deliverable: 'Merged PR links, community appreciation, and a published breakdown article.',
      githubEvidence: {
        repoName: 'ai-engineering-deepdive-blog',
        description: '10-part technical series breaking down vector databases and agent state machines.',
        readmeSnippet: 'Over 1,200 stars and featured in engineering newsletters.'
      },
      interviewPrep: [
        'Walk through your contribution to an open-source project codebase.',
        'How do you collaborate asynchronously with global OSS maintainers?'
      ],
      position: { x: 1500, y: 130 }
    }
  ],
  'portfolio-first': [
    {
      id: 'm-p1',
      code: 'M-01',
      title: 'Showcase Project 1: Semantic Search & Intelligence Engine',
      phase: 'Phase 1: Retrieval',
      status: 'completed',
      skills: ['TypeScript', 'Next.js 14', 'Qdrant / Milvus', 'Tailwind / CSS'],
      task: 'Build a polished, lightning-fast semantic search app over 100,000 developer documentation pages.',
      deliverable: 'GitHub repo with 100% test coverage, comprehensive README with animated GIF demo, and Vercel URL.',
      githubEvidence: {
        repoName: 'semantic-dev-engine',
        description: 'Sub-50ms hybrid search engine with visual query vector embeddings.',
        readmeSnippet: 'Over 300 GitHub stars, interactive live playground, and CI badges.'
      },
      interviewPrep: [
        'How do you optimize vector query latency on client applications?',
        'Debouncing and streaming UI strategies for search as you type.'
      ],
      position: { x: 50, y: 130 }
    },
    {
      id: 'm-p2',
      code: 'M-02',
      title: 'Showcase Project 2: Distributed Job Queue & Worker Mesh',
      phase: 'Phase 1: Scale',
      status: 'completed',
      skills: ['Go / Node.js', 'Redis BullMQ', 'WebSocket Telemetry', 'Docker'],
      task: 'Engineer a distributed asynchronous job processing dashboard with real-time progress bars.',
      deliverable: 'Visual dashboard demonstrating concurrent worker failover and backpressure.',
      githubEvidence: {
        repoName: 'distributed-worker-mesh',
        description: 'High-concurrency job dispatcher with automatic dead-letter queue inspection.',
        readmeSnippet: 'Includes load test graphs showing zero dropped tasks at 5k ops/sec.'
      },
      interviewPrep: [
        'How do you achieve exactly-once task execution in distributed systems?',
        'Designing heartbeats and worker leasing protocols in Redis.'
      ],
      position: { x: 300, y: 70 }
    },
    {
      id: 'm-p3',
      code: 'M-03',
      title: 'Showcase Project 3: Autonomous Coding Review Copilot',
      phase: 'Phase 2: Agents',
      status: 'active',
      skills: ['GitHub Apps API', 'Webhook Security', 'AST Parsing', 'LLM Agents'],
      task: 'Build a GitHub App that triggers on pull requests, analyzes AST changes, and comments inline code suggestions.',
      deliverable: 'Installable GitHub App tested across 5 public repositories.',
      githubEvidence: {
        repoName: 'forge-pr-assistant',
        description: 'Production GitHub App with cryptographic webhook verification and AST guards.',
        readmeSnippet: 'Used by 12 active OSS repositories with automated test feedback.'
      },
      interviewPrep: [
        'How do you prevent malicious prompts in untrusted pull request comments?',
        'Explaining AST parsing vs simple token regex for code analysis.'
      ],
      position: { x: 580, y: 160 }
    },
    {
      id: 'm-p4',
      code: 'M-04',
      title: 'Architecture Decision Records (ADRs) & Systems Blueprint',
      phase: 'Phase 2: Design',
      status: 'pending',
      skills: ['System Design', 'C4 Model Diagrams', 'ADRs', 'Capacity Planning'],
      task: 'Write 8 production-grade ADRs evaluating trade-offs (e.g., Kafka vs Redis, gRPC vs REST, Self-hosted vs SaaS).',
      deliverable: 'Technical docs site published with C4 model architecture diagrams.',
      githubEvidence: {
        repoName: 'system-architecture-blueprints',
        description: 'Deep-dive architectural decision records modeled after enterprise tech leads.',
        readmeSnippet: 'Diagrams rendered with Mermaid and PlantUML with capacity calculators.'
      },
      interviewPrep: [
        'Present your justification for selecting Redis Streams over Apache Kafka.',
        'How do you calculate required RAM and IOPS for a 10M DAU service?'
      ],
      position: { x: 860, y: 90 }
    },
    {
      id: 'm-p5',
      code: 'M-05',
      title: 'Showcase Project 4: Model Benchmarking & Safety Guardrail Suite',
      phase: 'Phase 3: Security',
      status: 'pending',
      skills: ['Llama Guard', 'Toxicity Classifiers', 'Latency Profiling', 'FastAPI'],
      task: 'Create an open benchmark suite evaluating commercial vs open LLMs across latency, accuracy, and safety filters.',
      deliverable: 'Interactive public leaderboard updated daily via GitHub Actions cron.',
      githubEvidence: {
        repoName: 'agent-safety-eval-matrix',
        description: 'Automated CI pipeline testing red-teaming prompts against 12 models.',
        readmeSnippet: 'Live leaderboard deployed on GitHub Pages with interactive filtering.'
      },
      interviewPrep: [
        'How do you benchmark model inference without incurring bias from cached responses?',
        'Architecting defense-in-depth against prompt injection attacks.'
      ],
      position: { x: 1140, y: 150 }
    },
    {
      id: 'm-p6',
      code: 'M-06',
      title: 'Interactive Portfolio Hub & Technical Video Teardown',
      phase: 'Phase 3: Presentation',
      status: 'pending',
      skills: ['Portfolio Design', 'Loom Demos', 'Technical Writing', 'SEO'],
      task: 'Assemble all 4 projects into a cohesive engineering portfolio with 3-minute technical walkthrough videos.',
      deliverable: 'Ultra-fast dark mode portfolio site with live interactive demos embedded.',
      githubEvidence: {
        repoName: 'staff-engineer-portfolio',
        description: 'Clean editorial tech portfolio with system design teardowns and resume link.',
        readmeSnippet: 'Ranked #1 on Hacker News Show HN with 400+ comments.'
      },
      interviewPrep: [
        'How do you communicate complex technical trade-offs to non-engineering executives?',
        'Walk through your hardest production bug and how you resolved it.'
      ],
      position: { x: 1420, y: 80 }
    },
    {
      id: 'm-p7',
      code: 'M-07',
      title: 'Mock Staff-Level System Design Interview Verification',
      phase: 'Phase 3: Verification',
      status: 'pending',
      skills: ['System Design Interviews', 'Whiteboarding', 'Leadership & Alignment'],
      task: 'Pass 3 rigorous mock interviews with verified Staff Engineers covering large-scale distributed AI systems.',
      deliverable: 'Recorded mock interview feedback sheets and refined system design rubric scorecards.',
      githubEvidence: {
        repoName: 'system-design-mastery-notes',
        description: 'Comprehensive interview preparation cheat sheet and high-scale blueprints.',
        readmeSnippet: 'Includes real interview question breakdowns from top tech firms.'
      },
      interviewPrep: [
        'Design a real-time collaborative document editor with AI autocomplete for 5M concurrent users.',
        'Design a global distributed feature store for low-latency fraud detection.'
      ],
      position: { x: 1700, y: 140 }
    }
  ]
};

// Calculate telemetry based on current skills and milestones state
export function calculateTelemetry(categories, milestones) {
  let totalSkills = 0;
  let knownSkills = 0;
  let totalSkillHours = 0;
  let completedHours = 0;

  categories.forEach(cat => {
    cat.skills.forEach(sk => {
      totalSkills += 1;
      totalSkillHours += sk.estHours;
      if (sk.known) {
        knownSkills += 1;
        completedHours += sk.estHours;
      }
    });
  });

  const skillCoveragePct = Math.round((knownSkills / Math.max(1, totalSkills)) * 100);
  const remainingHours = Math.max(0, totalSkillHours - completedHours);

  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const activeMilestones = milestones.filter(m => m.status === 'active').length;
  const pendingMilestones = milestones.filter(m => m.status === 'pending').length;
  const milestoneProgressPct = Math.round((completedMilestones / Math.max(1, totalMilestones)) * 100);

  // Overall readiness composite score
  const overallReadiness = Math.min(100, Math.round((skillCoveragePct * 0.5) + (milestoneProgressPct * 0.5)));

  return {
    totalSkills,
    knownSkills,
    missingSkills: totalSkills - knownSkills,
    skillCoveragePct,
    totalSkillHours,
    remainingHours,
    totalMilestones,
    completedMilestones,
    activeMilestones,
    pendingMilestones,
    milestoneProgressPct,
    overallReadiness
  };
}
