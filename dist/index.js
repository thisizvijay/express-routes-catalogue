"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AsciiTable = require("ascii-table");
var RoutesList = (function () {
    function RoutesList() {
    }
    RoutesList.prototype.display = function (app) {
        RoutesList.table = new AsciiTable("List All Routes");
        RoutesList.table.setHeading("Method", "URI");
        app._router.stack.forEach(RoutesList.print.bind(undefined, []));
        console.log(RoutesList.table.toString());
    };
    RoutesList.print = function (path, layer) {
        if (layer.route) {
            layer.route.stack.forEach(RoutesList.print.bind(undefined, path.concat(RoutesList.split(layer.route.path))));
        }
        else if (layer.name === "router" && layer.handle.stack) {
            layer.handle.stack.forEach(RoutesList.print.bind(undefined, path.concat(RoutesList.split(layer.regexp))));
        }
        else if (layer.method) {
            RoutesList.table.addRow(layer.method.toUpperCase(), path
                .concat(RoutesList.split(layer.regexp))
                .filter(Boolean)
                .join("/"));
        }
    };
    RoutesList.split = function (thing) {
        if (typeof thing === "string") {
            return thing.split("/");
        }
        else if (thing.fast_slash) {
            return "";
        }
        else {
            var match = thing
                .toString()
                .replace("\\/?", "")
                .replace("(?=\\/|$)", "$")
                .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
            return match
                ? match[1].replace(/\\(.)/g, "$1").split("/")
                : "<complex:" + thing.toString() + ">";
        }
    };
    return RoutesList;
}());
exports.default = RoutesList;
