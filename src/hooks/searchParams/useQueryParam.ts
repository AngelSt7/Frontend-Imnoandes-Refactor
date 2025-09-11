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

    const deleteParam = useCallback((key: string) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.delete(key);
        router.push(`?${newParams.toString()}`);
    }, [params, router]);

    const getParam = useCallback((key: string) => {
        return params.get(key) ?? undefined;
    }, [params]);

    return {
        setParam,
        getParam,
        deleteParam
    };
}
