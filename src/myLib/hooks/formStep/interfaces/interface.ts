import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";

export interface StepConfig<T> {
    component: React.ComponentType<any>;
    fallback?: React.ReactNode;
    fields: string[];
}

export interface UseStepsFormProps<T> {
    defaultValues?: DefaultValues<T>;
    steps: StepConfig<T>[];
    validationMode?: "block" | "message";
    debug?: boolean;
}

export interface StepRule<T extends FieldValues> {
  stepIndex: number;
  watchFields: (keyof T)[];
  getConfig: (values: Record<string, any>, formMethods: UseFormReturn<T>) => any;
  condition?: (values: Record<string, any>) => boolean;
  onComplete?: (values: Record<string, any>) => void;
}

export interface UseStepUpdaterProps<T extends FieldValues> {
  formMethods: UseFormReturn<T>;
  rules: StepRule<T>[];
  updateStep: (index: number, stepConfig: any) => void;
}