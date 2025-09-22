'use client'

import { FormDataProperty, User } from '@/src/types';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import equal from "fast-deep-equal";
import { TabsForms } from '../../ui';
import { useSubmitMutation } from '@/src/hooks';
import { PropertyAdmin } from '@/src/services/admin';
import { useControlStep } from '@/src/hooks/formStep/hooks/useControlStep';
import { useStepUpdater } from '@/src/hooks/formStep/hooks/useStepUpdater';
import { useStepRules } from '@/src/hooks/formStep/config/useStepRules';
import { useStepsForm } from '@/src/hooks/formStep/hooks/useStepForm';
import ButtonsControl from '../ui/ButtonsControl';
import ButtonSubmit from '../ui/ButtonSubmit';
import toast from 'react-hot-toast';
import { useModalUtils } from '@/src/myLib/hooks/modal/useModalUtils/useModalUtils';

interface EditPropertyProps {
    user?: User
    defaultValues: FormDataProperty
}

export default function EditProperty({ defaultValues, user }: EditPropertyProps) {
    const { closeModal } = useModalUtils();
    const { getStepsOnEdit } = useControlStep();
    
    const stepsConfig = getStepsOnEdit(defaultValues.propertyCategory, Boolean(defaultValues.hasParking));
    const { methods, handleSubmit, canGoNext, canGoPrev, goToNextStep, goToPrevStep, goToStep, renderStep, currentStep, isStepComplete, updateStep, reset } = useStepsForm<FormDataProperty>({ steps: stepsConfig, defaultValues, validationMode: 'message' });
    useStepUpdater({ formMethods: methods, rules: useStepRules(), updateStep });

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.edit,
        invalidateQueries: [
            ["property", "edit" ,defaultValues.id],
            ["peroperty", "details", defaultValues.id],
            ["properties", user?.id]
        ],
        onSuccessCallback: () => {
            reset();
            closeModal();
        }
    });

    const onSubmit: SubmitHandler<FormDataProperty> = (data: FormDataProperty) => {
        const normalized = { ...data, phone: String(data.phone) };
        if (equal(normalized, defaultValues)) return toast.error("No se han detectado cambios en la propiedad");
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