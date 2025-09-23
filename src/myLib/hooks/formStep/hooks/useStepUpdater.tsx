import { useEffect, useRef } from "react";
import { FieldValues } from "react-hook-form";
import { UseStepUpdaterProps } from "../interfaces";

export function useStepUpdater<T extends FieldValues>({
  formMethods,
  rules,
  updateStep
}: UseStepUpdaterProps<T>) {
  const { watch } = formMethods;
  const previousValuesRef = useRef<Record<string, any>>({});

  useEffect(() => {
    const allWatchFields = Array.from(
      new Set(rules.flatMap(rule => rule.watchFields as string[]))
    );
    
    const subscription = watch((values, { name }) => {
      if (!name || !allWatchFields.includes(name)) return;
      
      rules.forEach(({ stepIndex, watchFields, getConfig, condition, onComplete }) => {
        const currentValues = watchFields.reduce((acc, field) => {
          acc[field as string] = values[field as string];
          return acc;
        }, {} as Record<string, any>);
        
        const ruleKey = `${stepIndex}-${watchFields.join('-')}`;
        const currentValuesString = JSON.stringify(currentValues);
        const previousValuesString = previousValuesRef.current[ruleKey];
        
        if (currentValuesString !== previousValuesString) {
          const shouldUpdate = condition ? condition(currentValues) : true;
          
          if (shouldUpdate) {
            const newStepConfig = getConfig(currentValues, formMethods);
            updateStep(stepIndex, newStepConfig);
            onComplete?.(currentValues);
          }
          
          previousValuesRef.current[ruleKey] = currentValuesString;
        }
      });
    });
    return () => subscription.unsubscribe();
  }, [formMethods, rules, updateStep, watch]);
}