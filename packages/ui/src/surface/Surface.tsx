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
  default: 'ui-surface-default border',
  soft: 'ui-surface-soft border',
  danger: 'ui-surface-danger border',
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