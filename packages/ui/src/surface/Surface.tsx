import type { HTMLAttributes, ReactNode } from 'react';

type SurfaceVariant = 'default' | 'soft' | 'danger' | 'transparent';

type SurfaceRadius = 'xl' | '2xl' | '3xl';

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: 'article' | 'div' | 'section';
  variant?: SurfaceVariant;
  radius?: SurfaceRadius;
};

const variantClassNames: Record<SurfaceVariant, string> = {
  default:
    'border border-slate-200 bg-white shadow-xl shadow-slate-200/60 dark:border-cyan-300/10 dark:bg-slate-950/70 dark:shadow-cyan-950/20',
  soft:
    'border border-red-100 bg-white/90 shadow-2xl shadow-red-100/60 backdrop-blur dark:border-cyan-300/20 dark:bg-slate-950/80 dark:shadow-cyan-950/40',
  danger:
    'border border-red-200 bg-red-50 text-red-700 shadow-lg shadow-red-100/60 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100 dark:shadow-red-950/20',
  transparent: 'border border-transparent bg-transparent shadow-none',
};

const radiusClassNames: Record<SurfaceRadius, string> = {
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-[2rem]',
};

export function Surface({
  as = 'div',
  children,
  className = '',
  radius = '3xl',
  variant = 'default',
  ...props
}: SurfaceProps) {
  const Component = as;

  return (
    <Component
      className={[
        radiusClassNames[radius],
        variantClassNames[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}