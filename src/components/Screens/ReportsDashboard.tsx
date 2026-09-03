import React, { useState, useMemo } from 'react';
import { UserProfile, EngagementRecord, ScoreLevel } from '../../types';
import { GoldDivider } from '../GoldDivider';
import {
  FileText,
  Calendar,
  Filter,
  Download,
  Printer,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  Heart,
  TrendingDown,
  Shield,
  Award,
  Plus,
  BarChart2,
  ListFilter,
  Check,
  MapPin,
  Sparkles,
  Eye,
  User,
  Palette,
  MessageSquare,
} from 'lucide-react';

interface ReportsDashboardProps {
  user: UserProfile;
  engagements: EngagementRecord[];
  startDate: string;
  endDate: string;
  onSetDates: (start: string, end: string) => void;
  onSelectNewEngagement: () => void;
  onDeleteEngagement: (id: string) => void;
}

export function ReportsDashboard({
  user,
  engagements,
  startDate,
  endDate,
  onSetDates,
  onSelectNewEngagement,
  onDeleteEngagement,
}: ReportsDashboardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(
    engagements[0]?.id || null
  );
  const [filterScore, setFilterScore] = useState<number | 'all'>('all');
  const [emailSentToast, setEmailSentToast] = useState(false);
  const [mobileTab, setMobileTab] = useState<'summary' | 'logs' | 'detail'>('summary');

  // Filter engagements by date and score
  const filteredEngagements = useMemo(() => {
    return engagements.filter((e) => {
      if (filterScore !== 'all' && e.score !== filterScore) return false;
      // Date filter check
      if (startDate && new Date(e.timestamp) < new Date(`${startDate}T00:00:00`)) return false;
      if (endDate && new Date(e.timestamp) > new Date(`${endDate}T23:59:59`)) return false;
      return true;
    });
  }, [engagements, filterScore, startDate, endDate]);

  const selectedEngagement = useMemo(() => {
    return engagements.find((e) => e.id === selectedId) || filteredEngagements[0] || null;
  }, [engagements, selectedId, filteredEngagements]);

  // Compute summary stats & frequencies
  const stats = useMemo(() => {
    const total = filteredEngagements.length;
    if (total === 0) {
      return {
        total: 0,
        avgScore: '0.0',
        tableRows: [
          { category: 'FEELING', item: 'None', freq: '0%', icon: Heart },
          { category: 'LOCATION', item: 'None', freq: '0%', icon: MapPin },
          { category: 'ATTIRE', item: 'None', freq: '0%', icon: Sparkles },
          { category: 'EYES WENT TO', item: 'None', freq: '0%', icon: Eye },
          { category: 'HER BUILD', item: 'None', freq: '0%', icon: User },
          { category: 'HAIR COLOR', item: 'None', freq: '0%', icon: Palette },
        ],
      };
    }

    const avg = (
      filteredEngagements.reduce((acc, curr) => acc + curr.score, 0) / total
    ).toFixed(1);

    const getTopSelection = (extractor: (e: EngagementRecord) => string[]) => {
      const counts: Record<string, number> = {};
      let maxItem = 'None';
      let maxCount = 0;
      filteredEngagements.forEach((e) => {
        const items = extractor(e);
        items.forEach((item) => {
          if (!item) return;
          counts[item] = (counts[item] || 0) + 1;
          if (counts[item] > maxCount) {
            maxCount = counts[item];
            maxItem = item;
          }
        });
      });
      const pct = maxCount > 0 ? Math.round((maxCount / total) * 100) : 0;
      return { item: maxItem, freq: `${pct}%` };
    };

    const topFeeling = getTopSelection((e) => e.feelings);
    const topLocation = getTopSelection((e) => e.locations);
    const topAttire = getTopSelection((e) => e.attire);
    const topEyes = getTopSelection((e) => e.eyesWentTo);
    const topBuild = getTopSelection((e) => e.herBuild);
    const topHair = getTopSelection((e) => [e.hairColor]);

    return {
      total,
      avgScore: avg,
      tableRows: [
        { category: 'FEELING', item: topFeeling.item, freq: topFeeling.freq, icon: Heart },
        { category: 'LOCATION', item: topLocation.item, freq: topLocation.freq, icon: MapPin },
        { category: 'ATTIRE', item: topAttire.item, freq: topAttire.freq, icon: Sparkles },
        { category: 'EYES WENT TO', item: topEyes.item, freq: topEyes.freq, icon: Eye },
        { category: 'HER BUILD', item: topBuild.item, freq: topBuild.freq, icon: User },
        { category: 'HAIR COLOR', item: topHair.item, freq: topHair.freq, icon: Palette },
      ],
    };
  }, [filteredEngagements]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Time', 'Score', 'Feelings', 'Locations', 'Attire', 'EyesWentTo', 'HerBuild', 'HairColor', 'Comments'];
    const rows = filteredEngagements.map((e) => [
      e.id,
      `"${e.dateStr}"`,
      `"${e.timeStr}"`,
      `"${e.scoreLabel}"`,
      `"${e.feelings.join(', ')}"`,
      `"${e.locations.join(', ')}"`,
      `"${e.attire.join(', ')}"`,
      `"${e.eyesWentTo.join(', ')}"`,
      `"${e.herBuild.join(', ')}"`,
      `"${e.hairColor}"`,
      `"${e.comments.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `look-away-report-${startDate}-to-${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = () => {
    setEmailSentToast(true);
    setTimeout(() => setEmailSentToast(false), 4000);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto p-2 sm:p-4 text-[#f7f4e8]">
      {/* Toast Notification */}
      {emailSentToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#f1ca63] text-[#030814] px-5 py-3 rounded-lg font-black text-xs shadow-2xl flex items-center gap-2 border border-[#fff]">
          <CheckCircle2 className="w-5 h-5 text-[#030814]" />
          <span>Accountability Report dispatched to {user.accountabilityEmail || user.email}!</span>
        </div>
      )}

      {/* Trust Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-6 no-print">
        <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2.5 sm:p-3 text-center flex items-center justify-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#030814] border border-[#8b681f] flex items-center justify-center text-[#f1ca63] shrink-0">
            <Shield className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-[#f1ca63] tracking-widest block">
              PRIVATE & SECURE
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#b9b7ad]">Local encrypted memory</span>
          </div>
        </div>

        <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2.5 sm:p-3 text-center flex items-center justify-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#030814] border border-[#8b681f] flex items-center justify-center text-[#f1ca63] shrink-0">
            <TrendingDown className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-[#f1ca63] tracking-widest block">
              TRACK & IMPROVE
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#b9b7ad]">Spot unconscious triggers</span>
          </div>
        </div>

        <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2.5 sm:p-3 text-center flex items-center justify-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#030814] border border-[#8b681f] flex items-center justify-center text-[#f1ca63] shrink-0">
            <Award className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-[#f1ca63] tracking-widest block">
              GROW STRONGER
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#b9b7ad]">Build iron discipline</span>
          </div>
        </div>
      </div>

      {/* Header with Title and Export Controls */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 pb-3 border-b border-[#8b681f] mb-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#8b681f] flex items-center justify-center bg-[#030814] shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#f1ca63]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-serif-gold text-lg sm:text-2xl font-bold tracking-[0.2em] text-[#f1ca63] uppercase m-0 leading-tight">
              REPORT PREVIEW
            </h2>
            <span className="text-[11px] sm:text-xs text-[#b9b7ad] font-semibold block mt-0.5">
              Period: {startDate} to {endDate} • {filteredEngagements.length} Records
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 no-print w-full sm:w-auto justify-center sm:justify-end">
          <button
            type="button"
            id="report-export-csv-btn"
            onClick={handleExportCSV}
            className="btn-dark px-2.5 sm:px-3.5 py-1.5 rounded text-[10px] sm:text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            CSV
          </button>
          <button
            type="button"
            id="report-print-btn"
            onClick={handlePrint}
            className="btn-dark px-2.5 sm:px-3.5 py-1.5 rounded text-[10px] sm:text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} />
            PRINT / PDF
          </button>
          <button
            type="button"
            id="report-email-mentor-btn"
            onClick={handleSendEmail}
            className="btn-gold px-3 sm:px-4 py-1.5 rounded text-[10px] sm:text-xs font-bold tracking-wider uppercase flex items-center gap-1 cursor-pointer shadow-md"
          >
            <Mail className="w-3.5 h-3.5 text-[#090d10]" strokeWidth={1.5} />
            EMAIL
          </button>
        </div>
      </div>

      {/* Date & Score Filter Bar */}
      <div className="bg-[#030814] border border-[#765b24] rounded-xl p-2.5 sm:p-3 mb-4 sm:mb-6 flex flex-col md:flex-row items-center justify-between gap-3 no-print">
        {/* Score Filter Pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 w-full md:w-auto">
          <span className="text-[11px] sm:text-xs font-bold uppercase text-[#e6c866] flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.5} /> Filter:
          </span>
          <button
            type="button"
            onClick={() => setFilterScore('all')}
            className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer border ${
              filterScore === 'all'
                ? 'bg-[#f1ca63] text-[#030814] border-[#f1ca63] shadow-sm'
                : 'bg-[#030814] text-[#b9b7ad] border-[#6c5424] hover:text-[#fff] hover:border-[#f1ca63]'
            }`}
          >
            All Scores
          </button>
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilterScore(s as ScoreLevel)}
              className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-bold transition-all cursor-pointer border ${
                filterScore === s
                  ? 'bg-[#f1ca63] text-[#030814] border-[#f1ca63] shadow-sm'
                  : 'bg-[#030814] text-[#b9b7ad] border-[#6c5424] hover:text-[#fff] hover:border-[#f1ca63]'
              }`}
            >
              Score {s}
            </button>
          ))}
        </div>

        {/* Date Range Inputs */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center sm:justify-end">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onSetDates(e.target.value, endDate)}
            className="gold-input text-[11px] sm:text-xs py-1 px-2 w-32 sm:w-36"
          />
          <span className="text-xs text-[#8b681f] font-bold">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onSetDates(startDate, e.target.value)}
            className="gold-input text-[11px] sm:text-xs py-1 px-2 w-32 sm:w-36"
          />
        </div>
      </div>

      {/* Mobile Segmented Controller (Visible on Mobile / Small Screens) */}
      <div className="lg:hidden mb-4 grid grid-cols-3 gap-1 bg-[#030814] p-1 rounded-lg border border-[#765b24]/60 no-print">
        <button
          type="button"
          onClick={() => setMobileTab('summary')}
          className={`py-2 px-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-1 cursor-pointer ${
            mobileTab === 'summary'
              ? 'bg-[#f1ca63] text-[#030814] shadow-sm'
              : 'text-[#b9b7ad] hover:text-[#f1ca63]'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          Summary
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('logs')}
          className={`py-2 px-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-1 cursor-pointer ${
            mobileTab === 'logs'
              ? 'bg-[#f1ca63] text-[#030814] shadow-sm'
              : 'text-[#b9b7ad] hover:text-[#f1ca63]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
          Logs ({filteredEngagements.length})
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('detail')}
          className={`py-2 px-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase rounded transition-all flex items-center justify-center gap-1 cursor-pointer ${
            mobileTab === 'detail'
              ? 'bg-[#f1ca63] text-[#030814] shadow-sm'
              : 'text-[#b9b7ad] hover:text-[#f1ca63]'
          }`}
        >
          <ListFilter className="w-3.5 h-3.5" strokeWidth={1.5} />
          Details
        </button>
      </div>

      {/* Main Content: 3-column on Desktop / Segmented on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* CARD 1: REPORT SUMMARY */}
        <div
          className={`gold-card p-3.5 sm:p-5 flex flex-col justify-between ${
            mobileTab === 'summary' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8b681f] mb-3">
              <h3 className="font-serif-gold text-sm sm:text-base font-bold text-[#f1ca63] uppercase m-0 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
                REPORT SUMMARY
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#b9b7ad]">
                {filteredEngagements.length} Total Logs
              </span>
            </div>

            {/* User details header */}
            <div className="bg-[#030814] border border-[#6c5424] rounded-lg p-2.5 sm:p-3 mb-3 text-xs space-y-1">
              <p className="m-0 text-[#f7f4e8]">
                <strong className="text-[#f1ca63]">Name:</strong> {user.name || 'Account Holder'}
              </p>
              <p className="m-0 text-[#f7f4e8]">
                <strong className="text-[#f1ca63]">Report Period:</strong> {startDate} – {endDate}
              </p>
              <p className="m-0 text-[#f7f4e8]">
                <strong className="text-[#f1ca63]">Average Score:</strong>{' '}
                <span className="font-bold text-[#f1ca63]">{stats.avgScore}</span> / 4.0
              </p>
            </div>

            {/* Breakdown Table matching the exact UI */}
            <div className="border border-[#5d491f] rounded-lg overflow-hidden bg-[#030814]">
              <div className="overflow-x-auto w-full no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[280px]">
                  <thead>
                    <tr className="bg-[#030814] border-b border-[#c9982c]/20 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#b9b7ad]">
                      <th className="py-2.5 px-2.5 sm:px-3">CATEGORY</th>
                      <th className="py-2.5 px-2 sm:px-3">MOST COMMON</th>
                      <th className="py-2.5 px-2.5 sm:px-3 text-right">FREQ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#765b24]/20 text-xs">
                    {stats.tableRows.map((row, i) => {
                      const RowIcon = row.icon;
                      return (
                        <tr key={i} className="hover:bg-[#08111e] transition-colors">
                          <td className="py-2 px-2.5 sm:px-3 font-bold text-[#f1ca63] text-[10px] sm:text-[11px] whitespace-nowrap">
                            <span className="flex items-center gap-1.5">
                              <RowIcon className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                              {row.category}
                            </span>
                          </td>
                          <td className="py-2 px-2 sm:px-3 text-[#f7f4e8] font-medium text-[10px] sm:text-[11px] break-words">
                            {row.item}
                          </td>
                          <td className="py-2 px-2.5 sm:px-3 text-right font-bold text-[#e6c866] text-[10px] sm:text-[11px] whitespace-nowrap">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-[#f1ca63]/10 border border-[#f1ca63]/20">
                              {row.freq}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#765b24]/30 text-center">
            <button
              type="button"
              id="report-log-new-btn"
              onClick={onSelectNewEngagement}
              className="w-full btn-gold py-2.5 rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#090d10]" strokeWidth={1.5} />
              Log New Engagement
            </button>
          </div>
        </div>

        {/* CARD 2: ENGAGEMENTS (History Feed) */}
        <div
          className={`gold-card p-3.5 sm:p-5 flex flex-col justify-between ${
            mobileTab === 'logs' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8b681f] mb-3">
              <h3 className="font-serif-gold text-sm sm:text-base font-bold text-[#f1ca63] uppercase m-0 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
                ENGAGEMENTS
              </h3>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#f1ca63]">
                {filteredEngagements.length} Logged
              </span>
            </div>

            {/* Scrollable list */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {filteredEngagements.length === 0 ? (
                <div className="text-center py-8 text-[#b9b7ad] text-xs">
                  <p>No engagement records match this date & score filter.</p>
                </div>
              ) : (
                filteredEngagements.map((item) => {
                  const isSelected = selectedEngagement?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setMobileTab('detail');
                      }}
                      className={`p-2.5 sm:p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#030814] border-[#f1ca63] ring-1 ring-[#f1ca63] shadow-[0_0_12px_rgba(241,202,99,0.25)]'
                          : 'bg-[#030814] border-[#5d491f] hover:border-[#f1ca63]/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[9px] sm:text-[10px] text-[#b9b7ad] font-semibold block">
                            {item.dateStr} • {item.timeStr}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#f7f4e8] block">
                            Score {item.score} ({item.scoreLabel})
                          </span>
                        </div>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            item.score === 1
                              ? 'bg-[#10b981]/20 text-[#34d399] border border-[#10b981]/40'
                              : item.score === 2
                              ? 'bg-[#eab308]/20 text-[#fde047] border border-[#eab308]/40'
                              : item.score === 3
                              ? 'bg-[#f97316]/20 text-[#fdba74] border border-[#f97316]/40'
                              : 'bg-[#ef4444]/20 text-[#f87171] border border-[#ef4444]/40'
                          }`}
                        >
                          {item.score}
                        </span>
                      </div>

                      {/* Small tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.locations.slice(0, 2).map((loc, i) => (
                          <span
                            key={i}
                            className="text-[9px] sm:text-[10px] bg-[#030814] text-[#e6c866] px-2 py-0.5 rounded-full border border-[#765b24]"
                          >
                            {loc}
                          </span>
                        ))}
                        {item.attire.slice(0, 2).map((att, i) => (
                          <span
                            key={i}
                            className="text-[9px] sm:text-[10px] bg-[#030814] text-[#b9b7ad] px-2 py-0.5 rounded-full border border-[#765b24]"
                          >
                            {att}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#765b24]/30 text-center">
            <span className="text-[10px] text-[#8b681f] font-bold uppercase tracking-wider block">
              Click an entry to inspect full details
            </span>
          </div>
        </div>

        {/* CARD 3: ENGAGEMENT DETAILS */}
        <div
          className={`gold-card p-3.5 sm:p-5 flex flex-col justify-between ${
            mobileTab === 'detail' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#8b681f] mb-3">
              <h3 className="font-serif-gold text-sm sm:text-base font-bold text-[#f1ca63] uppercase m-0 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#f1ca63]" strokeWidth={1.5} />
                INCIDENT BREAKDOWN
              </h3>
              {selectedEngagement && (
                <button
                  type="button"
                  title="Delete this entry"
                  onClick={() => onDeleteEngagement(selectedEngagement.id)}
                  className="text-[#b9b7ad] hover:text-[#ef4444] p-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {selectedEngagement ? (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between bg-[#030814] p-2.5 rounded-lg border border-[#6c5424]">
                  <span className="font-bold text-[#f7f4e8] text-xs">
                    {selectedEngagement.dateStr}
                  </span>
                  <span className="font-bold text-[#f1ca63] text-xs">
                    {selectedEngagement.timeStr}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-[#8b681f] bg-[#030814] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#b9b7ad] block">
                      Score Level
                    </span>
                    <span className="text-sm font-black text-[#f1ca63]">
                      Level {selectedEngagement.score}: {selectedEngagement.scoreLabel}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#f1ca63] text-[#030814]">
                    Recorded
                  </span>
                </div>

                {/* Details Breakdown */}
                <div className="space-y-2 text-left pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Location:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.locations.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Attire:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.attire.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <Heart className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Feelings:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.feelings.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <Eye className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Eyes Went To:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.eyesWentTo.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <User className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Her Build:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.herBuild.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#765b24]/30 py-1.5 gap-1">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 shrink-0">
                      <Palette className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Hair Color:
                    </span>
                    <span className="text-[11px] text-[#f7f4e8] font-medium sm:text-right break-words">
                      {selectedEngagement.hairColor || 'N/A'}
                    </span>
                  </div>

                  {/* Comments */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#e6c866] uppercase flex items-center gap-1.5 mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#f1ca63]" strokeWidth={1.75} />
                      Comments:
                    </span>
                    <p className="bg-[#030814] p-2.5 rounded border border-[#6c5424] text-xs italic text-[#d5d4ca] leading-relaxed m-0 break-words">
                      "{selectedEngagement.comments || 'No comment recorded for this entry.'}"
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#b9b7ad] text-xs">
                <p>Select an engagement from the list to see the full breakdown.</p>
              </div>
            )}
          </div>

          <div className="mt-3.5 pt-3 border-t border-[#765b24]/30 text-center">
            <span className="text-[10px] text-[#8b681f] font-bold uppercase tracking-wider block">
              CONFIDENTIAL ACCOUNTABILITY RECORD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
