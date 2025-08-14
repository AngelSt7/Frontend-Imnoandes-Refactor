import { Path, useForm } from "react-hook-form";
import { Suspense, useEffect, useState } from "react";

export interface StepConfig<T> {
    component: React.ComponentType<any>;
    fallback: React.ReactNode;
    fields: Array<keyof T>;
}

interface StepsFormProps<T> {
    steps: Array<StepConfig<T>>;
    defaultValues?: T;
}

export const useStepsForm = <T extends Record<string, any>>({ steps, defaultValues }: StepsFormProps<T>) => {

    const numSteps = steps.length;
    const methods = useForm<T>({ mode: 'onChange' });
    const { handleSubmit, register, trigger, setError, formState, setValue, getValues, watch, clearErrors } = methods;
    const [currentStep, setCurrentStep] = useState(0);

    const validateCurrentStep = async (): Promise<boolean> => {
        const fields = steps[currentStep]?.fields || [];
        if (!fields.length) return true;
        return await trigger(fields as Path<T>[]);
    };

    const goToPrevStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const canGoPrev = () => currentStep > 0;
    const canGoNext = () => currentStep < numSteps - 1;

    const goToNextStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) setCurrentStep(prev => Math.min(prev + 1, numSteps - 1));
    };

    const goToStep = async (step: number) => {
        const isValid = step > currentStep ? await validateCurrentStep() : true;
        if (isValid) setCurrentStep(step);
    };

    const renderStep = () => {
        const step = steps[currentStep];
        if (!step) return null;
        const StepComponent = step.component;
        return (
            <Suspense fallback={step.fallback}>
                <StepComponent
                    register={register}
                    errors={formState.errors}
                    setValue={setValue}
                    watch={watch}
                />
            </Suspense>
        );
    };


    return {
        numSteps,
        goToPrevStep,
        methods,
        watch,
        handleSubmit,
        register,
        formState,
        setValue,
        getValues,
        clearErrors,
        currentStep,
        setCurrentStep,
        goToNextStep,
        goToStep,
        renderStep,
        setError,
        canGoPrev,
        canGoNext
    };
};
