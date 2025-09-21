import { LinkOption } from "../interfaces/interface";

export const getIconPosition = (item: LinkOption, position: "left" | "right") => {
  if (!item.icon) return {};
  return position === "left"
    ? { startContent: item.icon }
    : { endContent: item.icon };
};