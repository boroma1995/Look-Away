import React, { useState } from 'react';
import { UserProfile } from '../../types';
import {
  ArrowLeft,
  Check,
  Calendar,
  CalendarDays,
  Clock,
  SlidersHorizontal,
} from 'lucide-react';

interface CreateReportScreenProps {
  user: UserProfile;
  startDate: string;
  endDate: string;
  onUpdateDates: (start: string, end: string) => void;
  onGenerateReport: (emailToSend: string) => void;
  onBack: () => void;
}

const PERIOD_OPTIONS: { period: string; icon: typeof Calendar }[] = [
  { period: 'LAST 7 DAYS', icon: Calendar },
  { period: 'LAST 30 DAYS', icon: CalendarDays },
  { period: 'LAST 90 DAYS', icon: Clock },
  { period: 'CUSTOM RANGE', icon: SlidersHorizontal },
];

export function CreateReportScreen({
  user,
  onGenerateReport,
  onBack,
}: CreateReportScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('LAST 7 DAYS');
  const [email, setEmail] = useState(user.email || 'email@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport(email);
  };

  return (
    <div className="w-full h-full min-h-[520px] max-w-[380px] mx-auto p-4 sm:p-5 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="text-[#f1ca63] hover:text-[#fff] p-1 cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          <h2 className="font-serif-gold text-xs sm:text-sm font-black tracking-[0.2em] text-[#f1ca63] uppercase m-0">
            CREATE REPORT
          </h2>

          <div className="w-5" />
        </div>

        {/* Subtitle: Select Report Period */}
        <div className="text-center pt-2 pb-4">
          <p className="text-xs sm:text-sm text-[#8c8c88] font-normal tracking-wide m-0">
            Select Report Period
          </p>
        </div>

        {/* 4 Period Cards */}
        <div className="space-y-3 py-1">
          {PERIOD_OPTIONS.map(({ period, icon: IconComponent }) => {
            const isSelected = selectedPeriod === period;
            return (
              <button
                key={period}
                type="button"
                id={`report-period-${period.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedPeriod(period)}
                className={`w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-bold tracking-wider transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#030814] text-[#eee] border border-[#f1ca63]'
                    : 'bg-[#030814] text-[#eee] border border-[#765b24]/60 hover:border-[#f1ca63]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-[#f1ca63]' : 'text-[#8c8c88]'
                    }`}
                    strokeWidth={1.75}
                  />
                  <span>{period}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected
                      ? 'border-[#f1ca63] bg-[#f1ca63] text-[#0a0e14]'
                      : 'border-[#765b24]/60'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Email Input Section */}
        <div className="pt-6">
          <p className="text-xs sm:text-sm text-[#8c8c88] font-normal tracking-wide pb-2 text-left">
            Send Report To Email
          </p>
          <input
            type="email"
            id="report-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#765b24]/60 rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#f1ca63]"
          />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          id="generate-report-btn"
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl font-serif-gold text-xs sm:text-sm font-bold tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] cursor-pointer uppercase"
        >
          GENERATE REPORT
        </button>
      </div>
    </div>
  );
}
