import React from "react";
import { LocationSearch, LocationsSearch } from "../../../../schemas";

interface PopoverSearchProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: LocationsSearch;
  onSelect?: (location: LocationSearch) => void;
  showNoResults?: boolean;
  selects: LocationSearch[];
  setSlugs: React.Dispatch<React.SetStateAction<LocationSearch[]>>;
}

export function PopoverSearch({
  isOpen,
  setIsOpen,
  data,
  onSelect,
  showNoResults,
  selects,
  setSlugs
}: PopoverSearchProps) {
  if (!isOpen) return null;

  const format = data.filter(
    (item) => !selects.some((sel) => sel.slug === item.slug)
  );

  const handleDelete = (item: LocationSearch) => {
    setSlugs((prev) => prev.filter((d) => d.slug !== item.slug));
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
      {selects.length > 0 && (
        <div className="flex flex-row gap-2 p-2">
          {selects.map((item) => (
            <div
              key={item.slug}
              className="text-xs px-3 py-2 text-slate-900 bg-success/10 border border-success-200 rounded-lg flex justify-between gap-2 font-medium"
            >
              {item.label}
              <button
                className="bg-success-200 hover:bg-success-300 text-white text-center rounded-full w-4 transition-colors"
                onClick={() => handleDelete(item)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {showNoResults ? (
        <div className="p-2">
          <span className="text-sm text-gray-500">
            No se encontraron resultados
          </span>
        </div>
      ) : (
        <div className="py-1">
          {format.map((item) => (
            <button
              className="w-full text-left text-sm px-3 py-2 hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
              key={item.slug}
              onClick={() => {
                onSelect?.(item);
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
