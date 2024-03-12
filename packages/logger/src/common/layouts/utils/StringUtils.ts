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

export function format(fmt: string, ...args: unknown[]) {
  const re = /(%?)(%([ojds]))/g;

  if (args.length) {
    const replacer = (match: any, escaped: any, ptn: any, flag: any) => {
      let arg = args.shift();
      switch (flag) {
        case "o":
          if (Array.isArray(arg)) {
            arg = JSON.stringify(arg);
            break;
          }
        case "s":
          arg = "" + arg;
          break;
        case "d":
          arg = Number(arg);
          break;
        case "j":
          arg = JSON.stringify(arg);
          break;
      }

      if (!escaped) {
        return arg;
      }

      args.unshift(arg);
      return match;
    };

    fmt = String(fmt).replace(re, replacer);
  }

  // arguments remain after formatting
  if (args.length) {
    fmt += " " + args.join(" ");
  }

  // update escaped %% values
  fmt = String(fmt).replace(/%{2,2}/g, "%");

  return "" + fmt;
}
