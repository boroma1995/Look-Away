import { EngagementRecord } from '../../types';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface EngagementsListScreenProps {
  engagements: EngagementRecord[];
  onBack: () => void;
  onSelectEngagement: (engagement: EngagementRecord) => void;
}

export function EngagementsListScreen({
  engagements,
  onBack,
  onSelectEngagement,
}: EngagementsListScreenProps) {
  const avgScore = engagements.length
    ? (
        engagements.reduce((acc, curr) => acc + curr.score, 0) /
        engagements.length
      ).toFixed(1)
    : '2.3';

  return (
    <div className="w-full h-full min-h-[520px] max-w-[380px] mx-auto p-4 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-1 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="text-[#f1ca63] hover:text-[#fff] p-1 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          <h2 className="font-serif-gold text-xs sm:text-sm font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            ENGAGEMENTS
          </h2>

          <div className="w-5" />
        </div>

        {/* Date Range Subtitle */}
        <div className="text-center pb-2">
          <p className="text-[11px] sm:text-xs text-[#8c8c88] font-medium tracking-wide m-0">
            Apr 24 – May 24, 2025
          </p>
        </div>

        {/* Average Score Banner */}
        <div className="text-center pb-4">
          <span className="text-xs sm:text-sm font-serif-gold font-bold text-[#f1ca63] tracking-wider">
            Average Score: {avgScore}
          </span>
        </div>

        {/* Engagements List */}
        <div className="space-y-2.5 overflow-y-auto max-h-[380px] pr-0.5">
          {engagements.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectEngagement(item)}
              className="bg-[#030814] border border-[#765b24]/60 hover:border-[#f1ca63] hover:bg-[#07101f] rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all shadow-inner"
            >
              <div>
                <div className="text-xs font-bold text-[#eee]">{item.dateStr}</div>
                <div className="text-[10px] text-[#8c8c88] pt-0.5">{item.timeStr}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#f1ca63]/80 bg-[#f1ca63]/15 text-[#f1ca63] font-serif-gold font-bold text-sm flex items-center justify-center">
                  {item.score}
                </div>
                <ChevronRight className="w-4 h-4 text-[#8c8c88]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-4" />
    </div>
  );
}
