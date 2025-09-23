import { Control, Controller, FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { CURRENCY_SELECT, PROPERTY_CATEGORY_SELECT, PROPERTY_TYPE_SELECT, CURRENCY } from '@/src/features/property/admin/constants';
import { Fieldset } from '@/src/components/ui';
import { FormDataProperty } from '@/src/features/property/admin/interfaces';
import { Input, Select } from '@/src/myLib/components';
import { PiMapPinSimpleAreaFill } from "react-icons/pi";

type StepOneProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
    control: Control<FormDataProperty>
};

export function StepOne({ register, errors, watch, control }: StepOneProps) {
    const currency = watch('currency')

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
                            required: "El teléfono es obligatorio",
                            pattern: {
                                value: /^9\d{8}$/,
                                message: "El número de teléfono debe tener 9 dígitos y empezar con 9",
                            },
                        }}
                        Icon={PiMapPinSimpleAreaFill}
                        inputMode='numeric'
                        maxLength={9}
                        errorMessage={errors.phone}
                    />
                </div>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Select
                        data={PROPERTY_TYPE_SELECT}
                        controller={Controller}
                        name="propertyType"
                        control={control}
                        rules={{ required: 'Debes seleccionar un tipo de propiedad' }}
                        placeholder='Elige un tipo de propiedad'
                        label='Tipo de propiedad'
                    />

                    <Select
                        data={PROPERTY_CATEGORY_SELECT}
                        controller={Controller}
                        name="propertyCategory"
                        control={control}
                        rules={{ required: 'Debes seleccionar un tipo de categoria' }}
                        placeholder='Elige un tipo de categoria'
                        label='Categoría de propiedad'
                    />

                </div>
                <div className=' grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Select
                        data={CURRENCY_SELECT}
                        controller={Controller}
                        name="currency"
                        control={control}
                        rules={{ required: 'Debes seleccionar un tipo de moneda' }}
                        placeholder='Elige un tipo de moneda'
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
