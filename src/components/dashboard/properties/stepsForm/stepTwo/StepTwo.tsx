import Input from '@/src/components/ui/inputs/Input'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FormDataProperty } from '@/src/types/adminTypes/property'
import Fieldset from '../../../ui/Fieldset'
import { PiMapPinSimpleAreaFill } from 'react-icons/pi'
import { DEPARTMENT_SELECT } from '@/src/utils/resolves/bases/select'
import SelectItem from '../../../../ui/select/Select'

type StepTwoProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepTwo({ register, errors, setValue, watch }: StepTwoProps) {
    return (
        <>
            <Fieldset>Características principales</Fieldset>
            <div className=' flex flex-col gap-4'>

                <Input
                    type='text'
                    htmlFor='name'
                    label='nombre'
                    placeholder='Dirección de la propiedad'
                    register={register('location', { required: "La ubicación es obligatoria" })}
                    Icon={PiMapPinSimpleAreaFill}
                    errorMessage={errors.location}
                />
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <SelectItem
                        data={DEPARTMENT_SELECT}
                        register={register('departmentId', { required: 'Debes seleccionar un tipo de propiedad' })}
                        errorMessage={errors.property_type}
                        name="departmentId"
                        watch={watch}
                        setValue={setValue}
                        label='Tipo de propiedad'
                    />
                </div>



            {/* <CheckBoxExtras
                    label="Características"
                    data={Extras}   
                    setValue={setValue}
                    watch={watch}                 
                />
                <CheckBoxServices
                    setValue={setValue}
                    label="Servicios"
                    data={Services}
                    watch={watch}   
                /> */}
        </div >
        </>
    )
}
