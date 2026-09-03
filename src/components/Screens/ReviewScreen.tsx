import { NewEngagementDraft } from '../../types';
import { SCORE_OPTIONS } from '../../data/constants';
import {
  Award,
  Heart,
  MapPin,
  Sparkles,
  Eye,
  User,
  Palette,
  MessageSquare,
  Edit3,
  ShieldCheck,
} from 'lucide-react';

interface ReviewScreenProps {
  draft: NewEngagementDraft;
  onEdit: (stepName?: string) => void;
  onSubmit: () => void;
}

export function ReviewScreen({ draft, onEdit, onSubmit }: ReviewScreenProps) {
  const scoreObj = SCORE_OPTIONS.find((s) => s.level === draft.score);
  const scoreLabel = scoreObj ? scoreObj.title : '2 – LOOK';

  const formatList = (items: string[], otherVal: string) => {
    const list = [...items];
    if (list.includes('OTHER') && otherVal.trim()) {
      const idx = list.indexOf('OTHER');
      list[idx] = `Other (${otherVal.trim()})`;
    }
    return list.length > 0 ? list.join(', ') : 'None selected';
  };

  const feelingsText = formatList(
    draft.feelings.length ? draft.feelings : ['Hungry', 'Stressed'],
    draft.feelingsOther
  );
  const locationsText = formatList(
    draft.locations.length ? draft.locations : ['Driving', 'On Phone'],
    draft.locationsOther
  );
  const attireText = formatList(
    draft.attire.length ? draft.attire : ['Yoga Pants', 'Tight Jeans'],
    draft.attireOther
  );
  const eyesText = formatList(
    draft.eyesWentTo.length ? draft.eyesWentTo : ['Butt', 'Legs'],
    draft.eyesOther
  );
  const buildText = formatList(
    draft.herBuild.length ? draft.herBuild : ['Curvy', 'Long Legs'],
    draft.herBuildOther
  );
  const hairText =
    draft.hairColor === 'OTHER' && draft.hairColorOther.trim()
      ? `Other (${draft.hairColorOther.trim()})`
      : draft.hairColor || 'Brown';

  const commentsText =
    draft.comments.trim() || 'Visual engagement logged.';

  const fields = [
    { label: 'Score', value: scoreLabel, icon: Award },
    { label: 'Feeling', value: feelingsText, icon: Heart },
    { label: 'Location', value: locationsText, icon: MapPin },
    { label: 'Attire', value: attireText, icon: Sparkles },
    { label: 'Eyes Went To', value: eyesText, icon: Eye },
    { label: 'Her Build', value: buildText, icon: User },
    { label: 'Hair Color', value: hairText, icon: Palette },
    { label: 'Comments', value: commentsText, icon: MessageSquare },
  ];

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] sm:max-w-[460px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header: Step Indicator & Progress Bar */}
      <div>
        <div className="pb-3 pt-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#f1ca63]">
            <span>REVIEW LOG • FINAL CONFIRMATION</span>
            <span>READY</span>
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
            REVIEW YOUR ENGAGEMENT
          </h2>

          <div className="flex items-center justify-center my-1.5 opacity-60">
            <span className="text-[#f1ca63] text-xs">✦</span>
          </div>

          <p className="text-xs text-[#b9b7ad] font-normal tracking-wide m-0">
            Review your selections before submitting
          </p>
        </div>

        {/* Review Card Table */}
        <div className="bg-[#030814] border border-[#6b5220] rounded-xl p-3 sm:p-3.5 space-y-2 shadow-inner">
          {fields.map((f, i) => {
            const FieldIcon = f.icon;
            return (
              <div
                key={i}
                className="flex items-start justify-between text-xs py-1 border-b border-[#554018]/40 last:border-0 pb-1.5 last:pb-0 gap-2"
              >
                <span className="font-medium text-[#c5c3b8] shrink-0 flex items-center gap-1.5">
                  <FieldIcon className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                  {f.label}:
                </span>
                <span className="font-bold text-[#f1ca63] text-right break-words max-w-[62%]">
                  {f.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-2.5 pt-3 pb-1">
        {/* EDIT Button */}
        <button
          type="button"
          id="review-edit-btn"
          onClick={() => onEdit()}
          className="w-full py-3 px-4 rounded-xl font-serif-gold text-xs font-bold tracking-widest text-[#f1ca63] bg-[#030814] border border-[#6b5220] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all cursor-pointer uppercase flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Edit3 className="w-4 h-4" />
          <span>EDIT LOG</span>
        </button>

        {/* SUBMIT ENGAGEMENT Button */}
        <button
          type="button"
          id="review-submit-btn"
          onClick={onSubmit}
          className="w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-black tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] cursor-pointer uppercase flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-[#0a0e14]" strokeWidth={2.25} />
          <span>SUBMIT ENGAGEMENT</span>
        </button>
      </div>
    </div>
  );
}
