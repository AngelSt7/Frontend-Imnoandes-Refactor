import { useQueryParam } from "@/src/myLib/hooks/searchParams/useQueryParam";

export default function SelectNumbers() {

    const { getParam, setParam, clearParam } = useQueryParam();

    const param = getParam("minBathrooms")

    const options = [
     { key: "1", value: "1+" },
    { key: "2", value: "2+" },
    { key: "3", value: "3+" },
    { key: "4", value: "4+" },
    { key: "5", value: "5+" },
    ]

    return (
        <div className="w-full max-w-md mx-auto p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Baños</h3>

            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                {options.map((option) => (
                    <button
                        key={option.key}
                        onClick={() => {
                            if (param === option.key) {
                                clearParam("minBathrooms")
                            } else {
                                setParam("minBathrooms", option.key)
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