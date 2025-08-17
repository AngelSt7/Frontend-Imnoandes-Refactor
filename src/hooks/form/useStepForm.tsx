import { Path, useForm } from "react-hook-form";
import { Suspense, useState } from "react";
import { PROPERTY_CATEGORY } from "@/src/utils/resolves/bases/enums";

export interface StepConfig<T> {
    component: React.ComponentType<any>;
    fallback: React.ReactNode;
    fields: Array<keyof T>;
}

interface StepsFormProps<T> {
    steps: Array<StepConfig<T>>;
    defaultValues?: T;
}

export const useStepsForm = <T extends Record<string, any>>({
    steps,
    defaultValues,
}: StepsFormProps<T>) => {

    const numSteps = steps.length;
    const methods = useForm<T>({ mode: 'onChange', defaultValues: { 
        property_category: PROPERTY_CATEGORY.COMERCIAL
     } });
    const { handleSubmit, register, trigger, setError, formState, setValue, getValues, watch, clearErrors } = methods;

    const [currentStep, setCurrentStep] = useState(3);

    const validateCurrentStep = async (): Promise<boolean> => {
        const fields = steps[currentStep - 1]?.fields || [];
        if (!fields.length) return true;
        return await trigger(fields as Path<T>[]);
    };

    const goToPrevStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const canGoPrev = () => currentStep > 1;
    const canGoNext = () => currentStep < numSteps;

    const goToNextStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) setCurrentStep(prev => Math.min(prev + 1, numSteps));
    };

    const goToStep = async (step: number) => {
        const isValid = step > currentStep ? await validateCurrentStep() : true;
        if (isValid && step >= 1 && step <= numSteps) {
            setCurrentStep(step);
        }
    };

    const renderStep = () => {
        const step = steps[currentStep - 1];
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
        currentStep, // ahora 1-based
        setCurrentStep,
        goToNextStep,
        goToStep,
        renderStep,
        setError,
        canGoPrev,
        canGoNext,
    };
};
