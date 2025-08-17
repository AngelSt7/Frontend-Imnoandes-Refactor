import React from "react";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

interface TabsFormsProps {
  numSteps: number;
  currentStep: number;
  isStepComplete: (stepIndex: number) => boolean;
};

export default function TabsForms({ numSteps, currentStep, isStepComplete }: TabsFormsProps) {
  const steps = Array.from({ length: numSteps }, (_, i) => i + 1);

  const renderStepIcon = (step: number) => {
    const icons = {
      1: <RiNumber1 />,
      2: <RiNumber2 />,
      3: <RiNumber3 />,
      4: <RiNumber4 />,
    };
    return icons[step as keyof typeof icons] ?? step; 
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const completed = isStepComplete(step - 1);
          const isActive = currentStep === step;

          return (
            <React.Fragment key={step}>
              <button
                type="button"
                className={`transition-all duration-200 rounded-full h-12 w-12 flex items-center justify-center 
                  ${completed ? "bg-green-500 text-white" 
                    : isActive ? "bg-blue-500 text-white" 
                    : "bg-gray-200 text-gray-700"}`}
              >
                {renderStepIcon(step)}
              </button>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-800" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
