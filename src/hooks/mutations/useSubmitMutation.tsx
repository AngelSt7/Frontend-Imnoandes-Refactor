'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, redirect } from 'next/navigation';
import toast from 'react-hot-toast';

type QueryKey = readonly unknown[]

type useCreateMutationProps<T> = {
  serviceFunction: (data: T) => Promise<any>,
  onErrorCallback?: () => any,
  onSuccessCallback?: (data: any) => any,
  onSuccessData?: (data: any) => void,
  invalidateQuery?: QueryKey | QueryKey[],
  message?: string
  replace?: string
  cancelToast?: boolean
}

export default function useSubmitMutation<T>({
  serviceFunction,
  invalidateQuery,
  onSuccessCallback,
  onErrorCallback,
  message,
  replace,
  cancelToast = false
}: useCreateMutationProps<T>) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: serviceFunction,
    onError: (error: any) => {
      toast.error(error.message || 'Error inesperado');
      onErrorCallback?.();
    },
    onSuccess: (data) => {
      if (invalidateQuery) {
        const queriesToInvalidate = Array.isArray(invalidateQuery[0]) ? invalidateQuery : [invalidateQuery];
        queriesToInvalidate.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key as QueryKey });
        });
      }
      replace && router.replace(replace);
      cancelToast === false && toast.success(data.message ?? message);
      onSuccessCallback?.(data);
    }

  });

  return {
    ...mutation
  };
}
