'use client';
import React from "react";
import { Checkbox, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useMultiSelect } from "../hooks/useMultiSelect";

export default function MultiSelect() {
  const {
    propertyTypes,
    tempKeys,
    handleOpenChange,
    handleConfirm,
    handleClear,
    handleCheckboxChange,
    getTriggerText,
  } = useMultiSelect();

  return (
    <Popover showArrow offset={10} placement="bottom" onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button variant="flat" color="secondary">{getTriggerText()}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="w-full">
          <header className="px-3 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm">Tipo de inmueble</h3>
          </header>

          <div className="p-2 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-gray-100">
            {propertyTypes.map((propertyType) => (
              <Checkbox
                color="success"
                key={propertyType.key}
                isSelected={tempKeys.has(propertyType.key)}
                onValueChange={(isSelected) =>
                  handleCheckboxChange(propertyType.key, isSelected)
                }
                classNames={{
                  base: "inline-flex w-full max-w-full bg-content1 m-0 p-2 rounded-md cursor-pointer hover:bg-teal-50 items-center justify-start data-[selected=true]:border-teal-500 data-[selected=true]:bg-teal-50",
                  label: "w-full",
                }}
              >
                <div className="w-full flex justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{propertyType.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {propertyType.label}
                    </span>
                  </div>
                </div>
              </Checkbox>
            ))}
          </div>

          <footer className="flex justify-between gap-2 p-2 border-t border-gray-200">
            <Button
              variant="light"
              onPress={handleClear}
              className="text-gray-600 text-sm px-3 py-1"
              size="sm"
            >
              Limpiar
            </Button>
            <Button
              className="bg-teal-600 text-white hover:bg-teal-700 transition-colors text-sm px-4 py-1"
              onPress={handleConfirm}
              size="sm"
            >
              Ver resultados
            </Button>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}