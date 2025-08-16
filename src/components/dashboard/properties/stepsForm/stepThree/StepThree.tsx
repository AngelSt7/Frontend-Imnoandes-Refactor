import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FormDataProperty } from '@/src/types/adminTypes/property';
import Fieldset from '../../../ui/Fieldset';
import Input from '@/src/components/ui/inputs/Input';
import { PROPERTY_CATEGORY } from '@/src/utils/resolves/bases/enums';
import CheckBox from '@/src/components/ui/checkbox/CheckBox';

type StepThreeProps = {
    register: UseFormRegister<FormDataProperty>;
    errors: FieldErrors<FormDataProperty>
    setValue: UseFormSetValue<FormDataProperty>
    watch: UseFormWatch<FormDataProperty>
};

export default function StepThree({ register, errors, setValue, watch }: StepThreeProps) {
    const propertyCategory = watch('property_category');

    return (
        <>
            <Fieldset>Detalles de la propiedad</Fieldset>
            <div className=' flex flex-col gap-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Input
                        type='number'
                        htmlFor='area'
                        label='Área'
                        placeholder='Ingrese el área de la propiedad'
                        register={register('area', {
                            required: "El área es obligatoria",
                            valueAsNumber: true,
                            min: {
                                value: 10,
                                message: "El área debe ser mayor a 10 m²"
                            },
                            max: {
                                value: 100000,
                                message: "El área debe ser menor a 100000 m²"
                            }
                        })}
                        errorMessage={errors.area}
                    />
                    <Input
                        type='number'
                        htmlFor='yearBuilt'
                        label='Año de construcción'
                        placeholder='Ingrese el año de construcción'
                        register={register('yearBuilt', {
                            required: "El año de construcción es obligatorio",
                            valueAsNumber: true,
                            min: {
                                value: 1800,
                                message: "El año debe ser mayor a 1800"
                            },
                            max: {
                                value: new Date().getFullYear(),
                                message: `El año no puede ser mayor a ${new Date().getFullYear()}`
                            }
                        })}
                        errorMessage={errors.yearBuilt}
                    />

                </div>

                {propertyCategory !== PROPERTY_CATEGORY.TERRENO && (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <Input
                                type='number'
                                htmlFor='bedrooms'
                                label='N° de dormitorios'
                                placeholder='Número de dormitorios'
                                register={register('bedrooms', {
                                    required: "El numero de dormitorios es obligatorio",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "El numero de dormitorios debe ser mayor a 0"
                                    },
                                    max: {
                                        value: 10,
                                        message: "El numero de dormitorios debe ser menor a 10"
                                    }
                                })}
                                errorMessage={errors.bedrooms}
                            />
                            <Input
                                type='number'
                                htmlFor='bathrooms'
                                label='N° de baños'
                                placeholder='Número de baños'
                                register={register('bathrooms', {
                                    required: "El numero de baños es obligatorio",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "El numero de baños debe ser mayor a 0"
                                    },
                                    max: {
                                        value: 10,
                                        message: "El numero de baños debe ser menor a 10"
                                    }
                                })}
                                errorMessage={errors.bathrooms}
                            />
                        </div>


                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                            <Input
                                type='number'
                                htmlFor='floor'
                                label='Piso'
                                placeholder='Ingrese el número de piso'
                                register={register('floor', {
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: "El piso debe ser 0 o mayor"
                                    },
                                    max: {
                                        value: 200,
                                        message: "El piso debe ser menor a 200"
                                    }
                                })}
                                errorMessage={errors.floor}
                            />
                            <Input
                                type='number'
                                htmlFor='parkingSpaces'
                                label='Espacios de parqueo'
                                placeholder='Ingrese la cantidad de espacios de parqueo'
                                register={register('parkingSpaces', {
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "Debe ser al menos 1 espacio"
                                    },
                                    max: {
                                        value: 5,
                                        message: "Debe ser máximo 5 espacios"
                                    }
                                })}
                                errorMessage={errors.parkingSpaces}
                            />
                        </div>


                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3'>

                            <CheckBox
                                name='hasTerrace'
                                register={register('hasTerrace')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Tiene terraza?'
                            />
                            <CheckBox
                                name='hasParking'
                                register={register('hasParking')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Tiene espacios de parqueo?'
                            />
                            <CheckBox
                                name='furnished'
                                register={register('furnished')}
                                setValue={setValue}
                                watch={watch}
                                label='¿Es amueblado?'
                            />


                        </div>

                    </>
                )}
                <Input
                    type='textarea'
                    htmlFor='description'
                    label='Descripción'
                    placeholder='Describe tu propiedad'
                    register={register('description', { required: "La descripción es obligatoria" })}
                    errorMessage={errors.description}
                />
            </div>
        </>
    )
}
