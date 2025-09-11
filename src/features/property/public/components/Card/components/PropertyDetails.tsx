import { Calendar } from "lucide-react";
import { formatDate } from '@/src/utils/frontend/format/dateUtils';

type PropertyDetailsProps = {
  createdAt: string | Date;
  area: number;
  bedrooms: number;
  bathrooms: number;
};

export function PropertyDetails({ createdAt, area, bedrooms, bathrooms }: PropertyDetailsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 text-neutral-600">
        <Calendar className="w-5 h-5" />
        <time className="text-sm" dateTime={createdAt.toString()}>
          {formatDate(createdAt)}
        </time>
      </div>
      <ul className="flex items-center gap-4 text-neutral-600 pt-1">
        <li className="flex items-center gap-1"><span className="text-sm">{area}m²</span></li>
        <li className="flex items-center gap-1"><span className="text-sm">{bedrooms} Dorm</span></li>
        <li className="flex items-center gap-1"><span className="text-sm">{bathrooms} Baños</span></li>
      </ul>
    </div>
  );
}
