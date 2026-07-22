'use client';

import { Plus } from 'lucide-react';
import clsx from 'clsx';

export default function EmptyCard({
  className,
  handleClick,
}: {
  className?: string;
  handleClick: () => void;
}) {
  return (
    <button
      className={clsx(
        'group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border',
        'bg-card hover:border-primary/50 hover:bg-accent/40 transition-all duration-200 cursor-pointer',
        'min-h-[232px] w-full',
        className
      )}
      onClick={handleClick}
    >
      {/* Plus icon in a rounded square */}
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
        <Plus className="w-6 h-6 text-primary" strokeWidth={2.5} />
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">Create workspace</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Start a new team and
          <br />
          get more done together.
        </p>
      </div>
    </button>
  );
}
