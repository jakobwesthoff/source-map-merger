var entrypoint = require("../index");

describe("Module Entrypoint", function() {
    it("should export createMergedSourceMap function", function() {
        expect(typeof entrypoint.createMergedSourceMap).toEqual("function");
    });

    it("should export createMergedSourceMapFromFiles function", function() {
        expect(typeof entrypoint.createMergedSourceMapFromFiles).toEqual("function");
    });
});
