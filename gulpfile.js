const { series } = require("gulp");
const path = require("path");
const schemaTask = require("./build/json.schema");

function schemaGeneratorTask(cb) {
    cb(schemaTask("JpptrSchema", path.resolve("./src/core/schema.ts"), path.resolve("./dist/schema.json")));
}

exports.default = series(schemaGeneratorTask);
