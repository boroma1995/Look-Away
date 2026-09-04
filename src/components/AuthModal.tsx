import React, { useState } from 'react';
import { MainLogo } from './LionCrest';
import { GoldDivider } from './GoldDivider';
import { UserProfile } from '../types';
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Zap,
  X,
  ArrowLeft,
  LogIn,
  UserPlus,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  currentUser: UserProfile;
  initialView?: 'welcome' | 'login' | 'signup';
  onClose: () => void;
  onLogin: (profile: UserProfile) => void;
  onSignUp: (profile: UserProfile) => void;
}

export function AuthModal({
  isOpen,
  currentUser,
  initialView = 'welcome',
  onClose,
  onLogin,
  onSignUp,
}: AuthModalProps) {
  const [view, setView] = useState<'welcome' | 'login' | 'signup'>(initialView);

  // Reset view when reopened
  React.useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState(currentUser.email || '');
  const [loginPin, setLoginPin] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Sign Up Form Fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPin, setSignUpPin] = useState('');
  const [showSignUpPin, setShowSignUpPin] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Please enter your email or username.');
      return;
    }

    const matchedUser: UserProfile = {
      ...currentUser,
      email: loginEmail.trim(),
      name: loginEmail.toLowerCase().includes('john')
        ? 'John Doe'
        : currentUser.name || loginEmail.split('@')[0],
      phone: currentUser.phone || '(555) 234-5678',
      accountabilityEmail: currentUser.accountabilityEmail || 'mentor@example.com',
      isRegistered: true,
      pin: loginPin || '1234',
    };

    onLogin(matchedUser);
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'John Doe',
      phone: '(555) 234-5678',
      email: 'john.doe@example.com',
      accountabilityEmail: 'mentor.smith@example.com',
      isRegistered: true,
      pin: '1234',
      joinedDate: 'May 1, 2025',
    };
    onLogin(demoUser);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpName.trim()) {
      setSignUpError('Please enter your full name.');
      return;
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      setSignUpError('Please enter a valid email address.');
      return;
    }

    const newUser: UserProfile = {
      name: signUpName.trim(),
      phone: signUpPhone.trim() || '(555) 234-5678',
      email: signUpEmail.trim(),
      accountabilityEmail: 'mentor@example.com',
      isRegistered: true,
      pin: signUpPin || '1234',
      joinedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    onSignUp(newUser);
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#030814]/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="auth-modal-container"
        className="w-full max-w-[420px] bg-[#030814] border border-[#8b681f] rounded-3xl shadow-[0_0_50px_rgba(201,152,44,0.35)] overflow-hidden my-auto p-5 sm:p-6 text-center relative"
      >
        {/* Modal Watermark with 5% Opacity */}
        <div
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <img
            src="/Logo+lookaway.png"
            alt=""
            className="w-[75%] max-w-[280px] object-contain pointer-events-none"
            style={{ opacity: 0.05 }}
          />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b681f] hover:text-[#f1ca63] p-1.5 rounded-full hover:bg-[#07101f] transition-colors z-20 cursor-pointer"
          title="Close dialog"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {/* ========================================================= */}
          {/* VIEW 1: WELCOME SCREEN (App Logo + Get Started + Log In / Sign Up) */}
          {/* ========================================================= */}
          {view === 'welcome' && (
            <div className="py-2">
              {/* App Logo */}
              <div className="flex justify-center mb-4">
                <div className="relative drop-shadow-[0_0_25px_rgba(241,202,99,0.35)]">
                  <MainLogo size={180} glow={true} className="w-40 h-40 sm:w-44 sm:h-44 object-contain" />
                </div>
              </div>

              {/* Title & Motto */}
              <p className="font-serif-gold text-xs font-medium tracking-[0.2em] text-[#d6b158] uppercase mt-2 mb-4">
                STAY FOCUSED. STAY FAITHFUL.
              </p>

              <GoldDivider compact={true} />

              {/* Action Buttons Section */}
              <div className="mt-6 space-y-3">
                {/* GET STARTED BUTTON */}
                <button
                  type="button"
                  id="auth-modal-get-started-btn"
                  onClick={() => setView('signup')}
                  className="w-full py-3.5 px-6 rounded-xl font-serif-gold text-sm font-bold tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(216,168,56,0.4)] cursor-pointer uppercase"
                >
                  GET STARTED
                </button>

                {/* Under GET STARTED: LOG IN & SIGN UP */}
                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      id="auth-modal-login-btn"
                      onClick={() => setView('login')}
                      className="py-3 px-3 rounded-xl border border-[#765b24]/80 hover:border-[#f1ca63] text-[#f1ca63] hover:text-[#fff] text-xs font-bold tracking-wider uppercase bg-[#02050c] hover:bg-[#07101f] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      LOG IN
                    </button>
                    <button
                      type="button"
                      id="auth-modal-signup-btn"
                      onClick={() => setView('signup')}
                      className="py-3 px-3 rounded-xl border border-[#765b24]/80 hover:border-[#f1ca63] text-[#f1ca63] hover:text-[#fff] text-xs font-bold tracking-wider uppercase bg-[#02050c] hover:bg-[#07101f] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      SIGN UP
                    </button>
                  </div>
                </div>

                {/* Quick 1-Click Demo Login */}
                <button
                  type="button"
                  id="auth-modal-demo-btn"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-transparent border border-[#765b24]/40 text-[#c5c3b8] hover:text-[#f1ca63] hover:border-[#f1ca63]/60 text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <Zap className="w-3.5 h-3.5 text-[#f1ca63]" />
                  Instant Demo Access (John Doe)
                </button>

                {/* Continue as Guest */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-xs text-[#8c8c88] hover:text-[#f1ca63] transition-colors cursor-pointer"
                  >
                    Explore app as guest →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: LOG IN SCREEN */}
          {/* ========================================================= */}
          {view === 'login' && (
            <div className="py-1 text-left">
              {/* Top navigation back */}
              <div className="flex items-center justify-between pb-3 border-b border-[#765b24]/40 mb-4">
                <button
                  type="button"
                  onClick={() => setView('welcome')}
                  className="text-xs font-bold text-[#b9b7ad] hover:text-[#f1ca63] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <span className="font-serif-gold text-xs font-bold tracking-widest text-[#f1ca63] uppercase">
                  LOG IN
                </span>
                <div className="w-8" />
              </div>

              {/* Mini App Logo */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <MainLogo size={84} glow={true} className="w-20 h-20 object-contain" />
              </div>

              {loginError && (
                <div className="bg-red-950/60 border border-red-500/80 text-red-200 text-xs p-2.5 rounded-lg font-medium mb-3">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="login-email-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <Mail className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Email or Username</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <Mail className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type="text"
                      id="login-email-input"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="john.doe@example.com"
                      className="w-full gold-input has-left-icon text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '1rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-pin-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <Lock className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Security PIN / Password</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <Lock className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type={showLoginPin ? 'text' : 'password'}
                      id="login-pin-input"
                      value={loginPin}
                      onChange={(e) => setLoginPin(e.target.value)}
                      placeholder="Enter 4-digit PIN (e.g. 1234)"
                      className="w-full gold-input has-both-icons text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '2.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPin(!showLoginPin)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b681f] hover:text-[#f1ca63] p-1 cursor-pointer z-10"
                      title={showLoginPin ? 'Hide PIN' : 'Show PIN'}
                      aria-label={showLoginPin ? 'Hide PIN' : 'Show PIN'}
                    >
                      {showLoginPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="login-submit-btn"
                  className="w-full btn-gold py-3 rounded-xl text-xs font-bold tracking-wider uppercase mt-4 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#090d10]" strokeWidth={2} />
                  Log In
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#02050c] border border-[#765b24]/70 text-[#f1ca63] text-xs font-bold hover:bg-[#07101f] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-[#f1ca63]" />
                  Quick Demo Access (John Doe)
                </button>

                <div className="text-center pt-3 border-t border-[#765b24]/30">
                  <span className="text-xs text-[#b9b7ad]">
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setView('signup')}
                      className="text-[#f1ca63] font-bold hover:underline cursor-pointer ml-1"
                    >
                      Sign Up here
                    </button>
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: SIGN UP SCREEN */}
          {/* ========================================================= */}
          {view === 'signup' && (
            <div className="py-1 text-left">
              {/* Top navigation back */}
              <div className="flex items-center justify-between pb-3 border-b border-[#765b24]/40 mb-4">
                <button
                  type="button"
                  onClick={() => setView('welcome')}
                  className="text-xs font-bold text-[#b9b7ad] hover:text-[#f1ca63] flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <span className="font-serif-gold text-xs font-bold tracking-widest text-[#f1ca63] uppercase">
                  CREATE ACCOUNT
                </span>
                <div className="w-8" />
              </div>

              {/* Mini App Logo */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <MainLogo size={84} glow={true} className="w-20 h-20 object-contain" />
              </div>

              {signUpError && (
                <div className="bg-red-950/60 border border-red-500/80 text-red-200 text-xs p-2.5 rounded-lg font-medium mb-3">
                  {signUpError}
                </div>
              )}

              <form onSubmit={handleSignUpSubmit} className="space-y-3">
                <div>
                  <label htmlFor="signup-name-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <User className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Full Name</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <User className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type="text"
                      id="signup-name-input"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full gold-input has-left-icon text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '1rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-email-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <Mail className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Email Address</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <Mail className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type="email"
                      id="signup-email-input"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full gold-input has-left-icon text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '1rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-phone-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <Phone className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Phone (Optional)</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <Phone className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type="tel"
                      id="signup-phone-input"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="(555) 234-5678"
                      className="w-full gold-input has-left-icon text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '1rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="signup-pin-input" className="text-[11px] font-bold tracking-wider text-[#f0d68a] uppercase mb-1.5 flex items-center gap-1.5 text-left">
                    <Lock className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={1.75} />
                    <span>Set Security PIN</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center text-[#9d7722] z-10">
                      <Lock className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <input
                      type={showSignUpPin ? 'text' : 'password'}
                      id="signup-pin-input"
                      value={signUpPin}
                      onChange={(e) => setSignUpPin(e.target.value)}
                      placeholder="Create 4-digit PIN (e.g. 1234)"
                      className="w-full gold-input has-both-icons text-xs sm:text-sm font-medium py-3"
                      style={{ paddingLeft: '2.85rem', paddingRight: '2.85rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignUpPin(!showSignUpPin)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8b681f] hover:text-[#f1ca63] p-1 cursor-pointer z-10"
                      title={showSignUpPin ? 'Hide PIN' : 'Show PIN'}
                      aria-label={showSignUpPin ? 'Hide PIN' : 'Show PIN'}
                    >
                      {showSignUpPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="signup-submit-btn"
                  className="w-full btn-gold py-3 rounded-xl text-xs font-bold tracking-wider uppercase mt-4 cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#090d10]" strokeWidth={2} />
                  Create Account & Continue
                </button>

                <div className="text-center pt-3 border-t border-[#765b24]/30">
                  <span className="text-xs text-[#b9b7ad]">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-[#f1ca63] font-bold hover:underline cursor-pointer ml-1"
                    >
                      Log In here
                    </button>
                  </span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
