import {truncateAndPad} from "../utils/StringUtils";
import {BaseLayout} from "../class/BaseLayout";
import {IReplacers} from "../interfaces/Replacers";
import {LayoutReplacer} from "../class/LayoutReplacer";
import {LogEvent} from "../../core/LogEvent";
import {IBasicLayoutConfiguration, TokensHandlers} from "../interfaces/BasicLayoutConfiguration";
import {Layout} from "../decorators/layout";

const regex = /%(-?[0-9]+)?(\.?[0-9]+)?([[\]cdhmnprzxy%])(\{([^}]+)\})?|([^%]+)/;
const TTCC_CONVERSION_PATTERN = "%r %p %c - %m%n";

/**
 * PatternLayout
 * Format for specifiers is %[padding].[truncation][field]{[format]}
 * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
 * Fields can be any of:
 *  - %r time in toLocaleTimeString format
 *  - %p log level
 *  - %c log category
 *  - %h hostname
 *  - %m log data
 *  - %d date in constious formats
 *  - %% %
 *  - %n newline
 *  - %z pid
 *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
 * You can use %[ and %] to define a colored block.
 *
 * Tokens are specified as simple key:value objects.
 * The key represents the token name whereas the value can be a string or function
 * which is called to extract the value to put in the log message. If token is not
 * found, it doesn't replace the field.
 *
 * A sample token would be: { 'pid' : function() { return process.pid; } }
 *
 * Takes a pattern string, array of tokens and returns a layouts function.
 * @return {Function}
 * @param pattern
 * @param tokens
 * @param timezoneOffset
 *
 * @authors ['Stephan Strittmatter', 'Jan Schmidle']
 */
@Layout({name: "pattern"})
export class PatternLayout extends BaseLayout {
  private _replacers: IReplacers;
  private tokens: TokensHandlers;
  private pattern: string;

  constructor(config: IBasicLayoutConfiguration) {
    super(config);

    this.pattern = (config && config.pattern) || TTCC_CONVERSION_PATTERN;
    this.tokens = config && config.tokens!;
    this._replacers = new LayoutReplacer(this.tokens, this.config.timezoneOffset).build();
  }

  /**
   *
   * @param loggingEvent
   * @param timezoneOffset
   * @returns {string}
   */
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    let formattedString = "";
    let result;
    let searchString = this.pattern;

    /* eslint no-cond-assign:0 */
    while ((result = regex.exec(searchString)) !== null) {
      // const matchedString = result[0];
      const padding = result[1];
      const truncation = result[2];
      const conversionCharacter = result[3];
      const specifier = result[5];
      const text = result[6];

      // Check if the pattern matched was just normal text
      if (text) {
        formattedString += text.toString();
      } else {
        // Create a raw replacement string based on the conversion
        // character and specifier
        const replacement = this.replaceToken(conversionCharacter, loggingEvent, specifier);
        formattedString += truncateAndPad(replacement, truncation, padding);
      }
      searchString = searchString.substr(result.index + result[0].length);
    }
    return formattedString;
  }

  private replaceToken = (conversionCharacter: string, loggingEvent: any, specifier: any) => {
    return this._replacers[conversionCharacter](loggingEvent, specifier);
  };
}
