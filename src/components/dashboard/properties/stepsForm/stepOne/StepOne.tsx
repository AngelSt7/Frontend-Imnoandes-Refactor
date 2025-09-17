import Input from '@/src/myLib/components/Input/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/types/adminTypes/property';
import { PiMapPinSimpleAreaFill } from "react-icons/pi";
import Fieldset from '../../../ui/Fieldset';
import SelectItem from '@/src/components/ui/select/Select';
import { CURRENCY_SELECT, PROPERTY_CATEGORY_SELECT, PROPERTY_TYPE_SELECT } from '@/src/utils/resolves/bases/select';
import { CURRENCY } from '@/src/utils/resolves/bases/enums';

type StepOneProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepOne({ register, errors, setValue, watch }: StepOneProps) {
    const currency = watch('currency')
    const phone = watch('phone')

    return (
        <>
            <Fieldset>Información básica</Fieldset>
            <div className=' flex flex-col gap-4'>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Input
                        field='name'
                        type='text'
                        htmlFor='name'
                        label='nombre'
                        placeholder='Elige como llamaremos a tu propiedad'
                        register={register}
                        rules={{ required: "El nombre es obligatorio" }}
                        Icon={PiMapPinSimpleAreaFill}
                        errorMessage={errors.name}
                    />
                    <Input
                        field='phone'
                        type='text'
                        htmlFor='phone'
                        label='telefono'
                        placeholder='Elige un telefono de contacto'
                        register={register}
                        rules={{
                            required: "El telefono es obligatorio", 
                            max: { value: 999999999, message: 'Ingrese un número de telefono valido' },
                            min: { value: 99999999, message: 'Ingrese un número de telefono valido' },
                            pattern: {
                                value: /^9[0-9]{8}$/
                                , message: 'El número de telefono debe ser de 9 digitos'
                            }
                        }}
                        Icon={PiMapPinSimpleAreaFill}
                        inputMode='numeric'
                        maxLength={9}
                        errorMessage={errors.phone}
                    />
                </div>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <SelectItem
                        data={PROPERTY_TYPE_SELECT}
                        register={register('propertyType', { required: 'Debes seleccionar un tipo de propiedad' })}
                        errorMessage={errors.propertyType}
                        name="propertyType"
                        watch={watch}
                        setValue={setValue}
                        label='Tipo de propiedad'
                    />
                    <SelectItem
                        data={PROPERTY_CATEGORY_SELECT}
                        register={register('propertyCategory', { required: 'Debes seleccionar un tipo de categoria' })}
                        errorMessage={errors.propertyCategory}
                        name="propertyCategory"
                        watch={watch}
                        setValue={setValue}
                        label='Categoría de propiedad'
                    />
                </div>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <SelectItem
                        data={CURRENCY_SELECT}
                        register={register('currency', { required: 'Debes seleccionar un tipo de moneda' })}
                        errorMessage={errors.currency}
                        name="currency"
                        watch={watch}
                        setValue={setValue}
                        label='Tipo de moneda'
                    />

                    <Input
                        type="text"
                        field="price"
                        htmlFor="price"
                        label="Precio"
                        placeholder="Ingrese el precio"
                        register={register}
                        rules={{
                            required: "El precio es obligatorio",
                            min: {
                                value: currency === CURRENCY.PEN ? 1000 : 250,
                                message:
                                    currency === CURRENCY.PEN
                                        ? "El precio debe ser al menos 1,000 PEN"
                                        : "El precio debe ser al menos 250 USD",
                            },
                            max: {
                                value: currency === CURRENCY.PEN ? 15000000 : 4000000,
                                message:
                                    currency === CURRENCY.PEN
                                        ? "El precio no puede ser mayor a 15,000,000 PEN"
                                        : "El precio no puede ser mayor a 4,000,000 USD",
                            },
                        }}
                        Icon={PiMapPinSimpleAreaFill}
                        errorMessage={errors.price}
                        inputMode="numeric"
                    />

                </div>

            </div>
        </>
    )
}
