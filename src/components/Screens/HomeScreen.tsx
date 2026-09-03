import { MainLogo } from '../LionCrest';
import { UserProfile, EngagementRecord } from '../../types';
import { PlusCircle, FileText, Flame, Shield, ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  onStartLogging: () => void;
  onCreateReport: () => void;
  onViewReports: () => void;
  onOpenMenu?: () => void;
}

export function HomeScreen({
  engagements,
  onStartLogging,
  onCreateReport,
  onViewReports,
}: HomeScreenProps) {
  // Compute total and avg score
  const totalLogged = engagements.length;
  const avgScore = totalLogged > 0
    ? (engagements.reduce((sum, e) => sum + (e.score || 2), 0) / totalLogged).toFixed(1)
    : '2.4';

  const lastRecord = engagements[0] || {
    dateStr: 'May 21, 2025',
    timeStr: '2:45 PM',
    score: 2,
    scoreLabel: '2 – LOOK',
    locations: ['Driving', 'On Phone'],
  };

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top App Header */}
      <div>
        <div className="flex items-center justify-between pb-3 pt-1">
          {/* Small Crest & Title */}
          <div className="flex items-center gap-2">
            <MainLogo size={28} glow={false} className="w-7 h-7 object-contain" />
          </div>

          {/* 7D Streak Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030814] border border-[#6b5220] shadow-sm">
            <Flame className="w-3.5 h-3.5 text-[#f1ca63]" />
            <span className="font-serif-gold text-[10px] font-bold tracking-wider text-[#f1ca63] uppercase">
              7D STREAK
            </span>
          </div>
        </div>

        {/* Small Gold Divider */}
        <div className="flex items-center justify-center gap-2 my-2 opacity-50">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
          <span className="text-[#f1ca63] text-xs">✦</span>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
        </div>

        {/* Hero Crest Section */}
        <div className="flex flex-col items-center justify-center py-2 sm:py-3 text-center">
          <div className="relative drop-shadow-[0_0_20px_rgba(241,202,99,0.3)]">
            <MainLogo size={135} glow={true} className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
          </div>
        </div>

        {/* Small Gold Divider */}
        <div className="flex items-center justify-center gap-2 my-2 opacity-50">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
          <span className="text-[#f1ca63] text-xs">✦</span>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
        </div>

        {/* 3 Stats Cards in a Row */}
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="bg-[#040813] border border-[#554018] rounded-xl p-2 sm:p-2.5 text-center">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-[#b9b7ad]">
              TOTAL LOGGED
            </span>
            <span className="font-serif-gold text-base sm:text-lg font-black text-[#f1ca63] mt-0.5 block">
              {totalLogged || 7}
            </span>
          </div>

          <div className="bg-[#040813] border border-[#554018] rounded-xl p-2 sm:p-2.5 text-center">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-[#b9b7ad]">
              AVG SCORE
            </span>
            <span className="font-serif-gold text-base sm:text-lg font-black text-[#f1ca63] mt-0.5 block">
              {avgScore}
            </span>
          </div>

          <div className="bg-[#040813] border border-[#554018] rounded-xl p-2 sm:p-2.5 text-center">
            <span className="block text-[9px] uppercase font-bold tracking-wider text-[#b9b7ad]">
              STATUS
            </span>
            <div className="flex items-center justify-center gap-1 mt-1 text-emerald-400 font-bold text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span title="Tracking is active">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons Matching Reference Exactly */}
      <div className="space-y-3 my-2 w-full">
        {/* LOG ENGAGEMENT: Solid Gold Button with Plus Icon */}
        <button
          type="button"
          id="home-log-engagement-btn"
          onClick={onStartLogging}
          className="w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-black tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] flex items-center justify-center gap-2 cursor-pointer uppercase"
        >
          <PlusCircle className="w-5 h-5 text-[#0a0e14]" strokeWidth={2.25} />
          <span>LOG ENGAGEMENT</span>
        </button>

        {/* CREATE REPORT: Dark Button with Subtle Gold Border */}
        <button
          type="button"
          id="home-create-report-btn"
          onClick={onCreateReport}
          className="w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-bold tracking-widest text-[#f1ca63] bg-[#030814] border border-[#6b5220] hover:border-[#f1ca63] hover:bg-[#07101f] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase shadow-sm"
        >
          <FileText className="w-5 h-5 text-[#f1ca63]" strokeWidth={1.75} />
          <span>CREATE REPORT</span>
        </button>
      </div>

      {/* Last Engagement Card Matching Screenshot */}
      <div className="mt-2 pt-1">
        <div
          onClick={onViewReports}
          className="bg-[#040813] border border-[#554018] rounded-xl p-3 text-left transition-colors hover:border-[#f1ca63]/60 cursor-pointer"
        >
          <div className="flex items-center justify-between text-[9.5px] uppercase font-bold tracking-wider text-[#b9b7ad]">
            <span>
              LAST ENGAGEMENT: {lastRecord.dateStr?.toUpperCase() || 'MAY 21, 2025'} • {lastRecord.timeStr || '2:45 PM'}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1 text-xs">
            <span className="font-semibold text-[#f7f4e8] truncate pr-2">
              {lastRecord.scoreLabel || '2 – LOOK'} • {lastRecord.locations?.join(', ') || 'Driving, On Phone'}
            </span>
            <span className="text-[#f1ca63] font-bold text-[11px] shrink-0 flex items-center gap-0.5 hover:underline">
              VIEW <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
