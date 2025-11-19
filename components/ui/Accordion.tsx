import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, subtitle, children, defaultOpen = false, className = "" }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-volau-green/20 dark:border-stone-800 rounded-lg bg-white dark:bg-stone-900 shadow-sm overflow-hidden mb-4 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 transition-colors text-left ${
          isOpen 
            ? 'bg-volau-green/10 dark:bg-volau-green/20' 
            : 'bg-stone-50 dark:bg-stone-800/50 hover:bg-volau-green/5 dark:hover:bg-stone-800'
        }`}
      >
        <div className="flex flex-col">
          <span className="text-lg font-bold text-volau-dark dark:text-stone-100">{title}</span>
          {subtitle && <span className="text-sm text-stone-500 dark:text-stone-400 italic">{subtitle}</span>}
        </div>
        {isOpen ? <ChevronUp className="text-volau-green" /> : <ChevronDown className="text-stone-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-volau-green/10 dark:border-stone-800 animate-in slide-in-from-top-2 duration-200 bg-white dark:bg-[#0C3B2E]/10">
          {children}
        </div>
      )}
    </div>
  );
};