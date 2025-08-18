'use client'
import { useStepsForm } from '@/src/hooks/formStep';
import { FormDataProperty } from '@/src/types';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { TabsForms } from '../../ui';
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import { Button } from '@heroui/react';
import { useSubmitMutation } from '@/src/hooks';
import { PropertyAdmin } from '@/src/services/admin';
import { useControlStep } from '@/src/hooks/formStep/hooks/useControlStep';
import { useStepUpdater } from '@/src/hooks/formStep/hooks/useStepUpdater';
import { useStepRules } from '@/src/hooks/formStep/config/useStepRules';

export default function CreateProperty() {

    const { getStepsConfig } = useControlStep();
    const [stepsConfig] = useState(() => getStepsConfig());
    const { methods, handleSubmit, canGoNext, canGoPrev, goToNextStep, goToPrevStep, goToStep, renderStep, currentStep, isStepComplete, updateStep } = useStepsForm<FormDataProperty>({ steps: stepsConfig });
    useStepUpdater({ formMethods: methods, rules: useStepRules(), updateStep });

    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.create
    });

    const onSubmit: SubmitHandler<FormDataProperty> = (data: FormDataProperty) => {
        mutate(data);
    };

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
                    <div className='flex justify-center gap-2'>
                        <button
                            type="button"
                            onClick={goToPrevStep}
                            disabled={!canGoPrev()}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition flex items-center gap-2
                            ${!canGoPrev()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-foreground-100"}`}
                        >
                            <VscTriangleLeft className='text-gray-500 dark:text-foreground-200 font-bold text-2xl' /> Anterior
                        </button>

                        <button
                            type="button"
                            onClick={goToNextStep}
                            disabled={!canGoNext()}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition flex items-center gap-2
                            ${!canGoNext()
                                    ? "opacity-50 cursor-not-allowed"
                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-foreground-100"}`}
                        >
                            Siguiente <VscTriangleRight className='text-gray-500 dark:text-foreground-200 font-bold text-2xl' />
                        </button>
                    </div>

                    <div className='w-full'>
                        <div className='flex justify-end'>
                            <Button type='submit' radius='full' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-[30%]'>
                                Finalizar
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}