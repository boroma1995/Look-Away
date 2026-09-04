import { LionCrest } from './LionCrest';
import { GoldDivider } from './GoldDivider';
import { ViewMode, FlowStep, UserProfile } from '../types';
import {
  Smartphone,
  LayoutDashboard,
  Grid3X3,
  Home,
  PlusCircle,
  FileText,
  Settings,
  User,
  LogOut,
  LogIn,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  currentStep: FlowStep;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  onNavigate: (step: FlowStep) => void;
  streakDays: number;
  isAuthenticated?: boolean;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
  onOpenAdmin?: () => void;
}

export function Header({
  user,
  currentStep,
  viewMode,
  onSetViewMode,
  onNavigate,
  streakDays,
  isAuthenticated = true,
  onOpenAuthModal,
  onLogout,
  onOpenAdmin,
}: HeaderProps) {
  const isLogging = [
    'score',
    'feeling',
    'location',
    'attire',
    'eyes',
    'build',
    'hair',
    'comments',
    'review',
    'confirmation',
  ].includes(currentStep);

  const isReporting = [
    'reports',
    'create_report',
    'report_summary',
    'engagements_list',
    'engagement_detail',
  ].includes(currentStep);

  return (
    <div className="mb-4 sm:mb-6">
      <header className="flex items-center justify-between gap-2 pb-2">
        {/* Brand Logo & Minimal Streak Badge */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
          onClick={() => onNavigate('home')}
        >
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            <LionCrest size={72} glow={false} className="w-16 sm:w-20 h-auto" />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* User Account Chip */}
            {isAuthenticated ? (
              <button
                type="button"
                id="header-user-account-btn"
                title={`Logged in as ${user.name}. Click to switch user or log out.`}
                onClick={onOpenAuthModal}
                className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-bold text-[#e6c866] bg-[#030814] px-2.5 py-1 rounded-full border border-[#8b681f]/60 hover:border-[#f1ca63] transition-colors cursor-pointer"
              >
                <User className="w-3 h-3 text-[#f1ca63]" strokeWidth={1.5} />
                <span className="max-w-[110px] truncate">{user.name || 'Account'}</span>
              </button>
            ) : (
              <button
                type="button"
                id="header-login-btn"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-[#090d10] bg-gradient-to-r from-[#c9982c] to-[#805c18] px-2.5 py-1 rounded-full border border-[#f0c65c] shadow-sm hover:brightness-110 cursor-pointer"
              >
                <LogIn className="w-3 h-3" />
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Right: Navigation (Desktop only) & View Switcher (Both) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop Top Navigation (hidden on mobile since BottomNavBar is sticky) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#030814] p-1 rounded-lg border border-[#8b681f]">
            <button
              id="nav-home-btn"
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep === 'home'
                  ? 'border border-[#8b681f] text-[#e6c866] bg-[#c9982c]/20 shadow-[0_0_10px_rgba(201,152,44,0.25)]'
                  : 'border border-transparent text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#091322]'
              }`}
            >
              <Home className="w-3 h-3 text-[#f1ca63]" strokeWidth={1.5} />
              HOME
            </button>
            <button
              id="nav-log-btn"
              onClick={() => onNavigate('score')}
              className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-all flex items-center gap-1.5 cursor-pointer ${
                isLogging
                  ? 'border border-[#8b681f] text-[#e6c866] bg-[#c9982c]/20 shadow-[0_0_10px_rgba(201,152,44,0.25)]'
                  : 'border border-transparent text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#091322]'
              }`}
            >
              <PlusCircle className="w-3 h-3 text-[#f1ca63]" strokeWidth={1.5} />
              LOG
            </button>
            <button
              id="nav-reports-btn"
              onClick={() => onNavigate('report_summary')}
              className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-all flex items-center gap-1.5 cursor-pointer ${
                isReporting
                  ? 'border border-[#8b681f] text-[#e6c866] bg-[#c9982c]/20 shadow-[0_0_10px_rgba(201,152,44,0.25)]'
                  : 'border border-transparent text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#091322]'
              }`}
            >
              <FileText className="w-3 h-3 text-[#f1ca63]" strokeWidth={1.5} />
              REPORTS
            </button>
            <button
              id="nav-settings-btn"
              onClick={() => onNavigate('settings')}
              className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-all flex items-center gap-1.5 cursor-pointer ${
                currentStep === 'settings'
                  ? 'border border-[#8b681f] text-[#e6c866] bg-[#c9982c]/20 shadow-[0_0_10px_rgba(201,152,44,0.25)]'
                  : 'border border-transparent text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#091322]'
              }`}
            >
              <Settings className="w-3 h-3 text-[#f1ca63]" strokeWidth={1.5} />
              SETTINGS
            </button>
          </nav>

          {/* View Mode Switcher: Mobile Phone Frame / Desktop Expanded / 16 Screens Grid */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-[#030814] p-0.5 sm:p-1 rounded-lg border border-[#8b681f]/80">
            <button
              id="view-mobile-btn"
              title="Mobile Phone View"
              onClick={() => onSetViewMode('mobile')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#030814] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Mobile Frame</span>
            </button>
            <button
              id="view-web-btn"
              title="Desktop View"
              onClick={() => onSetViewMode('web')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'web'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#030814] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">Desktop View</span>
            </button>
            <button
              id="view-showcase-btn"
              title="All 18 Mobile Screens Gallery & Screenshots"
              onClick={() => onSetViewMode('showcase')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'showcase'
                  ? 'bg-gradient-to-r from-[#d8a838] to-[#c9982c] text-[#030814] shadow-sm'
                  : 'text-[#b9b7ad] hover:text-[#f1ca63]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="hidden sm:inline">18 Screens (Gallery)</span>
            </button>
          </div>

          {onOpenAdmin && (
            <button
              type="button"
              id="header-admin-btn"
              title="Open admin records"
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1 p-2 rounded-lg bg-[#030814] border border-[#8b681f]/60 text-[#b9b7ad] hover:text-[#f1ca63] hover:border-[#f1ca63] transition-colors cursor-pointer text-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">ADMIN</span>
            </button>
          )}

          {/* Quick Log Out button on desktop if authenticated */}
          {isAuthenticated && onLogout && (
            <button
              type="button"
              id="header-logout-btn"
              title="Log Out & Switch User"
              onClick={onLogout}
              className="hidden xl:flex items-center gap-1 p-2 rounded-lg bg-[#030814] border border-[#8b681f]/60 text-[#b9b7ad] hover:text-[#f1ca63] hover:border-[#f1ca63] transition-colors cursor-pointer text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Gold Spearline Divider below Header */}
      <GoldDivider compact={true} />
    </div>
  );
}

export function BottomNavBar({
  currentStep,
  onNavigate,
  onOpenAdmin,
}: {
  currentStep: FlowStep;
  onNavigate: (step: FlowStep) => void;
  onOpenAdmin?: () => void;
}) {
  const isLogging = [
    'score',
    'feeling',
    'location',
    'attire',
    'eyes',
    'build',
    'hair',
    'comments',
    'review',
    'confirmation',
  ].includes(currentStep);

  const isReporting = [
    'reports',
    'create_report',
    'report_summary',
    'engagements_list',
    'engagement_detail',
  ].includes(currentStep);

  return (
    <div className={`native-bottom-nav fixed left-1/2 -translate-x-1/2 bottom-0 w-[calc(100%-12px)] sm:w-[900px] sm:max-w-[calc(100%-20px)] h-[58px] sm:h-[64px] bg-gradient-to-b from-[#0b1627]/98 to-[#040914]/98 backdrop-blur-xl border border-[#8b681f]/80 rounded-t-2xl grid ${onOpenAdmin ? 'grid-cols-5' : 'grid-cols-4'} z-50 shadow-[0_-12px_35px_rgba(0,0,0,0.8),0_0_22px_rgba(201,152,44,0.08)] overflow-hidden`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f1ca63] to-transparent opacity-80" />
      <button
        id="bottom-nav-home"
        onClick={() => onNavigate('home')}
        className={`bg-transparent m-1 py-1 px-1 text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-r border-[#4f401e] transition-all hover:-translate-y-0.5 cursor-pointer relative rounded-lg ${
          currentStep === 'home'
            ? 'text-[#f1ca63] bg-[#c9982c]/20 shadow-[inset_0_0_14px_rgba(241,202,99,0.08)]'
            : 'text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#0b1525]'
        }`}
      >
        {currentStep === 'home' && (
          <span className="absolute top-0 inset-x-2 h-[2px] bg-[#f1ca63] shadow-[0_0_8px_#f1ca63]" />
        )}
        <Home className="w-4 h-4" strokeWidth={1.5} />
        <span className="tracking-widest uppercase">HOME</span>
      </button>

      <button
        id="bottom-nav-log"
        onClick={() => onNavigate('score')}
        className={`bg-transparent m-1 py-1 px-1 text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-r border-[#4f401e] transition-all hover:-translate-y-0.5 cursor-pointer relative rounded-lg ${
          isLogging
            ? 'text-[#f1ca63] bg-[#c9982c]/20 shadow-[inset_0_0_14px_rgba(241,202,99,0.08)]'
            : 'text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#0b1525]'
        }`}
      >
        {isLogging && (
          <span className="absolute top-0 inset-x-2 h-[2px] bg-[#f1ca63] shadow-[0_0_8px_#f1ca63]" />
        )}
        <PlusCircle className="w-4 h-4" strokeWidth={1.5} />
        <span className="tracking-widest uppercase">LOG</span>
      </button>

      <button
        id="bottom-nav-reports"
        onClick={() => onNavigate('report_summary')}
        className={`bg-transparent m-1 py-1 px-1 text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-r border-[#4f401e] transition-all hover:-translate-y-0.5 cursor-pointer relative rounded-lg ${
          isReporting
            ? 'text-[#f1ca63] bg-[#c9982c]/20 shadow-[inset_0_0_14px_rgba(241,202,99,0.08)]'
            : 'text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#0b1525]'
        }`}
      >
        {isReporting && (
          <span className="absolute top-0 inset-x-2 h-[2px] bg-[#f1ca63] shadow-[0_0_8px_#f1ca63]" />
        )}
        <FileText className="w-4 h-4" strokeWidth={1.5} />
        <span className="tracking-widest uppercase">REPORTS</span>
      </button>

      <button
        id="bottom-nav-settings"
        onClick={() => onNavigate('settings')}
        className={`bg-transparent m-1 py-1 px-1 text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 ${onOpenAdmin ? 'border-r border-[#4f401e]' : ''} transition-all hover:-translate-y-0.5 cursor-pointer relative rounded-lg ${
          currentStep === 'settings'
            ? 'text-[#f1ca63] bg-[#c9982c]/20 shadow-[inset_0_0_14px_rgba(241,202,99,0.08)]'
            : 'text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#0b1525]'
        }`}
      >
        {currentStep === 'settings' && (
          <span className="absolute top-0 inset-x-2 h-[2px] bg-[#f1ca63] shadow-[0_0_8px_#f1ca63]" />
        )}
        <Settings className="w-4 h-4" strokeWidth={1.5} />
        <span className="tracking-widest uppercase">SETTINGS</span>
      </button>

      {onOpenAdmin && (
        <button
          id="bottom-nav-admin"
          onClick={onOpenAdmin}
          className={`bg-transparent m-1 py-1 px-1 text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-l border-[#4f401e] transition-all hover:-translate-y-0.5 cursor-pointer relative rounded-lg ${currentStep === 'admin' ? 'text-[#f1ca63] bg-[#c9982c]/20 shadow-[inset_0_0_14px_rgba(241,202,99,0.08)]' : 'text-[#b9b7ad] hover:text-[#f1ca63] hover:bg-[#0b1525]'}`}
        >
          {currentStep === 'admin' && <span className="absolute top-0 inset-x-2 h-[2px] bg-[#f1ca63] shadow-[0_0_8px_#f1ca63]" />}
          <ShieldCheck className="w-4 h-4" strokeWidth={1.5} />
          <span className="tracking-widest uppercase">ADMIN</span>
        </button>
      )}
    </div>
  );
}
