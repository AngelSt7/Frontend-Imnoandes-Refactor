export function formatDate(
  dateString: string | Date,
  style: "long" | "short" | "compact" = "short"
): string {
  const date = new Date(dateString);

  switch (style) {
    case "long":
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

    case "short":
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    case "compact":
      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

    default:
      return date.toLocaleDateString("es-ES");
  }
}
