# Source-Map-Merger

The `source-map-merger` is a CommonJS module, which allows the combination of
multiple Source-Maps into one.

Think of scenario, where multiple processing steps are executed during your
JavaScript build:

1. Transpile your code to JavaScript (CoffeeScript, TypeScript)
2. Dependency Resolution and packaging
3. Minification

Each of those steps creates a Source-Map. But in the end you want a mapping
from your minified code to your original code (Coffee-Script, TypeScript, ...).

In order to archive this a lot of tools, which change your code provide the
possibility to provide an input Source-Map of the previous step. However not
all of them do. That is where `source-map-merger`comes into play.

You simply execute all the different processing steps indepently and later on
create a combined Source Map containing the mapping from your source to your
target.

## Usage

`source-map-merger` only exports one function called `mergeMaps`. This
functions takes an array of filepaths to your Source Maps. In the order of
processing from start to finish. Imagine the above example created the
SourceMap files `transpile.map`, `dependency.map` and `minification.map`. In
this case you simply execute the following code to merge all of them:

    var SourceMapMerger = require("source-map-merger");

    var mergedMap = SourceMapMerger.mergeMaps([
        "transpile.map",
        "dependency.map",
        "minification.map"
    ]);

The return value of the `mergeMaps` function is a string containing the newly
generated map. If you use this Source Map in conjunction with your final build
target it will automatically map back to your original target sources.
