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

    const keepParams = useCallback((keys: string[]) => {
        const newParams = new URLSearchParams();
        params.forEach(([k, v]) => {
            if (keys.includes(k)) {
                newParams.set(k, v)
            }
        })
        router.push(`?${newParams.toString()}`);
    }, [params, router]);

    const getParam = useCallback((key: string) => {
        return params.get(key) ?? undefined;
    }, [params]);


    const clearParams = useCallback((keys: string[]) => {
        const newParams = new URLSearchParams(params.toString());
        keys.forEach((key) => newParams.delete(key));
        router.push(`?${newParams.toString()}`);
    }, [params, router]);

    return {
        setParam,
        getParam,
        keepParams,
        clearParams
    };
}
