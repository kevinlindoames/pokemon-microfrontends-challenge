import type { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={['animate-pulse bg-slate-200 dark:bg-white/10', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}