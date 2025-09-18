import { useSearchParams, useRouter } from "next/navigation"
import { useForm, FieldValues, DefaultValues } from "react-hook-form"

interface UseFormFilterProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>
  deleteParams: (keys: string[]) => void
  clearKeys?: string[] 
}

export const useFormFilter = <T extends FieldValues>({
  defaultValues,
  deleteParams,
  clearKeys = [],
}: UseFormFilterProps<T>) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<T>({
    defaultValues
  })

  const onSubmit = (data: T) => {

    const paramUrl = new URLSearchParams(searchParams.toString())
    Object.entries(data)
      .filter(([__, v]) => v !== null )
      .forEach(([key, value]) => {
        paramUrl.set(key, String(value))
      })

    router.push(`?${paramUrl.toString()}`)
  }

  const handleClearParams = () => {
    deleteParams(clearKeys as string[])
    reset()
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleClearParams,
  }
}
