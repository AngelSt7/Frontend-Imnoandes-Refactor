'use client'
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: string | number;
  label: string;
  prevValue?: number | string;
  isLoading?: boolean;
}


export function AnimatedNumber ({ value, label, prevValue, isLoading }: AnimatedNumberProps) {
  const [__, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevValue && prevValue !== undefined && !isLoading) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue, isLoading]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-[#27272a] rounded-lg p-4 min-w-[70px] min-h-[70px] flex items-center justify-center shadow-lg border border-gray-900">
        {isLoading ? (
          <span className="text-3xl font-bold text-gray-500 font-mono animate-pulse">
            --
          </span>
        ) : (
          <span
            className="text-3xl font-bold text-white font-mono transition-all duration-300 ease-in-out" 
          >
            {value}
          </span>
        )}
      </div>
      <span className="text-sm text-gray-400 mt-2 font-medium">{label}</span>
    </div>
  );
};