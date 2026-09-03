import { ChevronLeft, ArrowRight } from 'lucide-react';

interface CommentsScreenProps {
  comments: string;
  onChangeComments: (text: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
}

export function CommentsScreen({
  comments,
  onChangeComments,
  onNext,
  onBack,
}: CommentsScreenProps) {
  const maxLength = 500;

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header: Step Indicator & Progress Bar */}
      <div>
        <div className="pb-3 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1ca63]">
            <span>STEP 8 OF 8 • COMMENTS</span>
            <span>100%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-[3px] bg-[#121926] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d8a838] to-[#f1ca63] rounded-full shadow-[0_0_8px_#f1ca63]"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center pt-2 pb-3">
          <h2 className="font-serif-gold text-base sm:text-lg font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            COMMENTS
          </h2>

          <div className="flex items-center justify-center my-1.5 opacity-60">
            <span className="text-[#f1ca63] text-xs">✦</span>
          </div>

          <p className="text-xs text-[#b9b7ad] font-normal tracking-wide m-0">
            Add any additional details or context
          </p>
        </div>

        {/* Textarea Box with 0/500 */}
        <div className="relative py-2">
          <textarea
            id="comments-textarea"
            value={comments}
            maxLength={maxLength}
            onChange={(e) => onChangeComments(e.target.value)}
            placeholder="Type your reflections or comments here..."
            rows={7}
            className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#6b5220] focus:border-[#f1ca63] rounded-xl p-3.5 text-xs sm:text-sm outline-none transition-all resize-none leading-relaxed"
          />
          <div className="text-right text-[11px] text-[#b9b7ad] pt-1 pr-1 font-mono">
            {comments.length}/{maxLength}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Buttons: < BACK and REVIEW -> */}
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
          id="comments-next-btn"
          onClick={onNext}
          className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(216,168,56,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>REVIEW</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
