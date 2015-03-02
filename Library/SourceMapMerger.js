var fs = require("fs");
var SourceMap = require("source-map");

var findOriginal = function(consumers, generatedLine, generatedColumn) {
    var currentLine = generatedLine;
    var currentColumn = generatedColumn;
    var original = null;

    consumers.forEach(function(consumer) {
        original = consumer.originalPositionFor({
            line: currentLine,
            column: currentColumn
        });
        currentLine = original.line;
        currentColumn = original.column;
    });
    return original;
};

var createMergedSourceMap = function(maps) {
    var consumers = maps.map(function(map) {
        return new SourceMap.SourceMapConsumer(map);
    }).reverse();

    var generator = new SourceMap.SourceMapGenerator({
        file: consumers[0].file
    });

    consumers[0].eachMapping(function(mapping) {
        var original = findOriginal(consumers, mapping.generatedLine, mapping.generatedColumn);
        generator.addMapping({
            generated: {
                line: mapping.generatedLine,
                column: mapping.generatedColumn
            },
            original: {
                line: original.line,
                column: original.column
            },
            source: original.source,
            name: original.name
        });
    });

    return generator.toString();
};

var createMergedSourceMapFromFiles = function(files) {
    var rawDataSets = files.map(function(map) {
        return fs.readFileSync(map);
    });
    var maps = rawDataSets.map(function(data) {
        return JSON.parse(data);
    });

    return createMergedSourceMap(maps);
};

exports.createMergedSourceMap = createMergedSourceMap;
exports.createMergedSourceMapFromFiles = createMergedSourceMapFromFiles;
