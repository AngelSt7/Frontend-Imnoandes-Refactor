import { useQueryParam } from "@/src/myLib/hooks/searchParams/useQueryParam";

interface SelectNumbersProps {
    keyParam: string
    options: { key: string, value: string }[]
    tittle: string
}

export function SelectNumbers({ keyParam, options, tittle }: SelectNumbersProps) {

    const { getParam, setParam, clearParams } = useQueryParam();

    const param = getParam(keyParam)

    return (
        <div className="w-full mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{tittle}</h3>

            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                {options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => {
                            if (param === option.key) {
                                clearParams([keyParam])
                            } else {
                                setParam(keyParam, option.key)
                            }
                        }}
                        className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${param === option.key
                            ? "bg-teal-700 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                            } ${option !== options[options.length - 1] ? "border-r border-gray-300" : ""
                            }`}
                    >
                        {option.value}
                    </button>
                ))}
            </div>

        </div>
    );
}