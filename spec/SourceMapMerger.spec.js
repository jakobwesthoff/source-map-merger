var fs = require("fs");
var SourceMapMerger = require("../Library/SourceMapMerger");

describe("SourceMapMerger", function() {
    // Fixture Data
    var maps = [
        "fixtures/1.map",
        "fixtures/2.map",
        "fixtures/merged_1_2.map",
        "fixtures/merged_ignore.map"
    ].map(function(filename) {
        return JSON.parse(fs.readFileSync(__dirname + "/" + filename));
    });

    it("should merge two maps", function() {
        var mergedMapRaw = SourceMapMerger.createMergedSourceMap([maps[0], maps[1]]);
        var mergedMap = JSON.parse(mergedMapRaw);
        expect(mergedMap).toEqual(maps[2]);
    });

    it("should merge maps from files", function() {
        var mergedMapRaw = SourceMapMerger.createMergedSourceMapFromFiles([
            __dirname + "/fixtures/1.map",
            __dirname + "/fixtures/2.map"
        ]);
        var mergedMap = JSON.parse(mergedMapRaw);
        expect(mergedMap).toEqual(maps[2]);
    });

    it("should throw an error when merging two incomplete maps", function() {
        expect(function() {
            SourceMapMerger.createMergedSourceMapFromFiles([
                __dirname + "/fixtures/ignore_1.map",
                __dirname + "/fixtures/ignore_2.map"
            ]);
        }).toThrow();
    });

    it("should merge two (incomplete) maps when ignoring errors", function() {
        var mergedMapRaw = SourceMapMerger.createMergedSourceMapFromFiles([
            __dirname + "/fixtures/ignore_1.map",
            __dirname + "/fixtures/ignore_2.map"
        ], true);
        var mergedMap = JSON.parse(mergedMapRaw);
        expect(mergedMap).toEqual(maps[3]);
    });
});