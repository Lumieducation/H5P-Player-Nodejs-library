"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var library_1 = require("./library");
var H5P = /** @class */ (function () {
    function H5P(content_id, h5pinterface, cb) {
        var _this = this;
        this.h5pinterface = h5pinterface;
        h5pinterface.load_h5p_json(content_id, function (h5p_json_error, h5p_json) {
            Object.assign(_this, h5p_json);
            h5pinterface.load_content_json(content_id, function (content_json_error, content_json) {
                _this.content = content_json;
                _this.js_dependencies = [];
                _this.css_dependencies = [];
                _this.load_dependency(_this);
                _this.js_dependencies = lodash_1.uniq(_this.js_dependencies);
                _this.css_dependencies = lodash_1.uniq(_this.css_dependencies);
                cb(undefined, _this);
            });
        });
        return this;
    }
    H5P.prototype.get_mainLibrary = function () {
        var _this = this;
        return (this.mainLibrary +
            ' ' +
            this.preloadedDependencies.filter(function (dep) { return dep.machineName === _this.mainLibrary; })[0].majorVersion +
            '.' +
            this.preloadedDependencies.filter(function (dep) { return dep.machineName === _this.mainLibrary; })[0].minorVersion);
    };
    H5P.prototype.dependencies = function () {
        return {
            js: this.js_dependencies,
            css: this.css_dependencies
        };
    };
    H5P.prototype.load_dependency = function (dependency) {
        var _this = this;
        if (dependency.preloadedDependencies) {
            dependency.preloadedDependencies.forEach(function (_dep) {
                var _lib = new library_1["default"](_dep, _this.h5pinterface, function (error, library) {
                    _this.load_dependency(library);
                });
            });
        }
        if (dependency.preloadedJs) {
            dependency.preloadedJs.forEach(function (script) {
                _this.js_dependencies.push('/' +
                    dependency.machineName +
                    '-' +
                    dependency.majorVersion +
                    '.' +
                    dependency.minorVersion +
                    '/' +
                    script.path);
            });
        }
        if (dependency.preloadedCss) {
            dependency.preloadedCss.forEach(function (style) {
                _this.css_dependencies.push('/' +
                    dependency.machineName +
                    '-' +
                    dependency.majorVersion +
                    '.' +
                    dependency.minorVersion +
                    '/' +
                    style.path);
            });
        }
    };
    return H5P;
}());
exports["default"] = H5P;
//# sourceMappingURL=h5p.js.map