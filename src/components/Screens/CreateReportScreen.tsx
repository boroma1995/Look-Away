import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { TriggerEntry } from '../../types';
import { TriggersScreen } from './TriggersScreen';
import {
  ArrowLeft,
  Check,
  Calendar,
  CalendarDays,
  Clock,
  SlidersHorizontal,
  Smartphone,
} from 'lucide-react';

interface CreateReportScreenProps {
  user: UserProfile;
  startDate: string;
  endDate: string;
  onUpdateDates: (start: string, end: string) => void;
  onGenerateReport: (emailToSend: string, secondaryEmailToSend: string, phoneToSend: string, generalComments: string, triggers: TriggerEntry[]) => void;
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
  endDate,
  onUpdateDates,
  onGenerateReport,
  onBack,
}: CreateReportScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('LAST 7 DAYS');
  const [email, setEmail] = useState(user.accountabilityEmail || user.email || 'email@example.com');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [phone, setPhone] = useState(user.phone || '');
  const [generalComments, setGeneralComments] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<TriggerEntry[]>([]);
  const [showTriggers, setShowTriggers] = useState(false);

  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
    if (period !== 'CUSTOM RANGE') {
      const days = period === 'LAST 30 DAYS' ? 30 : period === 'LAST 90 DAYS' ? 90 : 7;
      const periodEnd = new Date(endDate || new Date().toISOString().slice(0, 10));
      const periodStart = new Date(periodEnd);
      periodStart.setDate(periodEnd.getDate() - days + 1);
      onUpdateDates(periodStart.toISOString().slice(0, 10), periodEnd.toISOString().slice(0, 10));
    }
  };

  const handleOpenTriggers = (e?: React.FormEvent) => {
    e?.preventDefault();
    setShowTriggers(true);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onGenerateReport(email, secondaryEmail, phone, generalComments, selectedTriggers);
  };

  if (showTriggers) {
    return (
      <TriggersScreen
        selectedTriggers={selectedTriggers}
        onToggleTrigger={(trigger) =>
          setSelectedTriggers((current) =>
            current.some((entry) => entry.trigger === trigger)
              ? current.filter((entry) => entry.trigger !== trigger)
              : [...current, { trigger, comment: '' }]
          )
        }
        onChangeComment={(trigger, comment) =>
          setSelectedTriggers((current) =>
            current.map((entry) => (entry.trigger === trigger ? { ...entry, comment } : entry))
          )
        }
        onNext={handleSubmit}
        onBack={() => setShowTriggers(false)}
        nextLabel="CREATE REPORT"
      />
    );
  }

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
                onClick={() => handleSelectPeriod(period)}
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
            Primary Report Email
          </p>
          <input
            type="email"
            id="report-email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#765b24]/60 rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#f1ca63]"
          />
          <p className="text-[10px] text-[#8c8c88] mt-1.5 text-left">This address stays as the default for future reports until you change it.</p>
        </div>

        <div className="pt-4">
          <p className="text-xs sm:text-sm text-[#8c8c88] font-normal tracking-wide pb-2 text-left">
            Secondary Report Email <span className="text-[#6e6e6a]">(optional)</span>
          </p>
          <input
            type="email"
            id="report-secondary-email-input"
            value={secondaryEmail}
            onChange={(e) => setSecondaryEmail(e.target.value)}
            placeholder="another-person@example.com"
            className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#765b24]/60 rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#f1ca63]"
          />
          <p className="text-[10px] text-[#8c8c88] mt-1.5 text-left">This field is blank each time you create a new report.</p>
        </div>

        <button
          type="button"
          onClick={handleOpenTriggers}
          className="w-full mt-4 py-3 rounded-xl font-serif-gold text-xs font-bold tracking-widest text-[#f1ca63] bg-[#030814] border border-[#765b24]/60 hover:border-[#f1ca63] uppercase"
        >
          LOG TRIGGERS {selectedTriggers.length ? `(${selectedTriggers.length})` : ''}
        </button>

        <div className="pt-4">
          <p className="text-xs sm:text-sm text-[#8c8c88] font-normal tracking-wide pb-2 text-left">
            Text Report To Phone
          </p>
          <div className="relative">
            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b681f]" />
            <input
              type="tel"
              id="report-phone-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(555) 234-5678"
              className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#765b24]/60 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-[#f1ca63]"
            />
          </div>
        </div>

        <div className="pt-4">
          <p className="text-xs sm:text-sm text-[#8c8c88] font-normal tracking-wide pb-2 text-left">
            General Comments / Observations
          </p>
          <textarea
            id="report-comments-textarea"
            value={generalComments}
            onChange={(e) => setGeneralComments(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Add observations for your therapist or accountability partner..."
            className="w-full bg-[#030814] text-[#eee] placeholder:text-[#6e6e6a] border border-[#765b24]/60 rounded-xl py-3 px-4 text-xs sm:text-sm outline-none focus:border-[#f1ca63] resize-none"
          />
        </div>
      </div>

      {/* Bottom Action */}
      <div className="pt-4 pb-2">
        <button
          type="button"
          id="generate-report-btn"
          onClick={handleOpenTriggers}
          className="w-full py-3.5 rounded-xl font-serif-gold text-xs sm:text-sm font-bold tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] cursor-pointer uppercase"
        >
          CREATE REPORT
        </button>
      </div>
    </div>
  );
}
