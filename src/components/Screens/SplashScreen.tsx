import { MainLogo } from '../LionCrest';

interface SplashScreenProps {
  onGetStarted: () => void;
  onLogIn?: () => void;
  onSignUp?: () => void;
}

export function SplashScreen({ onGetStarted, onLogIn, onSignUp }: SplashScreenProps) {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col justify-between items-center text-center p-6 sm:p-8 relative">
      {/* Top Spacer */}
      <div className="h-4 sm:h-6" />

      {/* Main Center Emblem & Motto */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative mb-6 drop-shadow-[0_0_25px_rgba(241,202,99,0.35)]">
          <MainLogo size={280} glow={true} className="w-60 h-60 sm:w-68 sm:h-68 object-contain" />
        </div>

        <p className="font-serif-gold text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#d6b158] uppercase select-none mt-4">
          STAY FOCUSED. STAY FAITHFUL.
        </p>
      </div>

      {/* Bottom Action Area: GET STARTED and under it LOG IN & SIGN UP */}
      <div className="w-full max-w-sm pt-4 pb-2 space-y-2.5">
        <button
          type="button"
          id="splash-get-started-btn"
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-xl font-serif-gold text-sm sm:text-base font-bold tracking-widest text-[#0a0e14] bg-gradient-to-r from-[#d8a838] via-[#eec765] to-[#c9982c] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_4px_25px_rgba(216,168,56,0.4)] cursor-pointer uppercase"
        >
          GET STARTED
        </button>

        {/* Under GET STARTED: LOG IN and SIGN UP */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            id="splash-login-btn"
            onClick={onLogIn || onGetStarted}
            className="py-2.5 px-3 rounded-xl border border-[#765b24]/70 hover:border-[#f1ca63] text-[#f1ca63] hover:text-[#fff] text-xs font-bold tracking-wider uppercase bg-[#02050c] hover:bg-[#07101f] transition-all cursor-pointer"
          >
            LOG IN
          </button>
          <button
            type="button"
            id="splash-signup-btn"
            onClick={onSignUp || onGetStarted}
            className="py-2.5 px-3 rounded-xl border border-[#765b24]/70 hover:border-[#f1ca63] text-[#f1ca63] hover:text-[#fff] text-xs font-bold tracking-wider uppercase bg-[#02050c] hover:bg-[#07101f] transition-all cursor-pointer"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
