import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CursorTracker from './components/CursorTracker';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import ChapterRail from './components/ChapterRail';
import RightSidebarIndex from './components/RightSidebarIndex';
import HeroSection from './components/HeroSection';
import AnalyzeSection from './components/AnalyzeSection';
import CompareSection from './components/CompareSection';
import BuildSection from './components/BuildSection';
import TrackSection from './components/TrackSection';
import FooterSection from './components/FooterSection';

import {
  INITIAL_ROLES,
  SKILL_CATEGORIES,
  ROUTE_CONFIGS,
  ROUTE_MILESTONES,
  calculateTelemetry
} from './data/careerData';

export default function App() {
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level');
  const [selectedRouteId, setSelectedRouteId] = useState('fastest');
  const [skillCategories, setSkillCategories] = useState(SKILL_CATEGORIES);
  const [allRouteMilestones, setAllRouteMilestones] = useState(ROUTE_MILESTONES);
  const [activeSection, setActiveSection] = useState('discover');

  // Current milestones for selected route
  const currentMilestones = useMemo(() => {
    return allRouteMilestones[selectedRouteId] || allRouteMilestones['fastest'];
  }, [allRouteMilestones, selectedRouteId]);

  // Telemetry computation
  const telemetry = useMemo(() => {
    return calculateTelemetry(skillCategories, currentMilestones);
  }, [skillCategories, currentMilestones]);

  // Section Observer for scroll-driven Chapter Rail and Right Sidebar
  useEffect(() => {
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
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Toggle Skill
  const handleToggleSkill = useCallback((categoryId, skillId) => {
    setSkillCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          skills: cat.skills.map((sk) => {
            if (sk.id !== skillId) return sk;
            return { ...sk, known: !sk.known };
          })
        };
      })
    );
  }, []);

  // Toggle Milestone Complete
  const handleToggleMilestoneComplete = useCallback(
    (milestoneId) => {
      setAllRouteMilestones((prevMap) => {
        const routeList = prevMap[selectedRouteId] || [];
        const updatedList = routeList.map((m) => {
          if (m.id !== milestoneId) return m;
          const nextStatus = m.status === 'completed' ? 'pending' : 'completed';
          return { ...m, status: nextStatus };
        });
        return {
          ...prevMap,
          [selectedRouteId]: updatedList
        };
      });
    },
    [selectedRouteId]
  );

  // Generate roadmap action
  const handleGenerateRoadmap = useCallback(() => {
    const el = document.getElementById('section-analyze');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Open builder action
  const handleOpenBuilder = useCallback(() => {
    const el = document.getElementById('section-discover');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const selectedRouteConfig = ROUTE_CONFIGS[selectedRouteId] || ROUTE_CONFIGS['fastest'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Interactive Orange Cursor Tracker */}
      <CursorTracker />

      {/* Background Vertical Aesthetic Guide Rails */}
      <div className="technical-vertical-rails" aria-hidden="true">
        <div className="technical-rail-line" />
        <div className="technical-rail-line" style={{ display: 'none' }} />
        <div className="technical-rail-line" />
      </div>

      {/* Right Edge Telemetry Index */}
      <RightSidebarIndex
        activeSection={activeSection}
        readinessScore={telemetry.overallReadiness}
      />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header */}
      <Header onOpenBuilder={handleOpenBuilder} />

      {/* Section 01: Discover (Hero) */}
      <main style={{ flex: 1 }}>
        <HeroSection
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          experienceLevel={experienceLevel}
          onChangeExperienceLevel={setExperienceLevel}
          onGenerateRoadmap={handleGenerateRoadmap}
          readinessScore={telemetry.overallReadiness}
        />

        {/* Chapter Rail Anchored Between Discover and Deep Analysis */}
        <div style={{ margin: '10px 0 20px' }}>
          <ChapterRail activeSection={activeSection} />
        </div>

        {/* Section 02: Analyze (Skill Gap Matrix) */}
        <AnalyzeSection
          selectedRole={selectedRole}
          skillCategories={skillCategories}
          onToggleSkill={handleToggleSkill}
          telemetry={telemetry}
        />

        {/* Section 03: Compare (3 Alternative Routes) */}
        <CompareSection
          selectedRouteId={selectedRouteId}
          onSelectRoute={setSelectedRouteId}
        />

        {/* Section 04: Build (DAG Interactive Graph & Inspector) */}
        <BuildSection
          selectedRouteId={selectedRouteId}
          milestones={currentMilestones}
          onToggleMilestoneComplete={handleToggleMilestoneComplete}
        />

        {/* Section 05: Track (Telemetry & Verification Checklist) */}
        <TrackSection
          telemetry={telemetry}
          milestones={currentMilestones}
          onToggleMilestoneComplete={handleToggleMilestoneComplete}
          selectedRouteName={selectedRouteConfig.name}
        />
      </main>

      {/* Final CTA & Technical Footer */}
      <FooterSection onOpenBuilder={handleOpenBuilder} />
    </div>
  );
}
