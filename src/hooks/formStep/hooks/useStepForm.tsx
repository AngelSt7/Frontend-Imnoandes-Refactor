import { useState, useCallback } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

export interface StepConfig<T> {
    component: React.ComponentType<any>;
    fallback?: React.ReactNode;
    fields: string[];
}

interface UseStepsFormProps<T> {
    defaultValues?: DefaultValues<T>;
    steps: StepConfig<T>[];
}

export function useStepsForm<T extends Record<string, any>>({ steps: initialSteps, defaultValues }: UseStepsFormProps<T>) {
    const [currentStep, setCurrentStep] = useState(3);
    const [steps, setSteps] = useState<StepConfig<T>[]>(initialSteps);

    const methods = useForm<T>({
        mode: 'onChange',
        criteriaMode: 'all',
        ...(defaultValues && { defaultValues })
    });

    const { watch, formState, handleSubmit, trigger } = methods;

    const updateStep = useCallback((index: number, newConfig: StepConfig<T>) => {
        setSteps(prev => {
            const updated = [...prev];
            updated[index] = newConfig;
            return updated;
        });
    }, []);

    const isStepComplete = useCallback((stepIndex: number): boolean => {
        if (stepIndex >= steps.length) return false;

        const stepFields = steps[stepIndex].fields;
        const formValues = watch();

        return stepFields.every(fieldName => {
            const fieldValue = formValues[fieldName];
            const fieldError = formState.errors[fieldName];

            if (fieldError) return false;

            if (typeof fieldValue === 'boolean') return true;

            return fieldValue !== undefined &&
                fieldValue !== null &&
                fieldValue !== '';
        });
    }, [steps, watch, formState.errors]);

    const canGoNext = useCallback((): boolean => {
        if (currentStep >= steps.length - 1) return false;
        return isStepComplete(currentStep);
    }, [currentStep, steps.length, isStepComplete]);


    const canGoPrev = useCallback((): boolean => {
        return currentStep > 0;
    }, [currentStep]);

    const goToNextStep = useCallback(async () => {
        if (!canGoNext()) return;

        const stepFields = steps[currentStep].fields;
        const isValid = await trigger(stepFields as any);

        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    }, [canGoNext, trigger, steps, currentStep]);

    const goToPrevStep = useCallback(() => {
        if (canGoPrev()) {
            setCurrentStep(prev => Math.max(prev - 1, 0));
        }
    }, [canGoPrev]);

    const renderStep = useCallback(() => {
        const currentStepConfig = steps[currentStep];
        if (!currentStepConfig) return null;

        const Component = currentStepConfig.component;

        return (
            <Component
                register={methods.register}
                errors={formState.errors}
                setValue={methods.setValue}
                watch={watch}
                control={methods.control}
            />
        );
    }, [currentStep, steps, methods, formState.errors, watch]);

    const goToStep = useCallback(async (targetStepIndex: number) => {

        if (targetStepIndex < 0 || targetStepIndex >= steps.length) return;

        if (targetStepIndex < currentStep) {
            setCurrentStep(targetStepIndex);
            return;
        }

        for (let i = currentStep; i < targetStepIndex; i++) {
            const stepFields = steps[i].fields;
            const isValid = await trigger(stepFields as any);

            if (!isValid || !isStepComplete(i)) {
                return;
            }
        }

        setCurrentStep(targetStepIndex);
    }, [currentStep, steps, trigger, isStepComplete]);

    return {
        methods,
        handleSubmit,
        canGoNext,
        canGoPrev,
        goToNextStep,
        goToPrevStep,
        renderStep,
        currentStep,
        watch,
        formState,
        isStepComplete: (stepIndex?: number) => isStepComplete(stepIndex ?? currentStep),
        goToStep,
        totalSteps: steps.length,
        updateStep
    };
}