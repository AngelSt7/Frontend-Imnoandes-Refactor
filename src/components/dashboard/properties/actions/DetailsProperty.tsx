import { AdminDetailsProperty } from '@/src/types';
import Header from '../details/Header';
import Main from '../details/Main';
import Services from '../details/Services';
import Description from '../details/Description';

export interface DetailsPropertyProps {
    data: AdminDetailsProperty;
}

export default function DetailsProperty({ data }: DetailsPropertyProps) {

    return (
        <article
            role="dialog"
            aria-labelledby="property-title"
            aria-modal="true"
            className="max-w-4xl mx-auto my-6 bg-gray-50 min-h-screen rounded-3xl"
        >

            <Header data={data} />
            <Main data={data} />
            {data.services && <Services data={data} /> }
            <Description data={data} />
            
        </article>
    );
}
