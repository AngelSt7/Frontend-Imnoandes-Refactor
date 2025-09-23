import { FieldValues, UseFormReturn } from "react-hook-form";

export interface StepRule<T extends FieldValues> {
  stepIndex: number;
  watchFields: (keyof T)[];
  getConfig: (values: Record<string, any>, formMethods: UseFormReturn<T>) => any;
  condition?: (values: Record<string, any>) => boolean;
  onComplete?: (values: Record<string, any>) => void;
}

export function useCreateStepRules<T extends FieldValues>(
  rule: StepRule<T>,
  __onComplete?: (values: Record<string, any>) => void
): StepRule<T> {
  return rule;
}