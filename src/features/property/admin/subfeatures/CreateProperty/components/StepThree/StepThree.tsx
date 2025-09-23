import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/features/property/admin/interfaces';
import { PROPERTY_CATEGORY } from '@/src/features/property/admin/constants';
import { Fieldset } from '@/src/components/ui';
import { Input, CheckBox } from '@/src/myLib/components';
import { rules } from './rules';

type StepThreeProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export function StepThree({ register, errors, setValue, watch }: StepThreeProps) {
    const propertyCategory = watch('propertyCategory');
    const hasParking = watch('hasParking');

    return (
        <>
            <Fieldset>Detalles de la propiedad</Fieldset>
            <div className=' flex flex-col gap-4'>
                <div className={propertyCategory !== PROPERTY_CATEGORY.TERRENO ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : ''}>
                    <Input
                        type='number'
                        htmlFor='area'
                        field='area'
                        label='Área'
                        placeholder='Ingrese el área de la propiedad'
                        register={register}
                        rules={{
                            required: "El área es obligatoria",
                            valueAsNumber: true,
                            min: { value: 10, message: "El área debe ser mayor a 10 m²" },
                            max: { value: 100000, message: "El área debe ser menor a 100000 m²" }
                        }}
                        errorMessage={errors.area}
                    />
                    {propertyCategory !== PROPERTY_CATEGORY.TERRENO && (
                        <Input
                            type='number'
                            htmlFor='yearBuilt'
                            field='yearBuilt'
                            label='Año de construcción'
                            placeholder='Ingrese el año de construcción'
                            register={register}
                            rules={{
                                required: "El año de construcción es obligatorio",
                                valueAsNumber: true,
                                min: { value: 1900, message: "El año debe ser mayor a 1900" },
                                max: {
                                    value: new Date().getFullYear(),
                                    message: `El año no puede ser mayor a ${new Date().getFullYear()}`
                                }
                            }}
                            errorMessage={errors.yearBuilt}
                        />
                    )}
                </div>
                {propertyCategory !== PROPERTY_CATEGORY.TERRENO && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(propertyCategory === PROPERTY_CATEGORY.CASA || propertyCategory === PROPERTY_CATEGORY.APARTAMENTO) && (
                                <Input
                                    type="text"
                                    htmlFor='bedrooms'
                                    inputMode='numeric'
                                    field="bedrooms"
                                    label="N° de dormitorios"
                                    placeholder="Número de dormitorios"
                                    register={register}
                                    rules={{
                                        required: "El número de dormitorios es obligatorio",
                                        setValueAs: (v) => (v === "" ? null : Number(v)),
                                        min: { value: 1, message: "Debe ser al menos 1" },
                                        max: { value: rules.getMaxBedrooms(propertyCategory), message: `Debe ser menor a ${rules.getMaxBedrooms(propertyCategory)}` }
                                    }}
                                    errorMessage={errors.bedrooms}
                                />
                            )}

                            <Input
                                type="text"
                                inputMode='numeric'
                                htmlFor='bathrooms'
                                field="bathrooms"
                                label="N° de baños"
                                placeholder="Número de baños"
                                register={register}
                                rules={{
                                    required: "El número de baños es obligatorio",
                                    setValueAs: (v) => (v === "" ? null : Number(v)),
                                    min: { value: 1, message: "Debe ser al menos 1" },
                                    max: { value: rules.getMaxBathrooms(propertyCategory), message: `Debe ser menor a ${rules.getMaxBathrooms(propertyCategory)}` }
                                }}
                                errorMessage={errors.bathrooms}
                            />

                            <Input
                                type="text"
                                inputMode='numeric'
                                htmlFor='floor'
                                field="floor"
                                label={rules.getLabelFloor(propertyCategory)}
                                placeholder="Ingrese el número de piso"
                                register={register}
                                rules={{
                                    required: rules.getErrorFloor(propertyCategory),
                                    setValueAs: (v) => (v === "" ? null : Number(v)),
                                    min: { value: 1, message: "El piso debe ser al menos 1" },
                                    max: { value: rules.getMaxFloor(propertyCategory), message: `El piso debe ser menor o igual a ${rules.getMaxFloor(propertyCategory)}` }
                                }}
                                errorMessage={errors.floor}
                                className={(propertyCategory === PROPERTY_CATEGORY.CASA || propertyCategory === PROPERTY_CATEGORY.APARTAMENTO)
                                    ? "sm:col-span-2"
                                    : ""}
                            />
                        </div>

                        <div className="flex flex-col gap-2 mt-3">
                            <CheckBox
                                name='hasTerrace'
                                register={register('hasTerrace')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Tiene terraza?'
                            />
                            <CheckBox
                                name='furnished'
                                register={register('furnished')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Es amueblado?'
                            />
                            <CheckBox
                                name='hasParking'
                                register={register('hasParking')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Tiene espacios de parqueo?'
                            />
                        </div>

                        {hasParking && (
                            <Input
                                type='number'
                                field='parkingSpaces'
                                htmlFor='parkingSpaces'
                                label='Espacios de parqueo'
                                placeholder='Ingrese la cantidad de espacios de parqueo'
                                register={register}
                                rules={{
                                    required: "La cantidad de espacios de parqueo es obligatoria",
                                    valueAsNumber: true,
                                    min: { value: 1, message: "Debe ser al menos 1 espacio" },
                                    max: { value: rules.getMaxParkingSpaces(propertyCategory), message: `Debe ser máximo ${rules.getMaxParkingSpaces(propertyCategory)} espacios` }
                                }}
                                errorMessage={errors.parkingSpaces}
                            />
                        )}
                    </>
                )}
                <Input
                    type='textarea'
                    htmlFor='description'
                    field='description'
                    label='Descripción'
                    placeholder='Describe tu propiedad'
                    register={register}
                    rules={{
                        required: "La descripción es obligatoria",
                        minLength: { value: 8, message: "La descripción debe tener al menos 10 caracteres" },
                        maxLength: { value: 300, message: "La descripción debe tener menos de 500 caracteres" }
                    }}
                    errorMessage={errors.description}
                />
            </div>
        </>
    )
}
