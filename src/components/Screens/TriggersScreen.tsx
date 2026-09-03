import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import { TRIGGER_OPTIONS } from '../../data/constants';
import { TriggerEntry } from '../../types';

interface TriggersScreenProps {
  selectedTriggers: TriggerEntry[];
  onToggleTrigger: (trigger: string) => void;
  onChangeComment: (trigger: string, comment: string) => void;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
}

export function TriggersScreen({
  selectedTriggers,
  onToggleTrigger,
  onChangeComment,
  onNext,
  onBack,
  nextLabel = 'REVIEW',
}: TriggersScreenProps) {
  const commentFor = (trigger: string) =>
    selectedTriggers.find((entry) => entry.trigger === trigger)?.comment || '';

  return (
    <div className="w-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col select-none">
      <div>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1ca63] pb-3 pt-1">
          <span>LOG TRIGGERS</span>
          <span>{selectedTriggers.length} SELECTED</span>
        </div>
        <div className="text-center pt-2 pb-4">
          <h2 className="font-serif-gold text-base sm:text-lg font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            LOG TRIGGERS
          </h2>
          <p className="text-xs text-[#b9b7ad] mt-2">Select what was present. Add context to any trigger.</p>
        </div>
        <div className="space-y-2">
          {TRIGGER_OPTIONS.map((trigger) => {
            const selected = selectedTriggers.some((entry) => entry.trigger === trigger);
            return (
              <div key={trigger}>
                <button
                  type="button"
                  onClick={() => onToggleTrigger(trigger)}
                  className={`w-full py-2.5 px-3.5 rounded-xl text-left text-xs font-bold tracking-wider transition-all flex items-center justify-between border ${selected ? 'bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] border-[#f1ca63] text-[#0a0e14]' : 'bg-[#040813] text-[#eee] border-[#554018] hover:border-[#f1ca63]'}`}
                >
                  <span>{trigger}</span>
                  <span className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 ${selected ? 'border-2 border-[#0a0e14]' : 'border border-[#6b5220]'}`}>
                    {selected && <Check className="w-3 h-3" strokeWidth={3.5} />}
                  </span>
                </button>
                {selected && (
                  <textarea
                    value={commentFor(trigger)}
                    onChange={(event) => onChangeComment(trigger, event.target.value)}
                    maxLength={300}
                    rows={2}
                    placeholder={`What did ${trigger.toLowerCase()} feel like?`}
                    className="w-full mt-1.5 bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#6b5220] rounded-xl p-2.5 text-xs outline-none focus:border-[#f1ca63] resize-none"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-5 pb-1 flex items-center gap-3 mt-auto">
        <button type="button" onClick={onBack} className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-bold tracking-widest uppercase bg-[#030814] border border-[#6b5220] text-[#f1ca63] flex items-center justify-center gap-1.5 cursor-pointer">
          <ChevronLeft className="w-4 h-4" /> BACK
        </button>
        <button type="button" onClick={onNext} className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] flex items-center justify-center gap-1.5 cursor-pointer">
          {nextLabel} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}