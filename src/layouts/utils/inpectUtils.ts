/**
 * @module layouts
 */
/** */
import * as Util from "util";
const semver = require("semver");

export function wrapErrorsWithInspect(items) {
    return items.map((item) => {
        if ((item instanceof Error) && item.stack) {
            return {
                inspect: function () {
                    return semver.satisfies(process.version, ">=6") ? Util.format(item) : `${Util.format(item)}\n${item.stack}`;
                }
            };
        }
        return item;
    });
}

export function formatLogData(logData: any | any[], ...args: any[]) {
    let data = logData;

    if (!Array.isArray(data)) {
        data = [data, ...args];
    }
    data = wrapErrorsWithInspect(data);

    return (Util as any).format(...data);
}