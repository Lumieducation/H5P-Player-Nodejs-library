"use strict";
exports.__esModule = true;
var Library = /** @class */ (function () {
    function Library(dependency, h5pinterface, cb) {
        var _this = this;
        h5pinterface.load_library(dependency.machineName +
            '-' +
            dependency.majorVersion +
            '.' +
            dependency.minorVersion, function (error, library) {
            Object.assign(_this, library);
            cb(error, _this);
        });
    }
    return Library;
}());
exports["default"] = Library;
//# sourceMappingURL=library.js.map