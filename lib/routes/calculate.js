"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.calculator = void 0;
function validator(reqst) {
    var shape = reqst.shape.toLowerCase();
    var dimension = reqst.dimension;
    var length = Object.keys(dimension).length;
    var values = Object.values(dimension);
    var findString = values[values.findIndex(function (item) { return typeof item !== "number"; })]
        ? true
        : false;
    if (shape == null ||
        (shape != "square" &&
            shape != "rectangle" &&
            shape != "triangle" &&
            shape != "circle"))
        return new Error("guy gimmme valid shape na");
    if ((shape == "square" || shape == "circle") && findString)
        return new Error("guy gimme valid dimension na");
    if (shape == "rectangle" &&
        (typeof dimension !== "object" || length !== 2 || findString)) {
        return new Error("guy gimme valid dimension na");
    }
    if (shape == "triangle" &&
        (typeof dimension !== "object" || length !== 3 || findString)) {
        return new Error("guy gimme valid dimension na");
    }
}
exports.validator = validator;
function calculator(reqst) {
    var shape = reqst.shape.toLowerCase();
    var area = 0;
    var dimension = reqst.dimension;
    var num = +dimension;
    if (shape == "square") {
        area = Math.pow(num, 2);
    }
    if (shape == "circle") {
        area = Math.PI * (Math.pow(num, 2));
    }
    if (shape == "rectangle") {
        var _a = Object.values(dimension), a = _a[0], b = _a[1];
        area = a * b;
    }
    if (shape == "triangle") {
        var _b = Object.values(dimension), a = _b[0], b = _b[1], c = _b[2];
        var perimeter = (a + b + c) / 2;
        var p = perimeter;
        area = Math.sqrt(p * ((p - a) * (p - b) * (p - c)));
    }
    if (!area) {
        return new Error("Impossible Shape");
    }
    return { message: +area.toFixed(2) };
}
exports.calculator = calculator;
