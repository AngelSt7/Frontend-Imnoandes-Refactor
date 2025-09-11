type PropertyLocationProps = {
  location: string;
  district: string;
  department: string;
};

export function PropertyLocation({ location, district, department }: PropertyLocationProps) {
  return (
    <address className="not-italic">
      <p className="text-sm font-normal text-zinc-900">{location}</p>
      <p className="text-sm font-normal text-neutral-600 capitalize">{district}, {department}</p>
    </address>
  );
}
