'use client'
import { useRouter } from 'next/navigation';
import { useStepsForm } from '@/src/hooks/form';
import { FormDataProperty } from '@/src/types';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { StepConfig } from '@/src/hooks/form/useStepForm';
import { lazy, useState } from 'react';
import { SkeletonStepTwo, SkeletonStepOne } from '../skeletons';
import { TabsForms } from '../../ui';
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import { Tooltip, Button } from '@heroui/react';


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
        fields: ['location', 'property_type']
    },
    {
        component: StepThree as React.ComponentType<any>
        , fallback: <SkeletonStepOne />,
        fields: ['description', 'bedrooms', 'bathrooms', 'area', 'floor', 'furnished', 'parkingSpaces']
    },
    {
        component: StepFour as React.ComponentType<any>,
        fallback: <SkeletonStepOne />,
        fields: ['servicesId']
    },
];

export default function CreateProperty() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    const { methods, handleSubmit, getValues, currentStep, canGoNext, canGoPrev, setCurrentStep, goToNextStep, goToPrevStep, renderStep } = useStepsForm<FormDataProperty>({ steps });


    const onSubmit: SubmitHandler<FormDataProperty> = async (data) => {
        router.replace('/dashboard/properties')
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
                <TabsForms
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

                            <Tooltip content="Todos los campos estan completos" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                                <Button type='button' radius='full' className='bg-zinc-800 text-white font-semibold py-2 transition-all hover:bg-zinc-700 focus:ring-2 focus:ring-zinc-400 w-[30%]'>Finalizar</Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className=' flex justify-end mt-4'>
                </div>
            </form>
        </FormProvider>
    )
}
