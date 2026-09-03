interface GoldDividerProps {
  className?: string;
  glow?: boolean;
  compact?: boolean;
}

export function GoldDivider({ className = '', glow = false, compact = false }: GoldDividerProps) {
  return (
    <div
      className={`flex items-center justify-center w-full select-none ${
        compact ? 'my-2' : 'my-3.5'
      } ${className}`}
    >
      {/* Left Gold Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c9982c]/80 to-[#f1ca63]" />

      {/* Center 4-Point Diamond Spearhead Star Emblem */}
      <div
        className={`px-2 shrink-0 flex items-center justify-center text-[#f1ca63] ${
          glow ? 'filter drop-shadow-[0_0_8px_rgba(241,202,99,0.7)]' : ''
        }`}
      >
        <svg
          width={compact ? '14' : '18'}
          height={compact ? '14' : '18'}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Curved 4-Point Star */}
          <path
            d="M12 2 C12 7.5 16.5 12 22 12 C16.5 12 12 16.5 12 22 C12 16.5 7.5 12 2 12 C7.5 12 12 7.5 12 2 Z"
            fill="#f1ca63"
          />
          {/* Center Cutout Diamond */}
          <path
            d="M12 8.5 C12 10.4 13.6 12 15.5 12 C13.6 12 12 13.6 12 15.5 C12 13.6 10.4 12 8.5 12 C10.4 12 12 10.4 12 8.5 Z"
            fill="#030814"
          />
        </svg>
      </div>

      {/* Right Gold Line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#c9982c]/80 to-[#f1ca63]" />
    </div>
  );
}
