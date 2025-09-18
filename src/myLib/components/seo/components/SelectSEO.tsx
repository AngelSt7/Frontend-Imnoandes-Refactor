'use client';
import { Checkbox, Button, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useSEOSelect } from "../hooks/useSEOSelect";
import { SelectSEOProps } from "../interfaces/interface";
import { ButtonsToSEO } from "@/src/features/property/public/components/Filters/components/Buttons/ButtonsToSEO";
import { usePopoverControl } from "../hooks/usePopoverControl";

export function SelectSEO({ regex, mode, joiner, options, prefix, inProvider, onChange }: SelectSEOProps) {

  const {
    options: allOptions,
    tempKeys,
    applySelection,
    clearSelection,
    toggleSelection,
    getButtonLabel,
  } = useSEOSelect({ mode, regex, joiner, options, prefix, onChange });

  const { open, setOpen } = usePopoverControl({ applySelection });

  const buttonClasses = inProvider
    ? "w-full flex justify-center"
    : "w-full md:w-min-[200px] md:w-fit flex justify-center";

  return (
    <Popover
      isOpen={open}
      onOpenChange={setOpen}
      showArrow
      offset={10}
      placement="bottom"
    >
      <PopoverTrigger>
        <Button variant="flat" className={buttonClasses}>
          {getButtonLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="w-full">
          <header className="px-3 py-2 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Tipo de inmueble</h3>
          </header>
          <main className="p-2 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-200 scrollbar-track-gray-100">
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
          </main>
          
          <ButtonsToSEO
            onSubmit={() => {
              applySelection();
              setOpen(false);
            }}/>
        </div>
      </PopoverContent>
    </Popover>
  );
}
