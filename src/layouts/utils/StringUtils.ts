/**
 * @module layouts
 */
/** */
export function truncate(truncation, toTruncate) {
    let len;
    if (truncation) {
        len = parseInt(truncation.substr(1), 10);
        return toTruncate.substring(0, len);
    }

    return toTruncate;
}

export function pad(padding, toPad) {
    let len;
    if (padding) {
        if (padding.charAt(0) === "-") {
            len = parseInt(padding.substr(1), 10);
            // Right pad with spaces
            while (toPad.length < len) {
                toPad += " ";
            }
        } else {
            len = parseInt(padding, 10);
            // Left pad with spaces
            while (toPad.length < len) {
                toPad = ` ${toPad}`;
            }
        }
    }
    return toPad;
}

export function truncateAndPad(toTruncAndPad, truncation, padding) {
    let replacement = toTruncAndPad;
    replacement = truncate(truncation, replacement);
    replacement = pad(padding, replacement);
    return replacement;
}