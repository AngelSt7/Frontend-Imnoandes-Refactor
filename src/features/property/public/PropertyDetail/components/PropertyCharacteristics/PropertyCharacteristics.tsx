'use client'
import { PropertyPublic } from "@/src/features/property"
import { usePropertyCharacteristics } from "./usePropertyCharacteristics"

type CharacteristicsyProps = {
  property: PropertyPublic
}

export function PropertyCharacteristics({ property }: CharacteristicsyProps) {
  const { showAll, setShowAll, itemsToShow, data } = usePropertyCharacteristics({ property })

  return (
    <div className="w-full">
      <h3>Características</h3>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        {itemsToShow.map((item) => (
          <div
            key={item.name}
            className="flex justify-center items-center flex-col w-full gap-2"
          >
            <div className="text-3xl text-zinc-800 dark:text-gray-200">
              {item.icon}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-gray-100">
              {item.name}: {item.quantity}
            </div>
          </div>
        ))}
      </div>

      {data.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          {showAll ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  )
}
