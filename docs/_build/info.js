const {homepage, version} = require("../../package.json");
const github = homepage.replace("#readme", "");
const path = require("path");
const root = path.resolve(path.join(__dirname, "../../"));

module.exports = {
  root,
  github,
  host: `${github}/blob/v${version}/src/`,
  modules: {
    "core": "common/core",
    "appenders": "common/appenders",
    "layouts": "common/layouts",
    "logger": "common/logger"
  },
  symbolTypes: require("./types"),
  symbols: new Map(),
  status: {
    "S": {value: "stable", label: "Stable"},
    "D": {value: "deprecated", label: "Deprecated"},
    "E": {value: "experimental", label: "Experimental"},
    "P": {value: "private", label: "Private"},
    "O": {value: "public", label: "Public"}
  }
};