"use client"

import { StatusForm } from "@/src/components/auth/login/steps/ChekEmailForm";
import { useState } from "react";

export const useStatusForm = () => {
    const [statusForm, setStatusForm] = useState<StatusForm>({
        init: true,
        requiredPassword: false,
        requiredOtp: false,
        meta: { email: '' }
    });

    return { statusForm, setStatusForm };
};