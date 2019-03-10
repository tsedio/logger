export interface ITableSettings {
  padding?: number;
  header?: {
    [key: string]: string;
  };
}

export function charRepeater(x: number, char = " ") {
  let res = "";
  while (x--) res += char;
  return res;
}

/**
 *
 * @returns {string}
 */
export function buildStartLine(fields: any, settings: ITableSettings) {
  let line = "┌";
  let list = Object.keys(fields);

  list.forEach((key, index) => {
    if (index !== 0 && index !== list.length) {
      line += "┬";
    }

    line += charRepeater(fields[key] + 2 * settings.padding!, "─");
  });

  line += "┐";

  return line;
}

/**
 *
 * @param fields
 * @param settings
 * @returns {string}
 */
export function buildEndLine(fields: any, settings: ITableSettings) {
  let line = "└";
  let list = Object.keys(fields);

  list.forEach((key, index) => {
    if (index !== 0 && index !== list.length) {
      line += "┴";
    }

    line += charRepeater(fields[key] + 2 * settings.padding!, "─");
  });

  line += "┘";
  return line;
}

/**
 *
 * @param fields
 * @param settings
 * @param char
 * @returns {string}
 */
export function buildLine(fields: any, settings: ITableSettings, char = "─") {
  let line = "";

  Object.keys(fields).forEach(key => {
    line += "│";
    line += charRepeater(fields[key] + 2 * settings.padding!, char);
  });

  line += "│";
  return line;
}

/**
 *
 */
export function buildLineData(scope: any, fields: any, settings: ITableSettings) {
  let line = "";

  Object.keys(fields).forEach(key => {
    line += "│ ";
    line += scope[key];
    line += charRepeater(fields[key] + 2 * (settings.padding! - 1) - scope[key].length, " ");
    line += " ";
  });

  line += "│";
  return line;
}

/**
 *
 * @param list
 * @param settings
 * @returns {string}
 */
export function drawTable(list: any[], settings: ITableSettings = {}): string {
  settings.padding = settings.padding || 1;

  if (settings.header === undefined) {
    settings.header = {};

    Object.keys(list[0]).forEach(key => (settings.header![key] = key));
  }

  const fields: any = {};

  // Calculate width for each column

  Object.keys(settings.header).forEach(key => (fields[key] = settings.header![key].length));

  list.forEach(route => {
    Object.keys(fields).forEach(key => (fields[key] = Math.max(("" + route[key]).length, fields[key])));
  });

  let output = "";

  output += buildStartLine(fields, settings) + "\n";
  output += buildLineData(settings.header, fields, settings) + "\n";

  list.forEach(scope => {
    output += buildLine(fields, settings) + "\n";
    output += buildLineData(scope, fields, settings) + "\n";
  });

  output += buildEndLine(fields, settings);

  return output;
}
