'use client'
import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type UseCreateMutationProps<T> = {
  serviceFunction: (data: T) => Promise<any>,
  onErrorCallback?: () => any,
  onSuccessCallback?: (data: any) => any,
  onSuccessData?: (data: any) => void,
  invalidateQueries?: QueryKey[],
  message?: string,
  replace?: string,
  cancelToast?: boolean
}

export function useSubmitMutation<T>({
  serviceFunction,
  invalidateQueries,
  onSuccessCallback,
  onErrorCallback,
  message,
  replace,
  cancelToast = false
}: UseCreateMutationProps<T>) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: serviceFunction,
    onError: (error: any) => {
      toast.error(error.message || 'Error inesperado');
      onErrorCallback?.();
    },
    onSuccess: (data) => {
      invalidateQueries?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });

      replace && router.replace(replace);
      cancelToast === false && toast.success(data.message ?? message);
      onSuccessCallback?.(data);
    }
  });

  return mutation;
}
