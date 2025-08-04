import "./components/hostname.js";
import "./components/clusterInfo.js";
import "./components/message.js";
import "./components/pid.js";

import {format, StringUtils} from "@tsed/logger";

StringUtils.format = format;

export * from "../common/index.js";
