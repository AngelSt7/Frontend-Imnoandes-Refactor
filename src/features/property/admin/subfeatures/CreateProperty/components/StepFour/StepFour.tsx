import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/features/property/admin/interfaces';
import { Service } from '@/src/features/property/admin/services';
import { PROPERTY_CATEGORY } from '@/src/features/property/admin/constants';
import { Fieldset } from '@/src/components/ui';
import { Input, AutoCompleteWhitTabs } from '@/src/myLib/components';
import { useGetData } from '@/src/myLib/hooks';

type StepThreeProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    control: Control<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export function StepFour({ register, errors, control, watch }: StepThreeProps) {

    const { data: Services = [] } = useGetData({
        functionService: Service.list,
        queryKey: ['services']
    });

    return (
        <>
            {watch('propertyCategory') !== PROPERTY_CATEGORY.TERRENO ? (
                <>
                    <Fieldset>Servicios de la propiedad</Fieldset>

                    <div className=' flex flex-col gap-4 mt-2'>
                        <AutoCompleteWhitTabs
                            controller={Controller}
                            data={Services}
                            control={control}
                            rules={{ required: 'Debes seleccionar al menos un servicio' }}
                            label='Servicios'
                            name='servicesId'
                            placeholder='Elige los servicios de la propiedad'
                        /> 

                        <Input
                            type='textarea'
                            field='extraInfo'
                            label='Información adicional'
                            htmlFor='extraInfo'
                            placeholder='¿Tiene alguna información adicional que desees agregar? Ej: condiciones de la propiedad, etc.'
                            register={register}
                            rules={{
                                minLength: { value: 8, message: 'La información adicional debe tener al menos 8 caracteres' },
                                maxLength: { value: 300, message: 'La información adicional debe tener menos de 300 caracteres' }
                            }}
                            errorMessage={errors.extraInfo}
                        />
                    </div>
                </>
            ) : (
                <p>No se requieren servicios adicionales, para propiedades de terreno, puede finalizar el proceso</p>
            )}

        </>
    )
}
