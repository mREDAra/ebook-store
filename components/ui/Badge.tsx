import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'secondary';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold max-w-fit transition-colors',
        {
          'bg-gradient-to-r from-gold-light to-gold text-white shadow-sm': variant === 'default',
          'border border-gold text-gold-dark': variant === 'outline',
          'bg-surface-dark text-text-secondary': variant === 'secondary',
        },
        className
      )}
      {...props}
    />
  );
}
