'use client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

type LoginMutation<T> = {
  onSuccessCallback: UseFormReset<any>
}

export function useLoginMutation({ onSuccessCallback }: LoginMutation<any>) {
  const router = useRouter()
  const mutation = useMutation({
    // mutationFn: () => router.push('/dashboard'),
    onSuccess: () => {
      onSuccessCallback()
      toast.success('Bienvenido')
    },
  })
  return mutation
}
