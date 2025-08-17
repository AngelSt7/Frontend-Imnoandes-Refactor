import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/types/adminTypes/property';
import Fieldset from '../../../ui/Fieldset';
import { Service } from '@/src/services/data/service';
import { useGetAllData } from '@/src/hooks/data/useGetAllData';
import AutoCompleteWhitTabs from '@/app/success/AutoCompleteWhitTabs';
import Input from '@/src/components/ui/inputs/Input';

type StepThreeProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepFour({ register, errors, setValue, watch }: StepThreeProps) {

    const { data: Services = [] } = useGetAllData({
        functionService: Service.list,
        queryKey: ['services']
    });
    return (
        <>
            <Fieldset>Servicios de la propiedad</Fieldset>

            <div className=' flex flex-col gap-4 mt-2'>
                <AutoCompleteWhitTabs
                    data={Services}
                    label='Servicios'
                    name='servicesId'
                    register={register('servicesId', { required: 'Debes seleccionar almenos un servicio' })}
                    setValue={setValue}
                    watch={watch}
                    errorMessage={errors.servicesId as FieldError}
                />

                <Input
                    type='textarea'
                    field='extraInfo'
                    label='Información adicional'
                    htmlFor='extraInfo'
                    placeholder='¿Tiene alguna información adicional que desees agregar? Ej: condiciones de la propiedad, etc.'
                    register={register}
                    rules={{minLength: {value: 8, message: 'La información adicional debe tener al menos 8 caracteres'},
                    maxLength: {value: 300, message: 'La información adicional debe tener menos de 300 caracteres'}}}
                    errorMessage={errors.extraInfo}
                />
            </div>
        </>
    )
}
