import React, { useState } from 'react';
import { UserProfile, EngagementRecord, NewEngagementDraft, FlowStep } from '../types';
import { SplashScreen } from './Screens/SplashScreen';
import { RegisterScreen } from './Screens/RegisterScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { ScoreScreen } from './Screens/ScoreScreen';
import { FeelingScreen } from './Screens/FeelingScreen';
import { LocationScreen } from './Screens/LocationScreen';
import { AttireScreen } from './Screens/AttireScreen';
import { EyesScreen } from './Screens/EyesScreen';
import { BuildScreen } from './Screens/BuildScreen';
import { HairScreen } from './Screens/HairScreen';
import { CommentsScreen } from './Screens/CommentsScreen';
import { ReviewScreen } from './Screens/ReviewScreen';
import { ConfirmationScreen } from './Screens/ConfirmationScreen';
import { CreateReportScreen } from './Screens/CreateReportScreen';
import { ReportSummaryScreen } from './Screens/ReportSummaryScreen';
import { EngagementsListScreen } from './Screens/EngagementsListScreen';
import { EngagementDetailScreen } from './Screens/EngagementDetailScreen';
import { SettingsScreen } from './Screens/SettingsScreen';
import {
  Maximize2,
  Smartphone,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles,
  X,
  ExternalLink,
} from 'lucide-react';

interface ShowcaseViewProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  draft: NewEngagementDraft;
  startDate: string;
  endDate: string;
  onSetDates: (start: string, end: string) => void;
  onOpenScreenInSimulator: (step: FlowStep) => void;
  onDeleteEngagement: (id: string) => void;
  onSaveProfile?: (profile: UserProfile) => void;
}

type ScreenCategory = 'all' | 'onboarding' | 'logging' | 'reports' | 'settings';

interface MiniPhoneFrameProps {
  stepNumber: number;
  stepTitle: string;
  category: string;
  onClick: () => void;
  onInspect?: () => void;
  children: React.ReactNode;
}

const MiniPhoneFrame: React.FC<MiniPhoneFrameProps> = ({
  stepNumber,
  stepTitle,
  category,
  onClick,
  onInspect,
  children,
}) => {
  return (
    <div className="flex flex-col items-center group w-full max-w-[290px] mx-auto">
      {/* Step Header Badge */}
      <div className="flex items-center justify-between w-full px-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] text-[10px] font-black flex items-center justify-center shadow-md shrink-0">
            {stepNumber}
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#f1ca63] truncate">
            {stepTitle}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#8c8c88] px-1.5 py-0.5 rounded bg-[#030814] border border-[#554018]/50">
          {category}
        </span>
      </div>

      {/* Mini Smartphone Frame */}
      <div className="relative w-full h-[570px] bg-[#030814] rounded-[38px] p-2.5 shadow-[0_0_0_1.5px_#765b24,0_15px_35px_rgba(0,0,0,0.95)] border border-[#f1ca63]/30 flex flex-col justify-between hover:border-[#f1ca63] hover:shadow-[0_0_25px_rgba(241,202,99,0.3)] transition-all overflow-hidden select-none">
        {/* Lion Crest Watermark with 5% Opacity */}
        <div
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <img
            src="/Logo+lookaway.png"
            alt=""
            className="w-[70%] object-contain pointer-events-none"
            style={{ opacity: 0.05 }}
          />
        </div>

        {/* Scaled Content View */}
        <div className="relative z-10 flex-1 overflow-y-auto px-0.5 py-0.5 transform scale-[0.88] origin-top bg-transparent no-scrollbar">
          {children}
        </div>

        {/* Hover Click to Expand Overlay */}
        <div className="absolute inset-0 bg-[#030814]/85 opacity-0 group-hover:opacity-100 backdrop-blur-xs flex flex-col items-center justify-center gap-2.5 transition-opacity z-30 p-4">
          <button
            type="button"
            onClick={onInspect || onClick}
            className="w-full max-w-[200px] py-2.5 px-4 rounded-xl text-[11px] font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] hover:brightness-110 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Inspect Screen {stepNumber}
          </button>

          <button
            type="button"
            onClick={onClick}
            className="w-full max-w-[200px] py-2 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 bg-[#030814] border border-[#f1ca63] text-[#f1ca63] hover:bg-[#07101f] cursor-pointer"
          >
            <ExternalLink className="w-3 h-3" />
            Open in Live Phone
          </button>
        </div>

      </div>
    </div>
  );
}

export function ShowcaseView({
  user,
  engagements,
  draft,
  onOpenScreenInSimulator,
  onSaveProfile,
}: ShowcaseViewProps) {
  const [activeCategory, setActiveCategory] = useState<ScreenCategory>('all');
  const [inspectIndex, setInspectIndex] = useState<number | null>(null);

  // Pre-populated demo review draft matching design reference
  const demoReviewDraft: NewEngagementDraft = {
    score: 2,
    feelings: ['HUNGRY', 'STRESSED'],
    feelingsOther: '',
    locations: ['DRIVING', 'ON PHONE'],
    locationsOther: '',
    attire: ['YOGA PANTS', 'TIGHT JEANS'],
    attireOther: '',
    eyesWentTo: ['BUTT', 'LEGS'],
    eyesOther: '',
    herBuild: ['CURVY', 'LONG LEGS'],
    herBuildOther: '',
    hairColor: 'BROWN / AUBURN',
    hairColorOther: '',
    comments: 'She was at the gas station and walking to her car.',
    triggers: [],
  };

  const sampleEngagement = engagements[0] || {
    id: 'eng-sample-1',
    timestamp: new Date().toISOString(),
    dateStr: 'May 24, 2025',
    timeStr: '10:15 AM',
    score: 2,
    scoreLabel: '2 – LOOK',
    feelings: ['Hungry', 'Stressed'],
    locations: ['Driving', 'On Phone'],
    attire: ['Yoga Pants', 'Tight Jeans'],
    eyesWentTo: ['Butt', 'Legs'],
    herBuild: ['Curvy', 'Long Legs'],
    hairColor: 'Brown / Auburn',
    comments: 'Visual engagement logged.',
    triggers: [],
  };

  // Define all 18 screens with metadata and render function
  const ALL_SCREENS: {
    number: number;
    title: string;
    category: ScreenCategory;
    step: FlowStep;
    render: () => React.ReactNode;
  }[] = [
    {
      number: 1,
      title: 'Splash Screen',
      category: 'onboarding',
      step: 'splash',
      render: () => (
        <SplashScreen onGetStarted={() => onOpenScreenInSimulator('register')} />
      ),
    },
    {
      number: 2,
      title: 'Register & Mentor',
      category: 'onboarding',
      step: 'register',
      render: () => (
        <RegisterScreen
          user={user}
          onSaveProfile={() => {}}
          onContinue={() => onOpenScreenInSimulator('home')}
        />
      ),
    },
    {
      number: 3,
      title: 'Home Dashboard',
      category: 'onboarding',
      step: 'home',
      render: () => (
        <HomeScreen
          user={user}
          engagements={engagements}
          onStartLogging={() => onOpenScreenInSimulator('score')}
          onCreateReport={() => onOpenScreenInSimulator('create_report')}
          onViewReports={() => onOpenScreenInSimulator('report_summary')}
        />
      ),
    },
    {
      number: 4,
      title: 'Step 1: Score Level',
      category: 'logging',
      step: 'score',
      render: () => (
        <ScoreScreen
          selectedScore={2}
          onSelectScore={() => {}}
          onNext={() => onOpenScreenInSimulator('feeling')}
          onBack={() => onOpenScreenInSimulator('home')}
        />
      ),
    },
    {
      number: 5,
      title: 'Step 2: Feelings',
      category: 'logging',
      step: 'feeling',
      render: () => (
        <FeelingScreen
          selectedFeelings={['HUNGRY', 'STRESSED']}
          otherText=""
          onToggleFeeling={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('location')}
          onBack={() => onOpenScreenInSimulator('score')}
        />
      ),
    },
    {
      number: 6,
      title: 'Step 3: Location',
      category: 'logging',
      step: 'location',
      render: () => (
        <LocationScreen
          selectedLocations={['DRIVING', 'ON PHONE']}
          otherText=""
          onToggleLocation={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('attire')}
          onBack={() => onOpenScreenInSimulator('feeling')}
        />
      ),
    },
    {
      number: 7,
      title: 'Step 4: Her Attire',
      category: 'logging',
      step: 'attire',
      render: () => (
        <AttireScreen
          selectedAttire={['YOGA PANTS', 'TIGHT JEANS']}
          otherText=""
          onToggleAttire={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('eyes')}
          onBack={() => onOpenScreenInSimulator('location')}
        />
      ),
    },
    {
      number: 8,
      title: 'Step 5: Eyes Went To',
      category: 'logging',
      step: 'eyes',
      render: () => (
        <EyesScreen
          selectedEyes={['BUTT', 'LEGS']}
          otherText=""
          onToggleEyes={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('build')}
          onBack={() => onOpenScreenInSimulator('attire')}
        />
      ),
    },
    {
      number: 9,
      title: 'Step 6: Her Body Type',
      category: 'logging',
      step: 'build',
      render: () => (
        <BuildScreen
          selectedBuilds={['CURVY', 'LONG LEGS']}
          otherText=""
          onToggleBuild={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('hair')}
          onBack={() => onOpenScreenInSimulator('eyes')}
        />
      ),
    },
    {
      number: 10,
      title: 'Step 7: Hair Color',
      category: 'logging',
      step: 'hair',
      render: () => (
        <HairScreen
          selectedHair="BROWN"
          otherText=""
          onSelectHair={() => {}}
          onChangeOther={() => {}}
          onNext={() => onOpenScreenInSimulator('comments')}
          onBack={() => onOpenScreenInSimulator('build')}
        />
      ),
    },
    {
      number: 11,
      title: 'Step 8: Comments',
      category: 'logging',
      step: 'comments',
      render: () => (
        <CommentsScreen
          comments="She was at the gas station and walking to her car."
          onChangeComments={() => {}}
          onNext={() => onOpenScreenInSimulator('review')}
          onBack={() => onOpenScreenInSimulator('hair')}
        />
      ),
    },
    {
      number: 12,
      title: 'Review Engagement',
      category: 'logging',
      step: 'review',
      render: () => (
        <ReviewScreen
          draft={demoReviewDraft}
          onEdit={() => onOpenScreenInSimulator('score')}
          onSubmit={() => onOpenScreenInSimulator('confirmation')}
        />
      ),
    },
    {
      number: 13,
      title: 'Engagement Logged',
      category: 'logging',
      step: 'confirmation',
      render: () => (
        <ConfirmationScreen
          lastEngagement={sampleEngagement}
          onHome={() => onOpenScreenInSimulator('home')}
          onViewReports={() => onOpenScreenInSimulator('report_summary')}
          onLogAnother={() => onOpenScreenInSimulator('score')}
        />
      ),
    },
    {
      number: 14,
      title: 'Create Report',
      category: 'reports',
      step: 'create_report',
      render: () => (
        <CreateReportScreen
          user={user}
          startDate="2025-04-24"
          endDate="2025-05-24"
          onUpdateDates={() => {}}
          onGenerateReport={() => onOpenScreenInSimulator('report_summary')}
          onBack={() => onOpenScreenInSimulator('home')}
        />
      ),
    },
    {
      number: 15,
      title: 'Report Summary',
      category: 'reports',
      step: 'report_summary',
      render: () => (
        <ReportSummaryScreen
          user={user}
          engagements={engagements}
          onCreateReport={() => onOpenScreenInSimulator('create_report')}
          startDate="2025-04-24"
          endDate="2025-05-24"
          onBack={() => onOpenScreenInSimulator('create_report')}
          onViewEngagements={() => onOpenScreenInSimulator('engagements_list')}
        />
      ),
    },
    {
      number: 16,
      title: 'Engagements List',
      category: 'reports',
      step: 'engagements_list',
      render: () => (
        <EngagementsListScreen
          engagements={engagements}
          onBack={() => onOpenScreenInSimulator('report_summary')}
          onSelectEngagement={() => onOpenScreenInSimulator('engagement_detail')}
        />
      ),
    },
    {
      number: 17,
      title: 'Engagement Detail',
      category: 'reports',
      step: 'engagement_detail',
      render: () => (
        <EngagementDetailScreen
          engagement={sampleEngagement}
          onBack={() => onOpenScreenInSimulator('engagements_list')}
          onEdit={() => onOpenScreenInSimulator('comments')}
        />
      ),
    },
    {
      number: 18,
      title: 'Account Settings',
      category: 'settings',
      step: 'settings',
      render: () => (
        <SettingsScreen
          user={user}
          engagements={engagements}
          onSaveProfile={onSaveProfile || (() => {})}
          onResetSampleData={() => {}}
          onClearAllData={() => {}}
          onImportData={() => {}}
        />
      ),
    },
  ];

  const filteredScreens =
    activeCategory === 'all'
      ? ALL_SCREENS
      : ALL_SCREENS.filter((s) => s.category === activeCategory);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto py-3 px-2 sm:px-4 space-y-8 bg-[#030814] select-none">
      {/* Top Banner & Title */}
      <div className="text-center relative py-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1ca63]/10 border border-[#f1ca63]/30 text-[10px] font-bold text-[#f1ca63] uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>OFFICIAL MOBILE SYSTEM • ALL 18 SCREENS</span>
        </div>

        <h2 className="font-serif-gold text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.18em] text-[#f1ca63] uppercase m-0">
          MOBILE SCREENSHOTS GALLERY
        </h2>

        <p className="text-xs text-[#b9b7ad] tracking-wide mt-1.5 leading-relaxed">
          High-resolution iPhone versions of every step in the accountability flow. 
          Click any screen to inspect at full size, or open it in the interactive simulator.
        </p>

        {/* Action Controls & Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <div className="flex items-center gap-1 p-1 bg-[#040813] border border-[#6b5220] rounded-xl overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              All 18 Screens
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('onboarding')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'onboarding'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              Onboarding (1-3)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('logging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'logging'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              Logging Flow (4-13)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('reports')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'reports'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              Reports & Logs (14-17)
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === 'settings'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              Settings (18)
            </button>
          </div>

          {/* Quick Print / Export Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print or export screenshots sheet as PDF"
            className="px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase bg-[#040813] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#f1ca63]" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Grid of Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 justify-items-center">
        {filteredScreens.map((item, idx) => (
          <MiniPhoneFrame
            key={item.number}
            stepNumber={item.number}
            stepTitle={item.title}
            category={item.category}
            onClick={() => onOpenScreenInSimulator(item.step)}
            onInspect={() => setInspectIndex(ALL_SCREENS.findIndex((s) => s.number === item.number))}
          >
            {item.render()}
          </MiniPhoneFrame>
        ))}
      </div>

      {/* Full-Screen Inspector Modal */}
      {inspectIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#000]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-[480px] flex flex-col items-center">
            {/* Header controls inside Inspector */}
            <div className="w-full flex items-center justify-between pb-3 text-[#f1ca63]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#0a0e14] text-xs font-black flex items-center justify-center shadow-md">
                  {ALL_SCREENS[inspectIndex].number}
                </span>
                <span className="font-serif-gold font-bold text-sm sm:text-base tracking-wider text-[#f1ca63] uppercase">
                  {ALL_SCREENS[inspectIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenScreenInSimulator(ALL_SCREENS[inspectIndex].step);
                    setInspectIndex(null);
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-[#040813] border border-[#f1ca63] text-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Live Simulator</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInspectIndex(null)}
                  className="p-1.5 rounded-lg bg-[#040813] border border-[#6b5220] text-[#eee] hover:text-[#f1ca63] hover:border-[#f1ca63] cursor-pointer"
                  title="Close Inspector"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 1:1 Full-Resolution Mobile Phone Frame */}
            <div className="relative w-full max-w-[390px] h-[780px] max-h-[85vh] bg-[#030814] rounded-[48px] p-3 shadow-[0_0_0_2px_#765b24,0_25px_60px_rgba(0,0,0,0.95)] border border-[#f1ca63]/40 flex flex-col justify-between overflow-hidden select-none">
              {/* Watermark with 5% Opacity */}
              <div
                className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center select-none"
                aria-hidden="true"
              >
                <img
                  src="/Logo+lookaway.png"
                  alt=""
                  className="w-[75%] max-w-[280px] object-contain pointer-events-none"
                  style={{ opacity: 0.05 }}
                />
              </div>

              {/* Render Selected Screen */}
              <div className="relative z-10 flex-1 overflow-y-auto px-1 sm:px-2 py-1 select-text">
                {ALL_SCREENS[inspectIndex].render()}
              </div>

            </div>

            {/* Bottom Step Switcher (< Previous | Next >) */}
            <div className="w-full flex items-center justify-between pt-3 text-xs">
              <button
                type="button"
                disabled={inspectIndex === 0}
                onClick={() => setInspectIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                className="px-4 py-2 rounded-xl bg-[#040813] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Screen</span>
              </button>

              <span className="text-xs text-[#b9b7ad] font-mono">
                {inspectIndex + 1} / {ALL_SCREENS.length}
              </span>

              <button
                type="button"
                disabled={inspectIndex === ALL_SCREENS.length - 1}
                onClick={() =>
                  setInspectIndex((prev) => (prev !== null && prev < ALL_SCREENS.length - 1 ? prev + 1 : prev))
                }
                className="px-4 py-2 rounded-xl bg-[#040813] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
              >
                <span>Next Screen</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
