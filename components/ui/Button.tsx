import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-light focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-gradient-to-r from-gold to-gold-dark text-white shadow-[0_4px_20px_rgba(180,150,100,0.3)] hover:scale-[1.02]':
              variant === 'primary',
            'bg-surface-dark text-text-primary hover:bg-[#E8DDD0]': variant === 'secondary',
            'border-2 border-gold-light text-gold-dark hover:bg-gold-light/10':
              variant === 'outline',
            'hover:bg-black/5 text-text-secondary': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
