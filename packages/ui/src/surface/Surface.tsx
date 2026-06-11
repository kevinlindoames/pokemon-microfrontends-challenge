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
    'border border-[var(--surface-default-border)] bg-[var(--surface-default)] shadow-xl shadow-[var(--surface-default-shadow)]',
  soft: 'border border-[var(--surface-soft-border)] bg-[var(--surface-soft)] shadow-2xl shadow-[var(--surface-soft-shadow)] backdrop-blur',
  danger:
    'border border-[var(--surface-danger-border)] bg-[var(--surface-danger)] text-[var(--surface-danger-text)]',
  transparent: 'border border-transparent bg-transparent',
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
        variantClassNames[variant],
        radiusClassNames[radius],
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