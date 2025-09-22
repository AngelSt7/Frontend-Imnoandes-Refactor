export const buildKey = (action: string | null, id: string | null) => {
    if (!id) return ["property"];

    switch (action) {
        case "details":
            return ["property", "details", id];
        case "edit":
            return ["property", "edit", id];
        case "custom-images":
            return ["property", "custom-images", id];
        default:
            return ["property", id];
    }
};
