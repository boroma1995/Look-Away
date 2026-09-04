import React from 'react';
import { FlowStep } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhoneSimulatorProps {
  currentStep: FlowStep;
  onSetStep: (step: FlowStep) => void;
  children: React.ReactNode;
}

export const ALL_18_FLOW_STEPS: { step: FlowStep; num: number; label: string }[] = [
  { step: 'splash', num: 1, label: 'Splash' },
  { step: 'register', num: 2, label: 'Register' },
  { step: 'home', num: 3, label: 'Home' },
  { step: 'score', num: 4, label: 'Score' },
  { step: 'feeling', num: 5, label: 'Feeling' },
  { step: 'location', num: 6, label: 'Location' },
  { step: 'attire', num: 7, label: 'Attire' },
  { step: 'eyes', num: 8, label: 'Eyes' },
  { step: 'build', num: 9, label: 'Build' },
  { step: 'hair', num: 10, label: 'Hair' },
  { step: 'comments', num: 11, label: 'Comments' },
  { step: 'review', num: 12, label: 'Review' },
  { step: 'confirmation', num: 13, label: 'Confirmed' },
  { step: 'create_report', num: 14, label: 'Create Report' },
  { step: 'report_summary', num: 15, label: 'Report Summary' },
  { step: 'engagements_list', num: 16, label: 'Engagements' },
  { step: 'engagement_detail', num: 17, label: 'Detail' },
  { step: 'settings', num: 18, label: 'Settings' },
];

export const ALL_16_FLOW_STEPS = ALL_18_FLOW_STEPS;

export function PhoneSimulator({ currentStep, onSetStep, children }: PhoneSimulatorProps) {
  const currentIdx = ALL_18_FLOW_STEPS.findIndex((s) => s.step === currentStep);

  const handlePrevStep = () => {
    if (currentIdx > 0) {
      onSetStep(ALL_18_FLOW_STEPS[currentIdx - 1].step);
    }
  };

  const handleNextStep = () => {
    if (currentIdx < ALL_18_FLOW_STEPS.length - 1) {
      onSetStep(ALL_18_FLOW_STEPS[currentIdx + 1].step);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 px-1 w-full">
      {/* 16-Screen Quick Step Selector Bar */}
      <div className="w-full max-w-[480px] mb-3 flex items-center justify-between bg-[#030814] border border-[#765b24]/60 rounded-xl p-2 shadow-lg">
        <button
          onClick={handlePrevStep}
          disabled={currentIdx <= 0}
          className="p-1 text-[#d9bd61] hover:text-[#fff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Previous screen"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 max-w-[360px] no-scrollbar">
          {ALL_16_FLOW_STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => onSetStep(s.step)}
              title={`${s.num}. ${s.label}`}
              className={`w-6 h-6 rounded-full text-[10px] font-black shrink-0 transition-all cursor-pointer ${
                currentStep === s.step
                  ? 'bg-gradient-to-b from-[#f1ca63] to-[#c9982c] text-[#030814] ring-2 ring-[#f1ca63]/60 scale-110 shadow-md'
                  : 'bg-[#030814] border border-[#765b24]/60 text-[#d9bd61] hover:border-[#f1ca63]'
              }`}
            >
              {s.num}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextStep}
          disabled={currentIdx >= ALL_16_FLOW_STEPS.length - 1}
          className="p-1 text-[#d9bd61] hover:text-[#fff] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title="Next screen"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[440px] sm:w-[390px] sm:h-[810px] min-h-[620px] bg-[#030814] rounded-2xl sm:rounded-[52px] p-2 sm:p-3 sm:shadow-[0_0_0_2px_#765b24,0_0_0_5px_#030814,0_25px_60px_rgba(0,0,0,0.95)] border border-[#765b24]/50 sm:border-[#f1ca63]/30 flex flex-col justify-between select-none">
        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#030814] rounded-xl sm:rounded-[42px] overflow-hidden flex flex-col justify-between border border-[#765b24]/40 shadow-inner">
          {/* Phone Screen Watermark with 5% Opacity */}
          <div
            className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
            aria-hidden="true"
          >
            <img
              src="/Logo+lookaway.png"
              alt=""
              className="w-[75%] max-w-[280px] object-contain pointer-events-none"
              style={{ opacity: 0.05 }}
            />
          </div>

          {/* Screen Content Area */}
          <div className="relative z-10 flex-1 overflow-y-auto px-1.5 sm:px-2 py-2 select-text">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
