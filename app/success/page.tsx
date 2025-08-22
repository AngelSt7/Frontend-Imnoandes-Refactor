'use client'

import type {Selection} from "@heroui/react";

import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

const options = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Single Date", value: "single_date" },
  { label: "Iteration", value: "iteration" },
]

export default function App() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys],
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={value => setSelectedKeys(new Set(value))}
      >
        {options.map((option) => (
          <DropdownItem key={option.value} value={option.value}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
