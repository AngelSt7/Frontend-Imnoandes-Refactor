'use client'

import { FormDataProperty } from '@/src/types';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { TabsForms } from '../../ui';
import { useSubmitMutation } from '@/src/hooks';
import { PropertyAdmin } from '@/src/services/admin';
import { useControlStep } from '@/src/hooks/formStep/hooks/useControlStep';
import { useStepUpdater } from '@/src/hooks/formStep/hooks/useStepUpdater';
import { useStepRules } from '@/src/hooks/formStep/config/useStepRules';
import { useStepsForm } from '@/src/hooks/formStep/hooks/useStepForm';
import ButtonsControl from '../ui/ButtonsControl';
import ButtonSubmit from '../ui/ButtonSubmit';


interface EditPropertyProps {
    defaultValues: FormDataProperty
}

export default function EditProperty({ defaultValues }: EditPropertyProps) {
    const { getStepsConfig } = useControlStep();
    const [stepsConfig] = useState(() => getStepsConfig());
    const { methods, handleSubmit, canGoNext, canGoPrev, goToNextStep, goToPrevStep, goToStep, renderStep, currentStep, isStepComplete, updateStep } = useStepsForm<FormDataProperty>({ steps: stepsConfig, defaultValues });
    useStepUpdater({ formMethods: methods, rules: useStepRules(), updateStep });

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.edit
    });

    const onSubmit: SubmitHandler<FormDataProperty> = (data: FormDataProperty) => {
        mutate(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='mt-3'>
                <TabsForms
                    numSteps={stepsConfig.length}
                    currentStep={currentStep}
                    isStepComplete={isStepComplete}
                    goToStep={goToStep}
                />

                {renderStep()}

                <div className="flex mt-8 gap-3 justify-between">
                    <ButtonsControl canGoNext={canGoNext} canGoPrev={canGoPrev} goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />
                    <ButtonSubmit />
                </div>
            </form>
        </FormProvider>
    );
}