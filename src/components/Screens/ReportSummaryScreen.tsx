import { MainLogo } from '../LionCrest';
import { UserProfile, EngagementRecord } from '../../types';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Sparkles,
  Eye,
  User,
  Palette,
} from 'lucide-react';

interface ReportSummaryScreenProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  onBack: () => void;
  onViewEngagements: () => void;
}

const SUMMARY_TABLE_DATA = [
  {
    category: 'Feeling',
    icon: Heart,
    mostCommon: 'Stressed',
    highestScore: 'Hungry',
    weeklyCount: 'Bored',
  },
  {
    category: 'Location',
    icon: MapPin,
    mostCommon: 'Driving',
    highestScore: 'On Phone',
    weeklyCount: 'Work',
  },
  {
    category: 'Attire',
    icon: Sparkles,
    mostCommon: 'Yoga Pants',
    highestScore: 'Tight Jeans',
    weeklyCount: 'Revealing Top',
  },
  {
    category: 'Eyes Went To',
    icon: Eye,
    mostCommon: 'Butt',
    highestScore: 'Legs',
    weeklyCount: 'Breasts',
  },
  {
    category: 'Her Build',
    icon: User,
    mostCommon: 'Curvy',
    highestScore: 'Long Legs',
    weeklyCount: 'Athletic',
  },
  {
    category: 'Hair Color',
    icon: Palette,
    mostCommon: 'Brown',
    highestScore: 'Blonde',
    weeklyCount: 'Black',
  },
];

export function ReportSummaryScreen({
  user,
  engagements,
  onBack,
  onViewEngagements,
}: ReportSummaryScreenProps) {
  const avgScore = engagements.length
    ? (
        engagements.reduce((acc, curr) => acc + curr.score, 0) /
        engagements.length
      ).toFixed(1)
    : '2.3';

  return (
    <div className="w-full h-full min-h-[520px] max-w-[420px] sm:max-w-[580px] mx-auto p-4 sm:p-5 flex flex-col justify-between select-none">
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
            REPORT SUMMARY
          </h2>

          <div className="w-5" />
        </div>

        {/* Date Range Subtitle */}
        <div className="text-center pb-4">
          <p className="text-[11px] sm:text-xs text-[#8c8c88] font-medium tracking-wide m-0">
            Apr 24 – May 24, 2025
          </p>
        </div>

        {/* Report Overview Card */}
        <div className="bg-[#030814] border border-[#765b24]/60 rounded-xl p-4 flex items-center justify-between shadow-inner mb-4">
          <div className="space-y-1">
            <div className="text-[11px] text-[#8c8c88]">Report for</div>
            <div className="text-sm font-bold text-[#eee]">{user.name || 'John Doe'}</div>
            <div className="text-[11px] text-[#8c8c88] pt-1">Average Score</div>
            <div className="font-serif-gold text-2xl font-black text-[#f1ca63] leading-none">
              {avgScore}
            </div>
          </div>

          <div className="shrink-0 pl-2">
            <MainLogo size={70} glow={true} className="w-16 h-16 object-contain" />
          </div>
        </div>

        {/* Top 3 Summary Matrix Table - Responsive with Minimal Icons */}
        <div className="bg-[#030814] border border-[#765b24]/60 rounded-xl overflow-hidden shadow-inner">
          <div className="overflow-x-auto w-full no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[340px] sm:min-w-0">
              <thead>
                <tr className="bg-[#0a1120] border-b border-[#765b24]/40 text-[9px] sm:text-[10px] font-bold text-[#f1ca63] uppercase tracking-wider">
                  <th className="py-2.5 px-2.5 sm:px-3 text-left">CATEGORY</th>
                  <th className="py-2.5 px-2 sm:px-2.5 text-center">MOST COMMON</th>
                  <th className="py-2.5 px-2 sm:px-2.5 text-center">HIGHEST SCORE</th>
                  <th className="py-2.5 px-2 sm:px-2.5 text-center">WEEKLY COUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#765b24]/20 text-[10px] sm:text-xs">
                {SUMMARY_TABLE_DATA.map((row, i) => {
                  const RowIcon = row.icon;
                  return (
                    <tr
                      key={i}
                      className="hover:bg-[#07101f] transition-colors"
                    >
                      <td className="py-2.5 px-2.5 sm:px-3 font-bold text-[#f1ca63] whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <RowIcon className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                          {row.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 sm:px-2.5 text-center text-[#f1ca63] font-medium">
                        {row.mostCommon}
                      </td>
                      <td className="py-2.5 px-2 sm:px-2.5 text-center text-[#eee]">
                        {row.highestScore}
                      </td>
                      <td className="py-2.5 px-2 sm:px-2.5 text-center text-[#b9b7ad]">
                        {row.weeklyCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Button to View Engagements List */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          id="report-view-engagements-btn"
          onClick={onViewEngagements}
          className="w-full py-3.5 rounded-xl font-serif-gold text-xs sm:text-sm font-bold tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] cursor-pointer uppercase"
        >
          VIEW ENGAGEMENTS
        </button>
      </div>
    </div>
  );
}
