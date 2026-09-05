import { useState } from 'react';

interface LionCrestProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
  src?: string;
}

export function LionCrest({ size = 58, className = '', glow = false, src = '/Logo+lookaway.png' }: LionCrestProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (imgSrc === src) {
      // Try fallback path in public/assets if needed
      setImgSrc('/assets/Logo_main.png');
    } else {
      setImgError(true);
    }
  };

  if (imgError) {
    // Fallback SVG if image is ever missing
    return (
      <div
        className={`relative flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="35%" stopColor="#F1CA63" />
              <stop offset="70%" stopColor="#C9982C" />
              <stop offset="100%" stopColor="#8B681F" />
            </linearGradient>
          </defs>
          <path
            d="M50 4 C68 4 88 12 88 32 C88 64 50 94 50 94 C50 94 12 64 12 32 C12 12 32 4 50 4 Z"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />
          <path
            d="M36 21 L43 28 L50 17 L57 28 L64 21 L62 31 L38 31 Z"
            fill="url(#goldGrad)"
            stroke="#765B24"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${glow ? 'filter drop-shadow-[0_0_12px_rgba(241,202,99,0.35)]' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imgSrc}
        alt="Look Away Logo"
        onError={handleError}
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain pointer-events-none"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
}

export const MainLogo = LionCrest;

export function HeroSilhouette() {
  const [imgSrc, setImgSrc] = useState('/Logo+lookaway.png');
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (imgSrc === '/Logo+lookaway.png') {
      setImgSrc('/assets/Logo_main.png');
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="relative w-full py-3 sm:py-4 flex items-center justify-center select-none">
      {!imgError ? (
        <img
          src={imgSrc}
          alt="Look Away Main Logo"
          onError={handleError}
          referrerPolicy="no-referrer"
          className="h-36 sm:h-48 w-auto object-contain max-w-full pointer-events-none drop-shadow-[0_0_20px_rgba(241,202,99,0.25)]"
        />
      ) : (
        <LionCrest size={100} glow={false} />
      )}
    </div>
  );
}
