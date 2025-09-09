import { DetailsPropertyProps } from "../actions/DetailsProperty";

export default function Description({ data }: DetailsPropertyProps) {
    return (
        <section
            aria-labelledby="description-title"
            className="bg-gray-100 rounded-3xl mt-8 p-8 shadow"
        >
            <h2
                id="description-title"
                className="text-2xl font-bold text-gray-800 mb-6"
            >
                Descripción
            </h2>
            <div className="bg-gray-100 rounded-2xl p-6 shadow-inner">
                <p className="text-gray-700 leading-relaxed text-lg">
                    {data.description}
                </p>
            </div>
        </section>
    )
}
