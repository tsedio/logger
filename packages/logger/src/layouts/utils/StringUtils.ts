export function truncate(truncation: string, toTruncate: string) {
  let len;
  if (truncation) {
    len = parseInt(truncation.substr(1), 10);
    return toTruncate.substring(0, len);
  }

  return toTruncate;
}

export function pad(padding: string, toPad: string) {
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

export function truncateAndPad(toTruncAndPad: string, truncation: string, padding: string) {
  let replacement = toTruncAndPad;
  replacement = truncate(truncation, replacement);
  replacement = pad(padding, replacement);
  return replacement;
}
