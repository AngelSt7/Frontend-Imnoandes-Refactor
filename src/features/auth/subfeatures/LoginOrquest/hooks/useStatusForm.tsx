"use client"

import { useState } from "react";
import { StatusForm } from "../interfaces";

export const useStatusForm = () => {
    const [statusForm, setStatusForm] = useState<StatusForm>({
        init: true,
        requiredPassword: false,
        requiredOtp: false,
        meta: { email: '' }
    });

    return { statusForm, setStatusForm };
};