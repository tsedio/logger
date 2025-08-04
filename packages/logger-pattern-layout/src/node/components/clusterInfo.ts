import {LogEvent} from "@tsed/logger";

import {formatter, formatterRegistry} from "../../common/index.js";

formatter("y", (loggingEvent: LogEvent, specifier: string, opts) => {
  if (loggingEvent.cluster && specifier) {
    return specifier
      .replace("%m", loggingEvent.cluster.master)
      .replace("%w", loggingEvent.cluster.worker)
      .replace("%i", loggingEvent.cluster.workerId);
  } else if (loggingEvent.cluster) {
    return `${loggingEvent.cluster.worker}@${loggingEvent.cluster.master}`;
  }

  return formatterRegistry.get("z")!(loggingEvent, specifier, opts);
});
