'use client';
import React from "react";
import { Checkbox, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useSEOSelect } from "../hooks/useSEOSelect";
import { SelectSEOProps } from "../interfaces/interface";

export function SelectSEO({ regex, mode, joiner, options }: SelectSEOProps) {
  const {
    options: allOptions,
    tempKeys,
    syncTempSelection,
    applySelection,
    clearSelection,
    toggleSelection,
    getButtonLabel,
  } = useSEOSelect({ mode, regex, joiner, options });

  return (
    <Popover showArrow offset={10} placement="bottom" onOpenChange={syncTempSelection}>
      <PopoverTrigger>
        <Button variant="flat" color="secondary">
          {getButtonLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="w-full">
          <header className="px-3 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm">Tipo de inmueble</h3>
          </header>

          <div className="p-2 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-gray-100">
            {allOptions.map((opt) => (
              <Checkbox
                key={opt.key}
                color="success"
                isSelected={tempKeys.has(opt.key)}
                onValueChange={(isSelected) => toggleSelection(opt.key, isSelected)}
                classNames={{
                  base: "inline-flex w-full max-w-full bg-content1 m-0 p-2 rounded-md cursor-pointer hover:bg-teal-50 items-center justify-start data-[selected=true]:border-teal-500 data-[selected=true]:bg-teal-50",
                  label: "w-full",
                }}
              >
                <div className="flex items-center gap-2">
                  <opt.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                </div>
              </Checkbox>
            ))}
          </div>

          <footer className="flex justify-between gap-2 p-2 border-t border-gray-200">
            <Button variant="light" onPress={clearSelection} size="sm" className="text-gray-600">
              Limpiar
            </Button>
            <Button onPress={applySelection} size="sm" className="bg-teal-600 text-white hover:bg-teal-700 transition-colors">
              Ver resultados
            </Button>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
