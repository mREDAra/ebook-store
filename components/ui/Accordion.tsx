'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={cn(
              'border border-border rounded-xl overflow-hidden transition-all duration-300',
              isOpen ? 'bg-surface-dark/50 border-gold/30' : 'bg-white hover:border-gold/30'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex justify-between items-center w-full p-5 text-start focus:outline-none"
            >
              <span className="font-semibold text-text-primary pe-4">{item.q}</span>
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gold transition-transform duration-300 shrink-0',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-in-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 text-text-secondary leading-relaxed border-t border-border/50 border-s-4 border-s-gold/50 bg-surface/30">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
