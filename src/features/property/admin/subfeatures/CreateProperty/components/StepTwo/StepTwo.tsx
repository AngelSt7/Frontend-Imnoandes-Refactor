import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { DEPARTMENT_SELECT } from '@/src/features/property/admin/constants'
import { Fieldset } from '@/src/components/ui'
import { FormDataProperty } from '@/src/features/property/admin/interfaces'
import { Input, Map, Select, Autocomplete } from '@/src/myLib/components'
import { PiMapPinSimpleAreaFill } from 'react-icons/pi'
import { useUbigeoData } from './hooks'

type StepTwoProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
    control: Control<FormDataProperty>
};

export function StepTwo({ register, errors, setValue, watch, control }: StepTwoProps) {
    const departmentId = watch('departmentId');
    const provinceId = watch('provinceId');

    const { Provinces, Districts } = useUbigeoData(departmentId, provinceId);

    return (
        <>
            <Fieldset>Características principales</Fieldset>
            <div className=' flex flex-col gap-4'>

                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Input
                        type='text'
                        field='address'
                        htmlFor='address'
                        label='Ubicación'
                        placeholder='Dirección de la propiedad'
                        register={register}
                        rules={{ required: "La ubicación es obligatoria" }}
                        Icon={PiMapPinSimpleAreaFill}
                        errorMessage={errors.address}
                    />

                    <Select
                        data={DEPARTMENT_SELECT}
                        controller={Controller}
                        control={control}
                        rules={({ required: 'Debes seleccionar un departamento' })}
                        name="departmentId"
                        placeholder='Elige un departamento'
                        label='Departamento'
                    />

                </div>

                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4 '>
                    <Autocomplete
                        control={control}
                        controller={Controller}
                        data={Provinces}
                        label="Provincia"
                        name="provinceId"
                        placeholder='Elige una provincia'
                        rules={{ required: 'Debes seleccionar una provincia' }}
                    />

                    <Autocomplete
                        control={control}
                        controller={Controller}
                        data={Districts}
                        label="Distrito"
                        name="districtId"
                        placeholder='Elige un distrito'
                        rules={{ required: 'Debes seleccionar un distrito' }}
                    />
                </div>

                <Map
                    valueLatitude={'latitude'}
                    valueLongitude={'longitude'}
                    setValue={setValue}
                    watch={watch}
                    errorMessage={errors.address}
                />

            </div >
        </>
    )
}
