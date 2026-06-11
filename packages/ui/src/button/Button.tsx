import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const baseClassName =
  'inline-flex items-center justify-center rounded-full font-black transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60';

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    'bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 focus:ring-red-300 dark:bg-cyan-100 dark:text-slate-950 dark:hover:bg-cyan-200 dark:focus:ring-cyan-300/40',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-100 focus:ring-red-300 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-100 dark:hover:bg-cyan-300/20 dark:focus:ring-cyan-300/40',
  danger:
    'bg-red-700 text-white shadow-lg shadow-red-700/20 hover:bg-red-800 focus:ring-red-300',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-red-300 dark:text-cyan-100 dark:hover:bg-cyan-300/10 dark:focus:ring-cyan-300/40',
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
};

export function Button({
  children,
  className = '',
  fullWidth = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        baseClassName,
        variantClassNames[variant],
        sizeClassNames[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}