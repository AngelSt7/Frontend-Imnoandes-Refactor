'use client';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { ChevronDownIcon } from 'lucide-react';
import { ModeOption, useModeSegment } from '@/src/myLib/hooks'

const modeOptions: ModeOption[] = [
  { key: 'venta', value: 'En venta' },
  { key: 'alquiler', value: 'En alquiler' },
];

export default function ButtonSegment() {
  const { getLabel, getText, handleChange } = useModeSegment(modeOptions, "Modo");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
        >
          {getText}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        closeOnSelect
        selectionMode="single"
        selectedKeys={getLabel()}
        onSelectionChange={handleChange}
      >
        {modeOptions.map(opt => (
          <DropdownItem key={opt.key} className="capitalize">
            {opt.value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
