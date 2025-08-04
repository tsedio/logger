export function format(fmt: string | object, ...args: unknown[]) {
  const re = /(%?)(%([ojds]))/g;

  if (typeof fmt === "object") {
    fmt = JSON.stringify(fmt, null, 2);
  }

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
