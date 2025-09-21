export function isValidUuidSegment(segment: string) {
    return /^[0-9a-f]{8}$/i.test(segment) ? "true" : "false";
}
