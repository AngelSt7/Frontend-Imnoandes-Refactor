"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useQueryParam() {
    const router = useRouter();
    const params = useSearchParams();

    const setParam = useCallback((key: string, value: string) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set(key, value);
        router.push(`?${newParams.toString()}`);
    }, [params, router]);

    const deleteParams = useCallback((keys: string[]) => {
        const newParams = new URLSearchParams(params.toString());
        keys.forEach((key) => { newParams.delete(key); });
        router.push(`?${newParams.toString()}`);
    }, [params, router]);

    const getParam = useCallback((key: string) => {
        return params.get(key) ?? undefined;
    }, [params]);

    
    const clearParam = (key: string) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.delete(key);
        router.push(`?${newParams.toString()}`);
    }

    return {
        setParam,
        getParam,
        deleteParams,
        clearParam
    };
}
