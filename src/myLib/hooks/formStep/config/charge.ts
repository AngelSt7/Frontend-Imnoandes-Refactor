import { lazy } from "react";

export const StepOne = lazy(() =>
    import("../../../../features/property/admin/subfeatures/CreateProperty/components/StepOne/StepOne")
);
export const StepTwo = lazy(() =>
    import("../../../../features/property/admin/subfeatures/CreateProperty/components/StepTwo/StepTwo")
);
export const StepThree = lazy(() =>
    import("../../../../features/property/admin/subfeatures/CreateProperty/components/StepThree/StepThree")
);
export const StepFour = lazy(() =>
    import("../../../../components/dashboard/properties/stepsForm/stepFour/StepFour")
);