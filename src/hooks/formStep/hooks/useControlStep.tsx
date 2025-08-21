import { SkeletonStepOne, SkeletonStepTwo } from "@/src/components";
import { FormDataProperty } from "@/src/types";
import { lazy, useCallback } from "react";
import { useStepFields } from "../config/useStepFields";

export interface StepConfig<T> {
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
  fields: string[];
}

// Carga diferida
const StepOne = lazy(() =>
  import("../../../components/dashboard/properties/stepsForm/stepOne/StepOne")
);
const StepTwo = lazy(() =>
  import("../../../components/dashboard/properties/stepsForm/stepTwo/StepTwo")
);
const StepThree = lazy(() =>
  import("../../../components/dashboard/properties/stepsForm/stepThree/StepThree")
);
const StepFour = lazy(() =>
  import("../../../components/dashboard/properties/stepsForm/stepFour/StepFour")
);

export const useControlStep = () => {
  const {
    getStepOneFields,
    getStepTwoFields,
    getStepThreeFields,
    getStepFourFields,
  } = useStepFields();

  const getStepOneConfig = useCallback(
    (): StepConfig<FormDataProperty> => ({
      component: StepOne as React.ComponentType<any>,
      fallback: <SkeletonStepOne />,
      fields: getStepOneFields(),
    }),
    [getStepOneFields]
  );

  const getStepTwoConfig = useCallback(
    (): StepConfig<FormDataProperty> => ({
      component: StepTwo as React.ComponentType<any>,
      fallback: <SkeletonStepTwo />,
      fields: getStepTwoFields(),
    }),
    [getStepTwoFields]
  );

  const getStepThreeConfig = useCallback(
    (propertyCategory?: string, hasParking?: boolean): StepConfig<FormDataProperty> => ({
      component: StepThree as React.ComponentType<any>,
      fallback: <SkeletonStepOne />,
      fields: getStepThreeFields(propertyCategory, hasParking),
    }),
    [getStepThreeFields]
  );

  const getStepFourConfig = useCallback(
    (propertyCategory?: string): StepConfig<FormDataProperty> => ({
      component: StepFour as React.ComponentType<any>,
      fallback: <SkeletonStepOne />,
      fields: getStepFourFields(propertyCategory),
    }),
    [getStepFourFields]
  );

  const getStepsConfig = useCallback(
    (propertyCategory?: string, hasParking?: boolean): StepConfig<FormDataProperty>[] => [
      getStepOneConfig(),
      getStepTwoConfig(),
      getStepThreeConfig(propertyCategory, hasParking),
      getStepFourConfig(propertyCategory),
    ],
    [getStepOneConfig, getStepTwoConfig, getStepThreeConfig, getStepFourConfig]
  );

  return {
    getStepsConfig,
    getStepOneConfig,
    getStepTwoConfig,
    getStepThreeConfig,
    getStepFourConfig,
  };
};
