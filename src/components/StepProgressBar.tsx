interface StepProgressBarProps {
  currentStepIndex: number;
  totalSteps: number;
  stepTitle?: string;
}

export function StepProgressBar({
  currentStepIndex,
  totalSteps,
  stepTitle,
}: StepProgressBarProps) {
  const percent = Math.min(100, Math.round((currentStepIndex / totalSteps) * 100));

  return (
    <div className="w-full mb-5">
      <div className="flex justify-between items-center text-[11px] font-black tracking-widest text-[#e9c75f] mb-2 uppercase">
        <span>{stepTitle || `Step ${currentStepIndex} of ${totalSteps}`}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 bg-[#030814] rounded-full overflow-hidden border border-[#765b24]/40">
        <div
          className="h-full bg-gradient-to-r from-[#9b701e] via-[#c9982c] to-[#f1ca63] transition-all duration-300 shadow-[0_0_8px_rgba(241,202,99,0.5)]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
