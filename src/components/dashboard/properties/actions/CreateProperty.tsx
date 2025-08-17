'use client'
import { useStepsForm } from '@/src/hooks/form';
import { FormDataProperty } from '@/src/types';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { StepConfig } from '@/src/hooks/form/useStepForm';
import { lazy, useEffect } from 'react';
import { SkeletonStepTwo, SkeletonStepOne } from '../skeletons';
import { TabsForms } from '../../ui';
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import { Button } from '@heroui/react';
import { useSubmitMutation } from '@/src/hooks';
import { PropertyAdmin } from '@/src/services/admin';

const StepOne = lazy(() => import("../stepsForm/stepOne/StepOne"));
const StepTwo = lazy(() => import("../stepsForm/stepTwo/StepTwo"));
const StepThree = lazy(() => import("../stepsForm/stepThree/StepThree"));
const StepFour = lazy(() => import("../stepsForm/stepFour/StepFour"));

const steps: StepConfig<FormDataProperty>[] = [
    {
        component: StepOne as React.ComponentType<any>,
        fallback: <SkeletonStepOne />,
        fields: ['name', 'property_type', 'property_category', 'currency', 'price']
    },
    {
        component: StepTwo as React.ComponentType<any>,
        fallback: <SkeletonStepTwo />,
        fields: ['location', 'departmentId', 'provinceId', 'districtId', 'latitude', 'longitude']
    },
    {
        component: StepThree as React.ComponentType<any>
        , fallback: <SkeletonStepOne />,
        fields: ['area', 'yearBuilt', 'bedrooms', 'bathrooms', 'parkingSpaces', 'floor', 'furnished', 'description']
    },
    {
        component: StepFour as React.ComponentType<any>,
        fallback: <SkeletonStepOne />,
        fields: ['servicesId', 'extraInfo']
    },
];

export default function CreateProperty() {

    const { methods, handleSubmit, canGoNext, canGoPrev, goToNextStep, goToPrevStep, renderStep, currentStep, watch, formState, isStepComplete } = useStepsForm<FormDataProperty>({ steps });

    useEffect(() => {
        const subscription = watch((values) => {
            console.log("Valores actuales del form:", values);
        });

        return () => subscription.unsubscribe();
    }, [watch, formState]);


    const { mutate } = useSubmitMutation({
        serviceFunction: PropertyAdmin.create
    })


    const onSubmit: SubmitHandler<FormDataProperty> = (data: FormDataProperty) => {
        mutate(data)
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='mt-3' encType="multipart/form-data">
                <TabsForms
                    numSteps={steps.length}
                    currentStep={currentStep}
                    isStepComplete={isStepComplete}
                />

                {renderStep()}

                <div className="flex mt-8  gap-3 justify-between">
                    <div className=' flex justify-center gap-2'>
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
                        <div className=' flex justify-end'>
                            <Button type='submit' radius='full' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-[30%]'>Finalizar</Button>
                        </div>
                    </div>
                </div>
                <div className=' flex justify-end mt-4'>
                </div>
            </form>
        </FormProvider>
    )
}
