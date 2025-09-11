type PropertyDescriptionProps = {
  description?: string;
};

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  if (!description) return null;
  return (
    <section>
      <p className="text-sm font-normal text-neutral-600 truncate">{description}</p>
    </section>
  );
}
