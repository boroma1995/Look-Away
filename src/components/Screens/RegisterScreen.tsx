import React, { useState } from 'react';
import { MainLogo } from '../LionCrest';
import { UserProfile } from '../../types';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Zap, Check } from 'lucide-react';

interface RegisterScreenProps {
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onContinue: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterScreen({
  user,
  onSaveProfile,
  onContinue,
}: RegisterScreenProps) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState(user.email || 'john.doe@example.com');
  const [pin, setPin] = useState(user.pin || '1234');
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      name: user.name || 'John Doe',
      phone: user.phone || '(555) 234-5678',
      email: email.trim() || 'john.doe@example.com',
      pin: pin.trim() || '1234',
      isRegistered: true,
    });
    onContinue();
  };

  const handleDemoAccess = () => {
    onSaveProfile({
      name: 'John Doe',
      phone: '(555) 234-5678',
      email: 'john.doe@example.com',
      pin: '1234',
      isRegistered: true,
      accountabilityEmail: 'mentor.smith@example.com',
      joinedDate: user.joinedDate || new Date().toISOString(),
    });
    onContinue();
  };

  return (
    <div className="w-full h-full min-h-[560px] max-w-[380px] mx-auto p-3.5 sm:p-4 flex flex-col justify-between select-none">
      {/* Top Header Matching Screen 4 */}
      <div>
        <div className="flex flex-col items-center justify-center pt-2 sm:pt-3 text-center">
          <div className="relative drop-shadow-[0_0_20px_rgba(241,202,99,0.3)]">
            <MainLogo size={80} glow={true} className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          </div>

          <p className="font-serif-gold text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] text-[#d6b158] uppercase mt-1 mb-1.5">
            EYES OF INTEGRITY
          </p>

          {/* Gold Star Divider */}
          <div className="flex items-center justify-center w-full my-1 opacity-60">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
            <span className="text-[#f1ca63] text-xs px-2">✦</span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8b681f] to-transparent w-full" />
          </div>
        </div>

        {/* Segmented Tab Switcher Matching Screen 4 */}
        <div className="bg-[#030814] border border-[#6b5220] rounded-xl p-1 flex gap-1 mt-3 mb-4">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg font-serif-gold text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] shadow-sm font-black'
                : 'text-[#b9b7ad] hover:text-[#f1ca63]'
            }`}
          >
            LOG IN
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-lg font-serif-gold text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] text-[#0a0e14] shadow-sm font-black'
                : 'text-[#b9b7ad] hover:text-[#f1ca63]'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email / Username */}
          <div className="text-left">
            <label className="text-[10px] font-bold tracking-wider text-[#f1ca63] uppercase mb-1 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-[#f1ca63]" />
              <span>EMAIL OR USERNAME</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="register-email-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                className="w-full bg-[#040813] text-[#eee] placeholder:text-[#6e6e6a] border border-[#6b5220] focus:border-[#f1ca63] rounded-xl py-2.5 px-3 text-xs outline-none transition-all"
              />
            </div>
          </div>

          {/* Security PIN / Password */}
          <div className="text-left">
            <label className="text-[10px] font-bold tracking-wider text-[#f1ca63] uppercase mb-1 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#f1ca63]" />
              <span>SECURITY PIN / PASSWORD</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPin ? 'text' : 'password'}
                id="register-pin-input"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (e.g. 1234)"
                className="w-full bg-[#040813] text-[#eee] placeholder:text-[#6e6e6a] border border-[#6b5220] focus:border-[#f1ca63] rounded-xl py-2.5 px-3 pr-10 text-xs outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b681f] hover:text-[#f1ca63] p-1 cursor-pointer"
                title={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button: Solid Gold Gradient */}
          <div className="pt-2">
            <button
              type="submit"
              id="register-submit-btn"
              className="w-full py-3.5 px-4 rounded-xl font-serif-gold text-xs sm:text-sm font-black tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(216,168,56,0.35)] cursor-pointer uppercase flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#0a0e14]" strokeWidth={2.25} />
              <span>
                {tab === 'login' ? 'LOG IN & ACCESS APP FEATURES' : 'CREATE ACCOUNT & GET STARTED'}
              </span>
            </button>
          </div>

          {/* Quick Demo Access Button: Dark with Gold Border */}
          <div>
            <button
              type="button"
              id="register-demo-btn"
              onClick={handleDemoAccess}
              className="w-full py-2.5 px-3 rounded-xl bg-[#030814] border border-[#6b5220] hover:border-[#f1ca63] text-[#f1ca63] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-[#f1ca63]" />
              <span>Quick Demo Access (John Doe)</span>
            </button>
          </div>
        </form>

        {/* Toggle Account Link */}
        <div className="text-center pt-2">
          <span className="text-xs text-[#b9b7ad]">
            {tab === 'login' ? "Don't have an account yet?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              className="text-[#f1ca63] font-bold hover:underline cursor-pointer ml-1"
            >
              {tab === 'login' ? 'Sign Up here' : 'Log In here'}
            </button>
          </span>
        </div>
      </div>

      {/* Features Unlocked List Matching Screen 4 */}
      <div className="mt-3 p-3 bg-[#040813] border border-[#554018] rounded-xl text-left">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#b9b7ad] block mb-1">
          FEATURES UNLOCKED UPON SIGN IN:
        </span>
        <div className="flex items-center gap-2 text-[11px] text-[#f7f4e8]">
          <Check className="w-3.5 h-3.5 text-[#f1ca63] shrink-0" strokeWidth={2.5} />
          <span>4-Tier Score scale tracking with location, attire & feelings</span>
        </div>
      </div>
    </div>
  );
}
