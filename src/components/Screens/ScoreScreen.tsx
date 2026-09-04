import { ScoreLevel } from '../../types';
import { Eye, EyeOff, Clock, Heart, Check, ChevronLeft, ArrowRight } from 'lucide-react';

interface ScoreScreenProps {
  selectedScore: ScoreLevel | null;
  onSelectScore: (score: ScoreLevel) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const SCORE_LEVELS: {
  level: ScoreLevel;
  title: string;
  description: string;
  icon: typeof Eye;
}[] = [
  {
    level: 1,
    title: '1 - SEE',
    description: 'Saw her and then looked away immediately',
    icon: Eye,
  },
  {
    level: 2,
    title: '2 - LOOK',
    description: 'A second look that took conscious effort to redirect',
    icon: EyeOff,
  },
  {
    level: 3,
    title: '3 - PROLONGED LOOK',
    description: 'Prolonged look or lingering gaze (> 2-3 seconds)',
    icon: Clock,
  },
  {
    level: 4,
    title: '4 - LOOK WITH LONGING',
    description: 'Sustained lustful gaze, fantasy, or emotional craving',
    icon: Heart,
  },
];

export function ScoreScreen({
  selectedScore,
  onSelectScore,
  onNext,
  onBack,
}: ScoreScreenProps) {
  const handlePick = (level: ScoreLevel) => {
    onSelectScore(level);
  };

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header: Step Indicator & Progress Bar */}
      <div>
        <div className="pb-3 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1ca63]">
            <span>STEP 1 OF 8 • SEVERITY</span>
            <span>13%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-[3px] bg-[#121926] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d8a838] to-[#f1ca63] rounded-full shadow-[0_0_8px_#f1ca63]"
              style={{ width: '13%' }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center pt-2 pb-3">
          <h2 className="font-serif-gold text-base sm:text-lg font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            ENGAGEMENT SCORE
          </h2>

          <div className="flex items-center justify-center my-1.5 opacity-60">
            <span className="text-[#f1ca63] text-xs">✦</span>
          </div>

          <p className="text-xs text-[#b9b7ad] font-normal tracking-wide m-0">
            HOW DID YOU LOOK?
          </p>
        </div>

        {/* 4 Score Cards Matching Screen 2 */}
        <div className="space-y-3 my-auto py-1">
          {SCORE_LEVELS.map((item) => {
            const isSelected = selectedScore === item.level;
            const IconComponent = item.icon;
            return (
              <button
                key={item.level}
                type="button"
                id={`score-option-${item.level}`}
                onClick={() => handlePick(item.level)}
                className={`w-full p-3.5 sm:p-4 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] border-[#f1ca63] text-[#0a0e14] shadow-[0_4px_20px_rgba(216,168,56,0.35)]'
                    : 'bg-[#040813] text-[#eee] border-[#554018] hover:border-[#f1ca63] hover:bg-[#07101f]'
                }`}
              >
                {/* Left: Icon in Circle/Container */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#0a0e14]/10 text-[#0a0e14]' : 'bg-[#0a101f] text-[#f1ca63]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" strokeWidth={1.75} />
                </div>

                {/* Middle: Title & Subtitle */}
                <div className="flex-1 min-w-0 pr-1">
                  <span
                    className={`font-serif-gold text-xs sm:text-sm font-black tracking-wider uppercase block ${
                      isSelected ? 'text-[#0a0e14]' : 'text-[#f1ca63]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <p
                    className={`text-[11px] leading-snug mt-0.5 m-0 ${
                      isSelected ? 'text-[#262013] font-medium' : 'text-[#a9a79e]'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Right: Checkbox */}
                <div
                  className={`w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-2 border-[#0a0e14] bg-[#0a0e14]/10'
                      : 'border border-[#6b5220] bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0a0e14]" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Buttons: < BACK and NEXT -> */}
      <div className="pt-3 pb-1 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-bold tracking-widest uppercase bg-[#030814] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <button
          type="button"
          id="score-next-btn"
          onClick={onNext}
          className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(216,168,56,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
