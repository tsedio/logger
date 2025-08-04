import Os from "node:os";

import {formatter} from "../../common/index.js";

formatter("h", (): string => {
  return Os.hostname().toString() || "";
});
