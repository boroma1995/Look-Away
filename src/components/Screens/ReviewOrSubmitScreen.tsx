import { LionCrest } from '../LionCrest';
import { ChevronLeft, CheckCheck, Eye } from 'lucide-react';

interface ReviewOrSubmitScreenProps {
  onReview: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewOrSubmitScreen({
  onReview,
  onSubmit,
  onBack,
}: ReviewOrSubmitScreenProps) {
  return (
    <div className="w-full max-w-[480px] mx-auto p-4 sm:p-6 text-center">
      <div className="flex justify-center mb-4">
        <LionCrest size={64} glow={true} />
      </div>

      <h2 className="font-serif-gold text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0">
        REVIEW OR SUBMIT
      </h2>
      <p className="text-xs sm:text-sm text-[#d5d4ca] font-medium leading-relaxed max-w-sm mx-auto mt-2 mb-8">
        You can review your choices or submit directly to log this engagement record.
      </p>

      {/* Action Buttons */}
      <div className="space-y-3.5 max-w-xs mx-auto">
        <button
          type="button"
          id="review-or-submit-review-btn"
          onClick={onReview}
          className="w-full btn-gold py-3.5 rounded-md text-xs sm:text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
        >
          <Eye className="w-4 h-4 text-[#090d10]" />
          REVIEW
        </button>

        <button
          type="button"
          id="review-or-submit-submit-btn"
          onClick={onSubmit}
          className="w-full btn-dark py-3.5 rounded-md text-xs sm:text-sm font-black tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer hover:border-[#f1ca63]"
        >
          <CheckCheck className="w-4 h-4 text-[#f1ca63]" />
          SUBMIT
        </button>
      </div>

      <div className="mt-8 pt-4 border-t border-[#765b24]/40 flex justify-center">
        <button
          type="button"
          id="review-or-submit-back-btn"
          onClick={onBack}
          className="text-xs text-[#b9b7ad] hover:text-[#f1ca63] flex items-center gap-1 font-bold uppercase tracking-wider cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Comments
        </button>
      </div>
    </div>
  );
}
