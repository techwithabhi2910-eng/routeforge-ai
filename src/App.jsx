import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import CursorTracker from './components/CursorTracker';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import JourneyStepper from './components/JourneyStepper';

// 5-Stage Career Journey Components
import StepDiscover from './components/StepDiscover';
import StepStartingPoint from './components/StepStartingPoint';
import StepSkillGap from './components/StepSkillGap';
import StepChooseRoute from './components/StepChooseRoute';
import StepFollowRoadmap from './components/StepFollowRoadmap';

// Secondary / Advanced View Components (Preserving Teammate Architecture)
import ChapterRail from './components/ChapterRail';
import HeroSection from './components/HeroSection';
import AnalyzeSection from './components/AnalyzeSection';
import CompareSection from './components/CompareSection';
import BuildSection from './components/BuildSection';
import TrackSection from './components/TrackSection';
import FooterSection from './components/FooterSection';
import LumiFloatingAssistant from './components/LumiFloatingAssistant';

import {
  INITIAL_ROLES,
  SKILL_CATEGORIES,
  ROUTE_CONFIGS,
  ROUTE_MILESTONES,
  calculateTelemetry
} from './data/careerData';
import { generateRoadmapApi, adaptRoadmapResponse } from './services/roadmapApi';

export default function App() {
  // Journey Step State: 1 (Discover) to 5 (Follow Roadmap)
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(2); // Step 1 and 2 are always accessible

  // Target Role & User Starting Point
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [currentSkills, setCurrentSkills] = useState([
    'Python', 'FastAPI / REST APIs', 'Git & CI/CD'
  ]);
  const [completedSkills, setCompletedSkills] = useState([]);
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [budgetInr, setBudgetInr] = useState(5000);

  // Selected Route Strategy: 'fastest', 'budget-friendly', 'portfolio-first'
  const [selectedRouteId, setSelectedRouteId] = useState('fastest');

  // Skill and Milestone Data
  const [skillCategories, setSkillCategories] = useState(SKILL_CATEGORIES);
  const [allRouteMilestones, setAllRouteMilestones] = useState(ROUTE_MILESTONES);
  const [routeConfigs, setRouteConfigs] = useState(ROUTE_CONFIGS);
  const [allRouteEdges, setAllRouteEdges] = useState({});

  // Mode: Guided Journey (default) vs All Panels Advanced View
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [activeSection, setActiveSection] = useState('discover');

  // Live Roadmap Synthesis API State
  const [isLiveGenerated, setIsLiveGenerated] = useState(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);
  const [roadmapNote, setRoadmapNote] = useState('');

  // Lumi Mascot Global State
  const [mascotState, setMascotState] = useState('neutral');
  const [mascotMessage, setMascotMessage] = useState('Where do you want your career to go?');
  const mascotTimerRef = useRef(null);

  // Timer-managed Lumi reaction trigger
  const triggerMascotReaction = useCallback((state, message, durationMs = 2800) => {
    if (mascotTimerRef.current) {
      clearTimeout(mascotTimerRef.current);
      mascotTimerRef.current = null;
    }
    setMascotState(state);
    if (message) {
      setMascotMessage(message);
    }
    if (durationMs > 0) {
      mascotTimerRef.current = setTimeout(() => {
        setMascotState('neutral');
      }, durationMs);
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (mascotTimerRef.current) {
        clearTimeout(mascotTimerRef.current);
      }
    };
  }, []);

  // Scroll to top when changing steps
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Step Navigation Handler
  const goToStep = useCallback((stepNumber) => {
    const target = Math.max(1, Math.min(5, stepNumber));
    if (target <= maxStepReached) {
      setCurrentStep(target);
      scrollToTop();

      const messages = {
        1: 'Where do you want your career to go?',
        2: 'Let\'s understand what you already know.',
        3: 'Here are the skills between you and your goal.',
        4: 'Pick the strategy that fits your priorities.',
        5: 'Let\'s start with your next milestone!'
      };
      triggerMascotReaction('neutral', messages[target] || 'Exploring career path...', 2000);
    }
  }, [maxStepReached, scrollToTop, triggerMascotReaction]);

  // When selected role changes, seed default starting skills if user hasn't customized heavily
  const handleSelectRole = useCallback((role) => {
    setSelectedRole(role);
    if (role.suggestedSkills && role.suggestedSkills.length > 0) {
      // Pick 2-3 starting skills as a friendly default
      setCurrentSkills(role.suggestedSkills.slice(0, 3));
    }
  }, []);

  // Skill Toggles for Step 2 Starting Point
  const handleToggleCurrentSkill = useCallback((skillName) => {
    setCurrentSkills((prev) => {
      if (prev.includes(skillName)) {
        return prev.filter((s) => s !== skillName);
      }
      return [...prev, skillName];
    });
  }, []);

  const handleAddCustomSkill = useCallback((skillName) => {
    setCurrentSkills((prev) => {
      if (!prev.includes(skillName)) {
        return [...prev, skillName];
      }
      return prev;
    });
  }, []);

  const handleRemoveSkill = useCallback((skillName) => {
    setCurrentSkills((prev) => prev.filter((s) => s !== skillName));
  }, []);

  const handleAddCompletedSkill = useCallback((skillName) => {
    setCompletedSkills((prev) => {
      if (!prev.includes(skillName)) {
        return [...prev, skillName];
      }
      return prev;
    });
  }, []);

  const handleRemoveCompletedSkill = useCallback((skillName) => {
    setCompletedSkills((prev) => prev.filter((s) => s !== skillName));
  }, []);

  // Current milestones for selected route
  const currentMilestones = useMemo(() => {
    return allRouteMilestones[selectedRouteId] || allRouteMilestones['fastest'] || [];
  }, [allRouteMilestones, selectedRouteId]);

  // Telemetry computation
  const telemetry = useMemo(() => {
    return calculateTelemetry(skillCategories, currentMilestones);
  }, [skillCategories, currentMilestones]);

  // Toggle Milestone Complete
  const handleToggleMilestoneComplete = useCallback(
    (milestoneId) => {
      let isCompleted = false;
      let milestoneTitle = '';
      setAllRouteMilestones((prevMap) => {
        const routeList = prevMap[selectedRouteId] || [];
        const updatedList = routeList.map((m) => {
          if (m.id !== milestoneId) return m;
          const nextStatus = m.status === 'completed' ? 'pending' : 'completed';
          isCompleted = nextStatus === 'completed';
          milestoneTitle = m.title;
          return { ...m, status: nextStatus };
        });
        return {
          ...prevMap,
          [selectedRouteId]: updatedList
        };
      });

      if (isCompleted) {
        triggerMascotReaction(
          'celebrate',
          `Milestone verified: "${milestoneTitle}"! Great portfolio progress.`,
          3500
        );
      } else {
        triggerMascotReaction(
          'working',
          `Milestone reopened: "${milestoneTitle}". Pacing recalibrated.`,
          2000
        );
      }
    },
    [selectedRouteId, triggerMascotReaction]
  );

  // Generate Roadmap Action — Connecting directly to Python FastAPI + Gemini backend
  const handleGenerateRoadmap = useCallback(
    async ({ targetRole: roleTitle, weeklyHours: hours = 20, budgetInr: budget = 5000 } = {}) => {
      const roleToForge = roleTitle || selectedRole?.title;
      if (!roleToForge || roleToForge.trim().length < 2) {
        setRoadmapError('Please select or enter a valid target career role.');
        return;
      }

      setIsLoadingRoadmap(true);
      setRoadmapError(null);

      triggerMascotReaction('thinking', `Synthesizing customized learning path for "${roleToForge}"...`, 2000);

      const timerId = setTimeout(() => {
        triggerMascotReaction('working', 'Gemini AI generating 3 optimized routes & dependency DAGs...', 5000);
      }, 1500);

      try {
        const apiResponse = await generateRoadmapApi({
          target_role: roleToForge,
          current_skills: currentSkills,
          weekly_hours: Number(hours) || 20,
          budget_inr: Number(budget) || 5000,
          completed_skills: completedSkills
        });

        clearTimeout(timerId);

        // Adapt real backend response to UI data models
        const adapted = adaptRoadmapResponse(apiResponse, routeConfigs);

        setAllRouteMilestones(adapted.milestonesMap);
        setRouteConfigs(adapted.routeConfigsMap);
        setAllRouteEdges(adapted.routeEdgesMap);
        setIsLiveGenerated(true);
        setRoadmapNote(adapted.note);

        // Unlock all steps and advance to Step 3 (Skill Gap)
        setMaxStepReached(5);
        setCurrentStep(3);
        scrollToTop();

        triggerMascotReaction(
          'celebrate',
          `Roadmap synthesized for ${roleToForge}! 3 personalized routes generated with Gemini.`,
          4000
        );
      } catch (err) {
        clearTimeout(timerId);
        console.error('[RouteForge] API error during roadmap generation:', err);
        setRoadmapError(err.message || 'Failed to synthesize roadmap. Check backend connectivity.');
        triggerMascotReaction('confused', `Synthesis notice: ${err.message || 'Backend unavailable'}`, 4000);
      } finally {
        setIsLoadingRoadmap(false);
      }
    },
    [selectedRole, currentSkills, completedSkills, routeConfigs, triggerMascotReaction, scrollToTop]
  );

  // Demo Fallback option in case backend or external API is offline
  const handleUseDemoFallback = useCallback(() => {
    setIsLiveGenerated(false);
    setRoadmapError(null);
    setMaxStepReached(5);
    setCurrentStep(3);
    scrollToTop();
    triggerMascotReaction('happy', 'Demo roadmap loaded for analysis and exploration.', 2500);
  }, [scrollToTop, triggerMascotReaction]);

  // Restart / New Journey action
  const handleResetJourney = useCallback(() => {
    setCurrentStep(1);
    setMaxStepReached(2);
    setRoadmapError(null);
    scrollToTop();
    triggerMascotReaction('neutral', 'Where do you want your career to go?', 2000);
  }, [scrollToTop, triggerMascotReaction]);

  // Section Observer for Advanced View
  useEffect(() => {
    if (!isAdvancedMode) return;
    const sectionIds = ['discover', 'analyze', 'compare', 'build', 'track'];
    const elements = sectionIds
      .map((id) => document.getElementById(`section-${id}`))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id.replace('section-', '');
            setActiveSection(sectionName);
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isAdvancedMode]);

  const selectedRouteConfig = routeConfigs[selectedRouteId] || ROUTE_CONFIGS[selectedRouteId] || ROUTE_CONFIGS['fastest'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Interactive Orange Cursor Tracker */}
      <CursorTracker />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header with Step Navigation and Reset */}
      <Header
        currentStep={currentStep}
        maxStepReached={maxStepReached}
        onSelectStep={goToStep}
        isAdvancedMode={isAdvancedMode}
        onToggleAdvancedMode={() => setIsAdvancedMode(!isAdvancedMode)}
        onResetJourney={handleResetJourney}
      />

      {/* Persistent 5-Stage Career Journey Stepper */}
      <JourneyStepper
        currentStep={currentStep}
        maxStepReached={maxStepReached}
        onSelectStep={goToStep}
        isLiveGenerated={isLiveGenerated}
      />

      {/* Main Experience: 5-Stage Career Journey */}
      <main style={{ flex: 1 }}>
        {/* STAGE 1: Discover Destination */}
        {currentStep === 1 && (
          <StepDiscover
            selectedRole={selectedRole}
            onSelectRole={handleSelectRole}
            onNextStep={() => {
              setMaxStepReached(Math.max(maxStepReached, 2));
              goToStep(2);
            }}
            onTriggerMascotReaction={triggerMascotReaction}
          />
        )}

        {/* STAGE 2: Map Starting Point */}
        {currentStep === 2 && (
          <StepStartingPoint
            targetRole={selectedRole}
            currentSkills={currentSkills}
            onToggleSkill={handleToggleCurrentSkill}
            onAddCustomSkill={handleAddCustomSkill}
            onRemoveSkill={handleRemoveSkill}
            completedSkills={completedSkills}
            onAddCompletedSkill={handleAddCompletedSkill}
            onRemoveCompletedSkill={handleRemoveCompletedSkill}
            weeklyHours={weeklyHours}
            onChangeWeeklyHours={setWeeklyHours}
            budgetInr={budgetInr}
            onChangeBudgetInr={setBudgetInr}
            onGenerateRoadmap={handleGenerateRoadmap}
            isLoadingRoadmap={isLoadingRoadmap}
            roadmapError={roadmapError}
            onPrevStep={() => goToStep(1)}
            onUseDemoFallback={handleUseDemoFallback}
          />
        )}

        {/* STAGE 3: Analyze Skill Gap */}
        {currentStep === 3 && (
          <StepSkillGap
            targetRole={selectedRole}
            currentSkills={currentSkills}
            skillCategories={skillCategories}
            currentMilestones={currentMilestones}
            weeklyHours={weeklyHours}
            onNextStep={() => {
              setMaxStepReached(Math.max(maxStepReached, 4));
              goToStep(4);
            }}
            onPrevStep={() => goToStep(2)}
            isLiveGenerated={isLiveGenerated}
            roadmapNote={roadmapNote}
          />
        )}

        {/* STAGE 4: Choose Route Strategy */}
        {currentStep === 4 && (
          <StepChooseRoute
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            onProceedToRoadmap={(routeId) => {
              setSelectedRouteId(routeId);
              setMaxStepReached(Math.max(maxStepReached, 5));
              goToStep(5);
            }}
            onPrevStep={() => goToStep(3)}
            routeConfigs={routeConfigs}
            allRouteMilestones={allRouteMilestones}
            isLiveGenerated={isLiveGenerated}
            roadmapNote={roadmapNote}
            targetRole={selectedRole}
          />
        )}

        {/* STAGE 5: Follow Your Roadmap */}
        {currentStep === 5 && (
          <StepFollowRoadmap
            targetRole={selectedRole}
            selectedRouteId={selectedRouteId}
            onSelectRoute={setSelectedRouteId}
            milestones={currentMilestones}
            onToggleMilestoneComplete={handleToggleMilestoneComplete}
            routeConfigs={routeConfigs}
            customEdges={allRouteEdges[selectedRouteId]}
            onGoToChooseRoute={() => goToStep(4)}
            onGoToStartingPoint={() => goToStep(2)}
            isLiveGenerated={isLiveGenerated}
            roadmapNote={roadmapNote}
          />
        )}

        {/* Optional Advanced View: All Panels Display (Preserved for Deep Inspection) */}
        {isAdvancedMode && (
          <div
            style={{
              borderTop: '2px dashed var(--accent-orange)',
              marginTop: '60px',
              paddingTop: '40px',
              background: 'rgba(5, 5, 4, 0.95)'
            }}
          >
            <div className="tech-container" style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-orange)',
                  background: 'rgba(255, 106, 0, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                // ADVANCED INSPECTION MODE // ALL WORKSPACE PANELS VISIBLE
              </div>
            </div>

            <HeroSection
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              experienceLevel={experienceLevel}
              onChangeExperienceLevel={setExperienceLevel}
              onGenerateRoadmap={handleGenerateRoadmap}
              readinessScore={telemetry.overallReadiness}
              mascotState={mascotState}
              mascotMessage={mascotMessage}
              onTriggerMascotReaction={triggerMascotReaction}
              isLoadingRoadmap={isLoadingRoadmap}
              roadmapError={roadmapError}
              onRetryRoadmap={() => handleGenerateRoadmap()}
              isLiveGenerated={isLiveGenerated}
            />

            <div style={{ margin: '10px 0 20px' }}>
              <ChapterRail activeSection={activeSection} />
            </div>

            <AnalyzeSection
              selectedRole={selectedRole}
              skillCategories={skillCategories}
              onToggleSkill={(catId, skillId) => {
                setSkillCategories((prev) =>
                  prev.map((c) =>
                    c.id !== catId
                      ? c
                      : {
                          ...c,
                          skills: c.skills.map((s) =>
                            s.id !== skillId ? s : { ...s, known: !s.known }
                          )
                        }
                  )
                );
              }}
              telemetry={telemetry}
            />

            <CompareSection
              selectedRouteId={selectedRouteId}
              onSelectRoute={setSelectedRouteId}
              routeConfigs={routeConfigs}
              isLiveGenerated={isLiveGenerated}
              roadmapNote={roadmapNote}
            />

            <BuildSection
              selectedRouteId={selectedRouteId}
              milestones={currentMilestones}
              onToggleMilestoneComplete={handleToggleMilestoneComplete}
              routeConfigs={routeConfigs}
              customEdges={allRouteEdges[selectedRouteId]}
              isLiveGenerated={isLiveGenerated}
              roadmapNote={roadmapNote}
            />

            <TrackSection
              telemetry={telemetry}
              milestones={currentMilestones}
              onToggleMilestoneComplete={handleToggleMilestoneComplete}
              selectedRouteName={selectedRouteConfig.name}
            />
          </div>
        )}
      </main>

      {/* Floating Interactive Lumi Assistant with Stage-Specific Advice */}
      <LumiFloatingAssistant
        currentStep={currentStep}
        targetRole={selectedRole}
        mascotState={mascotState}
        mascotMessage={mascotMessage}
        onTriggerReaction={triggerMascotReaction}
        isLoadingRoadmap={isLoadingRoadmap}
        onGoToStep={goToStep}
      />

      {/* Footer */}
      <FooterSection onOpenBuilder={() => goToStep(1)} />
    </div>
  );
}
