import {
  Dumbbell,
  Activity,
  Minus,
  ArrowUp,
  ArrowDown,
  Maximize2,
  CircleDot,
  Target,
  Check,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';

interface BuildScreenProps {
  selectedBuilds: string[];
  otherText?: string;
  onToggleBuild: (item: string) => void;
  onChangeOther?: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

const BUILD_ITEMS: { name: string; icon: typeof Dumbbell }[] = [
  { name: 'ATHLETIC', icon: Dumbbell },
  { name: 'CURVY', icon: Activity },
  { name: 'THIN', icon: Minus },
  { name: 'TALL', icon: ArrowUp },
  { name: 'SHORT', icon: ArrowDown },
  { name: 'LONG LEGS', icon: Maximize2 },
  { name: 'BIG BREASTS', icon: CircleDot },
  { name: 'SHAPELY BUTT', icon: Target },
];

export function BuildScreen({
  selectedBuilds,
  onToggleBuild,
  onNext,
  onBack,
}: BuildScreenProps) {
  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header: Step Indicator & Progress Bar */}
      <div>
        <div className="pb-3 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1ca63]">
            <span>STEP 6 OF 8 • HER BODY TYPE</span>
            <span>75%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-[3px] bg-[#121926] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d8a838] to-[#f1ca63] rounded-full shadow-[0_0_8px_#f1ca63]"
              style={{ width: '75%' }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center pt-2 pb-3">
          <h2 className="font-serif-gold text-base sm:text-lg font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            HER BODY TYPE
          </h2>

          <div className="flex items-center justify-center my-1.5 opacity-60">
            <span className="text-[#f1ca63] text-xs">✦</span>
          </div>

          <p className="text-xs text-[#b9b7ad] font-normal tracking-wide m-0">
            Select all that apply
          </p>
        </div>

        {/* Option Rows */}
        <div className="space-y-2 my-auto py-1">
          {BUILD_ITEMS.map((item) => {
            const isSelected = selectedBuilds.includes(item.name);
            const IconComponent = item.icon;

            return (
              <button
                key={item.name}
                type="button"
                id={`build-opt-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onToggleBuild(item.name)}
                className={`w-full py-2.5 px-3.5 rounded-xl font-serif-gold text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] border-[#f1ca63] text-[#0a0e14] shadow-[0_4px_16px_rgba(216,168,56,0.3)]'
                    : 'bg-[#040813] text-[#f1ca63] border-[#554018] hover:border-[#f1ca63] hover:bg-[#07101f]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#0a0e14]' : 'text-[#f1ca63]'
                    }`}
                    strokeWidth={2}
                  />
                  <span className={`font-serif-gold uppercase tracking-wider ${isSelected ? 'text-[#0a0e14] font-black' : 'text-[#eee]'}`}>
                    {item.name}
                  </span>
                </div>

                <div
                  className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'border-2 border-[#0a0e14] bg-[#0a0e14]/10'
                      : 'border border-[#6b5220] bg-transparent'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-[#0a0e14]" strokeWidth={3.5} />}
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
          id="build-next-btn"
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
