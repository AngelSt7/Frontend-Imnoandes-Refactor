import React from "react";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";

interface TabsFormsProps {
  numSteps: number;
  currentStep: number;
  isStepComplete: (stepIndex: number) => boolean;
  goToStep: (stepIndex: number) => void;
}

export function TabsForms({ numSteps, currentStep, isStepComplete, goToStep }: TabsFormsProps) {
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

  const canNavigateToStep = (targetStepIndex: number): boolean => {
    if (targetStepIndex <= currentStep) return true;
    for (let i = 0; i < targetStepIndex; i++) {
      if (!isStepComplete(i)) return false;
    }
    return true;
  };

  const handleStepClick = (stepNumber: number) => {
    const stepIndex = stepNumber - 1;
    
    if (canNavigateToStep(stepIndex)) {
      goToStep(stepIndex);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = step - 1;
          const completed = isStepComplete(stepIndex);
          const isActive = currentStep === stepIndex;
          const canNavigate = canNavigateToStep(stepIndex);
          
          return (
            <React.Fragment key={step}>
              <button
                type="button"
                onClick={() => handleStepClick(step)}
                disabled={!canNavigate}
                className={`transition-all duration-200 rounded-full h-12 w-12 flex items-center justify-center font-medium
                  ${completed 
                    ? "bg-green-500 text-white shadow-lg hover:bg-green-600" 
                    : isActive 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : canNavigate
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                  }
                  ${canNavigate && !isActive ? "hover:scale-105" : ""}
                  ${!canNavigate ? "opacity-50" : ""}
                `}
                title={
                  completed 
                    ? `Paso ${step} - Completado (Click para navegar)` 
                    : isActive 
                    ? `Paso ${step} - Actual` 
                    : canNavigate
                    ? `Paso ${step} - Click para navegar`
                    : `Paso ${step} - Completa los pasos anteriores primero`
                }
              >
                {renderStepIcon(step)}
              </button>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-colors duration-200 
                  ${completed ? "bg-green-500" : "bg-gray-200 dark:bg-gray-800"}`} 
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}