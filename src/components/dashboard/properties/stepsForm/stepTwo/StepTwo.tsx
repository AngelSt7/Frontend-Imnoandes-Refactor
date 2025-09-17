import Input from '@/src/myLib/components/Input/Input'
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { FormDataProperty } from '@/src/types/adminTypes/property'
import Fieldset from '../../../ui/Fieldset'
import { PiMapPinSimpleAreaFill } from 'react-icons/pi'
import { DEPARTMENT_SELECT } from '@/src/utils/resolves/bases/select'
import SelectItem from '../../../../ui/select/Select'
import { useGetData } from '@/src/hooks/data/useGetData'
import { Province } from '@/src/services'
import Autocomplete from '@/app/success/Autocomplete'
import { District } from '@/src/services/data/district'
import Map from '@/src/components/ui/map/Map'

type StepTwoProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepTwo({ register, errors, setValue, watch }: StepTwoProps) {
    const departmentId = watch('departmentId');
    const provinceId = watch('provinceId');

    const { data: Provinces = [] } = useGetData({
        functionService: Province.list,
        id: departmentId,
        queryKey: ['provinces', departmentId]
    });

    const { data: Districts = [] } = useGetData({
        functionService: District.list,
        id: provinceId,
        queryKey: ['District', provinceId]
    });

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

                    <SelectItem
                        data={DEPARTMENT_SELECT}
                        register={register('departmentId', { required: 'Debes seleccionar un departamento' })}
                        errorMessage={errors.departmentId}
                        name="departmentId"
                        watch={watch}
                        setValue={setValue}
                        label='Departamento'
                    />

                </div>

                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4 '>
                    <Autocomplete
                        data={Provinces}
                        setValue={setValue}
                        register={register('provinceId', { required: 'Debes seleccionar una provincia' })}
                        errorMessage={errors.provinceId}
                        name="provinceId"
                        watch={watch}
                        label="Provincia"
                    />

                    <Autocomplete
                        data={Districts}
                        setValue={setValue}
                        register={register('districtId', { required: 'Debes seleccionar un distrito' })}
                        errorMessage={errors.districtId}
                        name="districtId"
                        watch={watch}
                        label="Distrito"
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
