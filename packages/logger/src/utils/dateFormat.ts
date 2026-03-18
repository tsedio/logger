type DatePart = "FullYear" | "Month" | "Date" | "Hours" | "Minutes" | "Seconds" | "Milliseconds";

interface PatternMatcher {
  pattern: RegExp;
  regexp: string;
  index: number;
  fn: (date: Date, value: string) => void;
}

function padWithZeros(vNumber: string | number, width: number): string {
  let numAsString = vNumber.toString();
  while (numAsString.length < width) {
    numAsString = "0" + numAsString;
  }
  return numAsString;
}

function addZero(vNumber: string | number): string {
  return padWithZeros(vNumber, 2);
}

/**
 * Formats the TimeOffset
 * Thanks to http://www.svendtofte.com/code/date_format/
 * @private
 */
function offset(timezoneOffset: number): string {
  const os = Math.abs(timezoneOffset);
  let h = String(Math.floor(os / 60));
  let m = String(os % 60);
  h = ("0" + h).slice(-2);
  m = ("0" + m).slice(-2);
  return timezoneOffset === 0 ? "Z" : (timezoneOffset < 0 ? "+" : "-") + h + ":" + m;
}

export function dateFormat(date?: Date): string;
export function dateFormat(date: Date, timezoneOffset?: number): string;
export function dateFormat(format: string, date?: Date): string;
export function dateFormat(format: string, date: Date, timezoneOffset?: number): string;
export function dateFormat(formatOrDate?: string | Date, dateOrTimezoneOffset?: Date | number, _timezoneOffset?: number): string {
  const format = typeof formatOrDate === "string" ? formatOrDate : ISO8601_FORMAT;
  let date = typeof formatOrDate === "string" ? dateOrTimezoneOffset : formatOrDate;

  if (!(date instanceof Date)) {
    date = now();
  }

  // Issue # 14 - Per ISO8601 standard, the time string should be local time
  // with timezone info.
  // See https://en.wikipedia.org/wiki/ISO_8601 section "Time offsets from UTC"

  const vDay = addZero(date.getDate());
  const vMonth = addZero(date.getMonth() + 1);
  const vYearLong = addZero(date.getFullYear());
  const vYearShort = addZero(vYearLong.substring(2, 4));
  const vYear = format.indexOf("yyyy") > -1 ? vYearLong : vYearShort;
  const vHour = addZero(date.getHours());
  const vMinute = addZero(date.getMinutes());
  const vSecond = addZero(date.getSeconds());
  const vMillisecond = padWithZeros(date.getMilliseconds(), 3);
  const vTimeZone = offset(date.getTimezoneOffset());
  const formatted = format
    .replace(/dd/g, vDay)
    .replace(/MM/g, vMonth)
    .replace(/y{1,4}/g, vYear)
    .replace(/hh/g, vHour)
    .replace(/mm/g, vMinute)
    .replace(/ss/g, vSecond)
    .replace(/SSS/g, vMillisecond)
    .replace(/O/g, vTimeZone);
  return formatted;
}

function setDatePart(date: Date, part: DatePart, value: number, local: boolean): void {
  const setter = `set${local ? "" : "UTC"}${part}` as const;
  (date as unknown as Record<typeof setter, (value: number) => number>)[setter](value);
}

function extractDateParts(pattern: string, str: string, missingValuesDate?: Date): Date {
  // Javascript Date object doesn't support custom timezone.  Sets all felds as
  // GMT based to begin with.  If the timezone offset is provided, then adjust
  // it using provided timezone, otherwise, adjust it with the system timezone.
  const local = pattern.indexOf("O") < 0;
  let monthOverflow = false;
  const matchers: PatternMatcher[] = [
    {
      pattern: /y{1,4}/,
      regexp: "\\d{1,4}",
      index: -1,
      fn: function (date, value) {
        setDatePart(date, "FullYear", Number(value), local);
      }
    },
    {
      pattern: /MM/,
      regexp: "\\d{1,2}",
      index: -1,
      fn: function (date, value) {
        const month = Number(value) - 1;
        setDatePart(date, "Month", month, local);
        if (date.getMonth() !== month) {
          // in the event of 31 May --> 31 Feb --> 3 Mar
          // this is correct behavior if no Date is involved
          monthOverflow = true;
        }
      }
    },
    {
      pattern: /dd/,
      regexp: "\\d{1,2}",
      index: -1,
      fn: function (date, value) {
        // in the event of 31 May --> 31 Feb --> 3 Mar
        // reset Mar back to Feb, before setting the Date
        if (monthOverflow) {
          setDatePart(date, "Month", date.getMonth() - 1, local);
        }
        setDatePart(date, "Date", Number(value), local);
      }
    },
    {
      pattern: /hh/,
      regexp: "\\d{1,2}",
      index: -1,
      fn: function (date, value) {
        setDatePart(date, "Hours", Number(value), local);
      }
    },
    {
      pattern: /mm/,
      regexp: "\\d\\d",
      index: -1,
      fn: function (date, value) {
        setDatePart(date, "Minutes", Number(value), local);
      }
    },
    {
      pattern: /ss/,
      regexp: "\\d\\d",
      index: -1,
      fn: function (date, value) {
        setDatePart(date, "Seconds", Number(value), local);
      }
    },
    {
      pattern: /SSS/,
      regexp: "\\d\\d\\d",
      index: -1,
      fn: function (date, value) {
        setDatePart(date, "Milliseconds", Number(value), local);
      }
    },
    {
      pattern: /O/,
      regexp: "[+-]\\d{1,2}:?\\d{2}?|Z",
      index: -1,
      fn: function (date, value) {
        if (value === "Z") {
          value = "0";
        } else {
          value = value.replace(":", "");
        }
        const offsetValue = Number(value);
        const absoluteOffset = Math.abs(offsetValue);
        const timezoneOffset = (offsetValue > 0 ? -1 : 1) * ((absoluteOffset % 100) + Math.floor(absoluteOffset / 100) * 60);
        // Per ISO8601 standard: UTC = local time - offset
        //
        // For example, 2000-01-01T01:00:00-0700
        //   local time: 2000-01-01T01:00:00
        //   ==> UTC   : 2000-01-01T08:00:00 ( 01 - (-7) = 8 )
        //
        // To make it even more confusing, the date.getTimezoneOffset() is
        // opposite sign of offset string in the ISO8601 standard.  So if offset
        // is '-0700' the getTimezoneOffset() would be (+)420. The line above
        // calculates timezoneOffset to matche Javascript's behavior.
        //
        // The date/time of the input is actually the local time, so the date
        // object that was constructed is actually local time even thought the
        // UTC setters are used.  This means the date object's internal UTC
        // representation was wrong.  It needs to be fixed by substracting the
        // offset (or adding the offset minutes as they are opposite sign).
        //
        // Note: the time zone has to be processed after all other fields are
        // set.  The result would be incorrect if the offset was calculated
        // first then overriden by the other filed setters.
        date.setUTCMinutes(date.getUTCMinutes() + timezoneOffset);
      }
    }
  ];

  const parsedPattern = matchers.reduce(
    function (p, m) {
      if (m.pattern.test(p.regexp)) {
        m.index = p.regexp.match(m.pattern)?.index ?? -1;
        p.regexp = p.regexp.replace(m.pattern, "(" + m.regexp + ")");
      } else {
        m.index = -1;
      }
      return p;
    },
    {regexp: pattern}
  );

  const dateFns = matchers.filter(function (m) {
    return m.index > -1;
  });
  dateFns.sort(function (a, b) {
    return a.index - b.index;
  });

  const matcher = new RegExp(parsedPattern.regexp);
  const matches = matcher.exec(str);
  if (matches) {
    const date = missingValuesDate || now();
    dateFns.forEach(function (f, i) {
      f.fn(date, matches[i + 1]);
    });

    return date;
  }

  throw new Error("String '" + str + "' could not be parsed as '" + pattern + "'");
}

export function parse(pattern: string, str: string, missingValuesDate?: Date): Date {
  if (!pattern) {
    throw new Error("pattern must be supplied");
  }

  return extractDateParts(pattern, str, missingValuesDate);
}

/**
 * Used for testing - replace this function with a fixed date.
 */
export function now() {
  return new Date();
}

export const ISO8601_FORMAT = "yyyy-MM-ddThh:mm:ss.SSS";
export const ISO8601_WITH_TZ_OFFSET_FORMAT = "yyyy-MM-ddThh:mm:ss.SSSO";
export const DATETIME_FORMAT = "dd MM yyyy hh:mm:ss.SSS";
export const ABSOLUTETIME_FORMAT = "hh:mm:ss.SSS";
