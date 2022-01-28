const TJS = require("typescript-json-schema");
const { writeFileSync, rmSync, mkdirSync } = require("fs");
const path = require("path");

module.exports = function generateJsonSchema(type, file, dest) {
    rmSync(path.resolve(dest, "../"), { recursive: true, force: true });

    /** @type {Partial<TJS.Args>} */
    const settings = {
        required: true,
    };
    /** @type {TJS.CompilerOptions} */
    const compilerOptions = {
        strictNullChecks: true,
        downlevelIteration: true,
        esModuleInterop: true,
    };
    const program = TJS.getProgramFromFiles([file], compilerOptions, "./");
    const shapeSchema = TJS.generateSchema(program, type, settings);

    mkdirSync(path.resolve(dest, "../"), { recursive: true });
    writeFileSync(dest, JSON.stringify(shapeSchema, null, 4));
};
