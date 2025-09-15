import { Control, Controller, FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/types/adminTypes/property';
import Fieldset from '../../../ui/Fieldset';
import { Service } from '@/src/services/data/service';
import { useGetAllData } from '@/src/hooks/data/useGetAllData';
import Input from '@/src/myLib/components/input/Input';
import { PROPERTY_CATEGORY } from '@/src/utils/resolves/bases/enums';
import { AutoCompleteWhitTabs } from '@/src/myLib/AutoCompleteWhitTabs';

type StepThreeProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    control: Control<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepFour({ register, errors, control, watch }: StepThreeProps) {

    const { data: Services = [] } = useGetAllData({
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
