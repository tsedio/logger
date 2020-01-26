const styles: any = {
  // styles
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39]
};

export function colorizeStart(style: any) {
  return style ? `\x1B[${styles[style][0]}m` : "";
}

export function colorizeEnd(style: any) {
  return style ? `\x1B[${styles[style][1]}m` : "";
}

export function colorize(str: string, style: any) {
  return colorizeStart(style) + str + colorizeEnd(style);
}
