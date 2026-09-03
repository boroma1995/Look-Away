import { EngagementRecord } from '../../types';
import { CheckCircle2, Home, BarChart2, ShieldCheck, PlusCircle } from 'lucide-react';

interface ConfirmationScreenProps {
  lastEngagement: EngagementRecord | null;
  onHome: () => void;
  onViewReports: () => void;
  onLogAnother: () => void;
}

export function ConfirmationScreen({
  lastEngagement,
  onHome,
  onViewReports,
  onLogAnother,
}: ConfirmationScreenProps) {
  const dateStr =
    lastEngagement?.dateStr ||
    new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  const timeStr =
    lastEngagement?.timeStr ||
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] sm:max-w-[440px] mx-auto p-4 sm:p-5 flex flex-col justify-between text-center select-none">
      <div>
        {/* Golden Glowing Checkmark */}
        <div className="relative my-3 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-[#040813] border-2 border-[#f1ca63] flex items-center justify-center shadow-[0_0_25px_rgba(241,202,99,0.35)]">
            <CheckCircle2 className="w-8 h-8 text-[#f1ca63]" strokeWidth={2} />
          </div>
        </div>

        {/* Main Title */}
        <h2 className="font-serif-gold text-lg sm:text-xl font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
          ENGAGEMENT LOGGED
        </h2>

        <div className="flex items-center justify-center my-2 opacity-60">
          <span className="text-[#f1ca63] text-xs">✦</span>
        </div>

        <p className="text-xs text-[#b9b7ad] font-normal leading-relaxed m-0">
          Your entry has been recorded and encrypted in your accountability log.
        </p>

        {/* Timestamp Badge */}
        <div className="inline-block bg-[#030814] border border-[#6b5220] rounded-xl px-5 py-2.5 my-3.5 shadow-inner">
          <span className="text-xs font-bold text-[#eee] tracking-wider block">
            {dateStr}
          </span>
          <span className="text-xs font-bold text-[#f1ca63] tracking-widest block mt-0.5 font-mono">
            {timeStr}
          </span>
        </div>

        {/* Encouragement Quote */}
        <div className="bg-[#030814] border border-[#6b5220] rounded-xl p-3.5 my-2 text-left relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5 text-[#f1ca63]">
            <ShieldCheck className="w-4 h-4 shrink-0" strokeWidth={2} />
            <span className="text-[10px] font-bold tracking-widest uppercase">
              AWARENESS IS VICTORY
            </span>
          </div>
          <p className="text-xs text-[#b9b7ad] italic leading-relaxed m-0">
            "The first step in breaking unconscious looking habits is total honesty with yourself and tracking every encounter."
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-2.5 pt-4 pb-1">
        <button
          type="button"
          id="confirmation-log-another-btn"
          onClick={onLogAnother}
          className="w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-black tracking-widest uppercase bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(216,168,56,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#0a0e14]" strokeWidth={2.25} />
          <span>LOG ANOTHER ENCOUNTER</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            id="confirmation-home-btn"
            onClick={onHome}
            className="py-3 px-3 rounded-xl font-serif-gold text-xs font-bold tracking-widest uppercase bg-[#030814] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Home className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={2} />
            <span>HOME</span>
          </button>

          <button
            type="button"
            id="confirmation-reports-btn"
            onClick={onViewReports}
            className="py-3 px-3 rounded-xl font-serif-gold text-xs font-bold tracking-widest uppercase bg-[#030814] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={2} />
            <span>REPORTS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
