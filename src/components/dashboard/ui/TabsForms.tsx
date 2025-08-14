import React from "react";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

export default function TabsForms() {
  const steps = [1, 2, 3, 4];

  const renderStepIcon = (step: number) => {
    const icons = {
      1: <RiNumber1 className="text-xl text-zinc-800" />,
      2: <RiNumber2 className="text-xl text-zinc-800" />,
      3: <RiNumber3 className="text-xl text-zinc-800" />,
      4: <RiNumber4 className="text-xl text-zinc-800" />,
    };
    return icons[step as keyof typeof icons];
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <button
              type="button"
              className="transition-all duration-200 rounded-full h-12 w-12 flex items-center justify-center bg-gray-200 text-white hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              {renderStepIcon(step)}
            </button>
            {index < steps.length - 1 && <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-800" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
