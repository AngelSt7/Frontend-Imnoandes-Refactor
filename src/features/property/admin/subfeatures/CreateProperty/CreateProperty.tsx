'use client'

import { useState } from 'react';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { FormDataProperty } from '@/src/features/property/admin/interfaces'
import { PropertyAdmin } from '@/src/features/property/admin/services';
import { useControlStep, useStepUpdater, useStepRules, useStepsForm, useSubmitMutation } from '@/src/myLib/hooks';
import { ButtonsControl, ButtonSubmit, TabsForms } from '@/src/myLib/components/Form';
import { useUser } from '@/src/contexts/UserContext';

export function CreateProperty() {

    const user = useUser()
    const { getStepsConfig } = useControlStep<FormDataProperty>();
    const [stepsConfig] = useState(() => getStepsConfig());
    const { methods, handleSubmit, canGoNext, canGoPrev, goToNextStep, goToPrevStep, goToStep, renderStep, currentStep, isStepComplete, updateStep } = useStepsForm<FormDataProperty>({ steps: stepsConfig });
    useStepUpdater({ formMethods: methods, rules: useStepRules(), updateStep });

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.create,
        invalidateQueries: [
            ["properties", user.id]
        ]
    });

    const onSubmit: SubmitHandler<FormDataProperty> = (data: FormDataProperty) =>  mutate(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='mt-3' encType="multipart/form-data">
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