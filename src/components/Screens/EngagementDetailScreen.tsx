import { EngagementRecord } from '../../types';
import {
  Heart,
  MapPin,
  Sparkles,
  Eye,
  User,
  Palette,
  MessageSquare,
  ChevronLeft,
  Edit3,
} from 'lucide-react';

interface EngagementDetailScreenProps {
  engagement: EngagementRecord;
  onBack: () => void;
  onEdit?: () => void;
}

export function EngagementDetailScreen({
  engagement,
  onBack,
  onEdit,
}: EngagementDetailScreenProps) {
  const fields = [
    {
      label: 'Feeling',
      icon: Heart,
      value: engagement.feelings?.length
        ? engagement.feelings.join(', ')
        : 'Hungry, Stressed',
    },
    {
      label: 'Location',
      icon: MapPin,
      value: engagement.locations?.length
        ? engagement.locations.join(', ')
        : 'Driving, On Phone',
    },
    {
      label: 'Attire',
      icon: Sparkles,
      value: engagement.attire?.length
        ? engagement.attire.join(', ')
        : 'Yoga Pants, Tight Jeans',
    },
    {
      label: 'Eyes Went To',
      icon: Eye,
      value: engagement.eyesWentTo?.length
        ? engagement.eyesWentTo.join(', ')
        : 'Butt, Legs',
    },
    {
      label: 'Her Build',
      icon: User,
      value: engagement.herBuild?.length
        ? engagement.herBuild.join(', ')
        : 'Curvy, Long Legs',
    },
    {
      label: 'Hair Color',
      icon: Palette,
      value: engagement.hairColor || 'Brown',
    },
    {
      label: 'Comments',
      icon: MessageSquare,
      value:
        engagement.comments ||
        'Visual engagement logged.',
    },
  ];

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] sm:max-w-[460px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div>
        <div className="text-center pt-2 pb-3">
          <h2 className="font-serif-gold text-base sm:text-lg font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            ENGAGEMENT DETAIL
          </h2>

          <div className="flex items-center justify-center my-1.5 opacity-60">
            <span className="text-[#f1ca63] text-xs">✦</span>
          </div>

          <p className="text-xs text-[#b9b7ad] font-normal tracking-wide m-0">
            {engagement.dateStr} at {engagement.timeStr}
          </p>
        </div>

        {/* Score Banner */}
        <div className="text-center pb-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#f1ca63]/10 border border-[#f1ca63]/30 text-xs font-serif-gold font-bold text-[#f1ca63] tracking-wider">
            Score: {engagement.scoreLabel}
          </span>
        </div>

        {/* Detail Card Table */}
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

      {/* Bottom Navigation Buttons: < BACK and EDIT LOG */}
      <div className="pt-3 pb-1 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-bold tracking-widest uppercase bg-[#030814] border border-[#6b5220] text-[#f1ca63] hover:border-[#f1ca63] hover:bg-[#07101f] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 py-3 px-4 rounded-xl font-serif-gold text-xs font-black tracking-widest uppercase bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(216,168,56,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>EDIT</span>
          </button>
        )}
      </div>
    </div>
  );
}
